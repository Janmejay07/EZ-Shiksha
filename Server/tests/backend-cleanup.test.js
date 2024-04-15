import test from 'node:test';
import assert from 'node:assert/strict';

import { sendCookie } from '../utils/features.js';
import { isAuthenticated } from '../middlewares/auth.js';

const createMockResponse = () => {
  const res = {
    statusCode: 200,
    cookies: {},
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    cookie(name, value) {
      this.cookies[name] = value;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  return res;
};

test('sendCookie returns consistent success payload and cookie data', () => {
  const res = createMockResponse();
  const user = { _id: 'user-123', name: 'Alice' };

  sendCookie(user, res, 'Welcome back, Alice', 200, { userId: user._id });

  assert.equal(res.statusCode, 200);
  assert.equal(res.cookies.token.length > 0, true);
  assert.equal(res.payload.success, true);
  assert.equal(res.payload.message, 'Welcome back, Alice');
  assert.deepEqual(res.payload.data, { userId: 'user-123' });
});

test('isAuthenticated rejects missing token with 401 unauthorized response', async () => {
  const res = {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  const req = { cookies: {} };
  const next = () => {};

  await isAuthenticated(req, res, next);

  assert.equal(res.statusCode, 401);
  assert.equal(res.payload.success, false);
  assert.equal(res.payload.message, 'Login First');
});
