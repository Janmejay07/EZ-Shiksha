import test from 'node:test';
import assert from 'node:assert/strict';

import { buildGroundedAnswer, answerQuestionFromDocument } from '../services/ai/service.js';

test('buildGroundedAnswer warns when no document text exists', () => {
  const result = buildGroundedAnswer('What is normalization?', '');
  assert.equal(result.includes('no uploaded study material'), true);
});

test('buildGroundedAnswer uses uploaded content as grounding', () => {
  const result = buildGroundedAnswer('What is normalization?', 'Normalization is the process of organizing data to reduce redundancy.');
  assert.equal(result.includes('Normalization is the process of organizing data to reduce redundancy.'), true);
});

test('answerQuestionFromDocument returns a grounded explanation from document content', async () => {
  const result = await answerQuestionFromDocument({
    question: 'What is normalization?',
    document: {
      extractedText: 'Normalization is the process of reducing redundancy in a database.',
    },
  });

  assert.equal(result.includes('Normalization is the process of reducing redundancy in a database.'), true);
});
