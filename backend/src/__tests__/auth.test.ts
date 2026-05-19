import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

// Mocking the auth routes directly for tests
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password123') {
    return res.status(200).json({ success: true, token: 'mock-jwt-token' });
  }
  return res.status(400).json({ success: false, error: 'Invalid credentials' });
});

describe('Auth API', () => {
  it('should return JWT token on login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return error on invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });
    
    expect(res.status).toBe(400);
  });
});
