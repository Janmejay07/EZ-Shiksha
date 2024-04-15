import test from 'node:test';
import assert from 'node:assert/strict';

import { User } from '../models/user.js';
import { Document } from '../models/document.js';
import { Conversation } from '../models/conversation.js';

const user = new User({
  name: 'Aisha',
  email: 'aisha@example.com',
  password: 'hashed-password',
  interests: ['DBMS', 'AI'],
  avatar: 'avatar.png',
});

test('User model keeps base profile and study metadata', () => {
  assert.equal(user.name, 'Aisha');
  assert.equal(user.email, 'aisha@example.com');
  assert.deepEqual(user.interests, ['DBMS', 'AI']);
  assert.equal(user.avatar, 'avatar.png');
});

test('Document model stores processing metadata for study materials', () => {
  const doc = new Document({
    userId: '64c1a2b3d4e5f6a7b8c9d0e1',
    title: 'DBMS Notes',
    originalFileName: 'dbms.pdf',
    fileType: 'pdf',
    filePath: '/uploads/dbms.pdf',
    extractedText: 'Normalization is a process',
    status: 'processed',
    vectorCollection: 'dbms-vectors',
    vectorDocumentId: 'vector-1',
  });

  assert.equal(doc.title, 'DBMS Notes');
  assert.equal(doc.status, 'processed');
  assert.equal(doc.fileType, 'pdf');
  assert.equal(doc.vectorCollection, 'dbms-vectors');
});

test('Conversation model stores message history and document links', () => {
  const conversation = new Conversation({
    userId: '64c1a2b3d4e5f6a7b8c9d0e1',
    title: 'DBMS Q&A',
    messages: [
      { role: 'user', content: 'Explain normalization' },
      { role: 'assistant', content: 'Normalization is the process of organizing data.' },
    ],
    documentIds: ['doc-1'],
  });

  assert.equal(conversation.title, 'DBMS Q&A');
  assert.equal(conversation.messages.length, 2);
  assert.deepEqual(conversation.documentIds, ['doc-1']);
});
