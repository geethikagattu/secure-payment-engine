const db = require('../config/database');
const { calculateFraudScore } = require('../utils/fraudDetection');

exports.createTransaction = async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { productId, paymentMethod } = req.body;
    const userId = req.user.id;
    const ipAddress = req.ip;

    // Get product details
    const [products] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = products[0];

    // Get user balance
    const [users] = await connection.query(
      'SELECT balance FROM users WHERE id = ?',
      [userId]
    );

    const userBalance = users[0].balance;

    // Check balance
    if (userBalance < product.price) {
      await connection.rollback();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Calculate fraud score
    const fraudScore = await calculateFraudScore(userId, product.price, ipAddress);
    let status = 'success';

    if (fraudScore > 70) {
      status = 'flagged';
    }

    // Create transaction
    const [transactionResult] = await connection.query(
      'INSERT INTO transactions (user_id, product_id, amount, status, payment_method, ip_address, fraud_score) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, productId, product.price, status, paymentMethod, ipAddress, fraudScore]
    );

    // Update user balance only if not flagged
    if (status === 'success') {
      await connection.query(
        'UPDATE users SET balance = balance - ? WHERE id = ?',
        [product.price, userId]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: status === 'flagged' ? 'Transaction flagged for review' : 'Transaction successful',
      transaction: {
        id: transactionResult.insertId,
        amount: product.price,
        status,
        fraudScore,
        product: product.name
      }
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: 'Transaction failed', error: error.message });
  } finally {
    connection.release();
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const [transactions] = await db.query(
      `SELECT t.*, p.name as product_name, p.category 
       FROM transactions t 
       JOIN products p ON t.product_id = p.id 
       WHERE t.user_id = ? 
       ORDER BY t.transaction_date DESC`,
      [userId]
    );

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};