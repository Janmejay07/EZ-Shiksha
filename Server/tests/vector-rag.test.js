import test from 'node:test';
import assert from 'node:assert/strict';

import { cleanText, chunkText, buildDocumentMetadata } from '../services/ai/documentPipeline.js';
import { getVectorClient, createCollection, searchDocuments } from '../services/vector/chroma.js';

test('cleanText strips newline noise and normalizes spacing', () => {
  const text = 'Normalization\n is the process\n of reducing redundancy.';
  const result = cleanText(text);

  assert.equal(result, 'Normalization is the process of reducing redundancy.');
});

test('chunkText creates multiple segments from long text', () => {
  const text = 'Normalization is a database process. '.repeat(6);
  const chunks = chunkText(text, 80);

  assert.ok(Array.isArray(chunks));
  assert.ok(chunks.length >= 2);
});

test('buildDocumentMetadata includes document, user, and chunk context', () => {
  const metadata = buildDocumentMetadata({
    documentId: 'doc-123',
    userId: 'user-456',
    title: 'DBMS Notes',
    chunkIndex: 2,
    page: 5,
  });

  assert.equal(metadata.documentId, 'doc-123');
  assert.equal(metadata.userId, 'user-456');
  assert.equal(metadata.chunkIndex, 2);
  assert.equal(metadata.page, 5);
});

test('vector client is configured for Chroma-ready retrieval', () => {
  const client = getVectorClient();

  assert.equal(client.provider, 'chroma');
  assert.equal(client.connected, true);
  assert.equal(client.collection, 'ezshiksha-documents');
});

test('collection creation and search stubs remain valid for future live integration', async () => {
  const collection = await createCollection();
  const results = await searchDocuments({ query: 'normalization', limit: 3 });

  assert.equal(collection.success, true);
  assert.equal(results.success, true);
  assert.equal(Array.isArray(results.matches), true);
});
