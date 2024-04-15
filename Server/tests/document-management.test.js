import test from 'node:test';
import assert from 'node:assert/strict';

import {
  canAccessDocument,
  normalizeDocumentPayload,
} from '../controllers/document.js';

test('normalizeDocumentPayload returns a safe response with status and metadata', () => {
  const payload = normalizeDocumentPayload({
    _id: 'doc-1',
    title: 'DBMS Notes',
    originalFileName: 'dbms.pdf',
    fileType: 'pdf',
    status: 'completed',
    createdAt: new Date('2026-09-01T00:00:00Z'),
  });

  assert.equal(payload.id, 'doc-1');
  assert.equal(payload.title, 'DBMS Notes');
  assert.equal(payload.originalFileName, 'dbms.pdf');
  assert.equal(payload.status, 'completed');
  assert.equal(payload.fileType, 'pdf');
});

test('canAccessDocument allows same-user access and blocks other users', () => {
  assert.equal(canAccessDocument({ userId: 'user-1' }, { userId: 'user-1' }), true);
  assert.equal(canAccessDocument({ userId: 'user-1' }, { userId: 'user-2' }), false);
});
