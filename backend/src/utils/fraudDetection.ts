const db = require('../config/database');

async function calculateFraudScore(userId, amount, ipAddress) {
  let fraudScore = 0;

  // Check 1: Transaction amount (high amounts are suspicious)
  if (amount > 500) fraudScore += 30;
  if (amount > 1000) fraudScore += 20;

  // Check 2: Multiple transactions in short time
  const [recentTransactions] = await db.query(
    'SELECT COUNT(*) as count FROM transactions WHERE user_id = ? AND transaction_date > DATE_SUB(NOW(), INTERVAL 5 MINUTE)',
    [userId]
  );

  if (recentTransactions[0].count > 3) fraudScore += 40;

  // Check 3: Different IP addresses
  const [ipHistory] = await db.query(
    'SELECT DISTINCT ip_address FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC LIMIT 5',
    [userId]
  );

  if (ipHistory.length > 2) fraudScore += 20;

  // Check 4: Odd hours (midnight to 5 AM)
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) fraudScore += 15;

  return Math.min(fraudScore, 100);
}

module.exports = { calculateFraudScore };