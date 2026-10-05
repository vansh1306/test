const request = require('supertest');
const app = require('../app');

describe('POST /api/users', () => {
  it('creates a user and returns 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Asha', email: 'asha@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ name: 'Asha', email: 'asha@example.com' });
    expect(typeof res.body.id).toBe('number');
  });

  it('returns 400 when email is missing', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Asha' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('name and email are required');
  });

  it('returns 400 when body is empty', async () => {
    const res = await request(app).post('/api/users').send({});

    expect(res.statusCode).toBe(400);
  });
});