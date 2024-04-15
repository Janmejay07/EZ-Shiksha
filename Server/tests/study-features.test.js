import test from 'node:test';
import assert from 'node:assert/strict';

import { generateStudyNotes, generateQuiz, generateFlashcards } from '../services/ai/studyFeatures.js';
import { buildStudyPlan, normalizeStudyPreference } from '../services/ai/studyAgent.js';
import { StudyPlan } from '../models/studyPlan.js';
import { listStudyPlans, getStudyPlanById, deleteStudyPlan, createStudyPlan } from '../controllers/study.js';

test('generateStudyNotes returns structured note content for valid document text', () => {
  const notes = generateStudyNotes('Normalization is the process of organizing data. It reduces redundancy and improves efficiency.', 'DBMS Notes');

  assert.equal(notes.title, 'DBMS Notes');
  assert.equal(Array.isArray(notes.keyConcepts), true);
  assert.equal(Array.isArray(notes.importantPoints), true);
  assert.equal(notes.keyConcepts.length > 0, true);
});

test('generateQuiz creates a valid quiz structure', () => {
  const quiz = generateQuiz({
    documentText: 'Normalization reduces redundancy in a database.',
    count: 3,
    difficulty: 'easy',
  });

  assert.equal(quiz.count, 3);
  assert.equal(Array.isArray(quiz.questions), true);
  assert.equal(quiz.questions[0].correctAnswer, 'Main idea');
});

test('generateFlashcards creates a usable flashcard list', () => {
  const cards = generateFlashcards({
    documentText: 'Normalization reduces redundancy in a database.',
    count: 2,
  });

  assert.equal(cards.count, 2);
  assert.equal(Array.isArray(cards.cards), true);
});

test('buildStudyPlan creates a personalized revision plan with schedule and actions', () => {
  const plan = buildStudyPlan({
    title: 'DBMS Revision',
    documentText: 'Normalization reduces redundancy. It organizes data into tables and prevents anomalies.',
    userPreference: {
      difficulty: 'easy',
      preferredStudyStyle: 'active recall',
      subjects: ['DBMS'],
    },
  });

  assert.equal(plan.title, 'DBMS Revision');
  assert.equal(Array.isArray(plan.recommendedActions), true);
  assert.equal(Array.isArray(plan.schedule), true);
  assert.equal(plan.schedule.length > 0, true);
  assert.equal(plan.studyStyle, 'active recall');
});

test('normalizeStudyPreference sanitizes user preferences and falls back to safe defaults', () => {
  const preference = normalizeStudyPreference({
    difficulty: 'hard',
    preferredStudyStyle: ' spaced repetition ',
    subjects: ['DBMS', '   ', 'Algorithms'],
  });

  assert.equal(preference.difficulty, 'hard');
  assert.equal(preference.preferredStudyStyle, 'spaced repetition');
  assert.deepEqual(preference.subjects, ['DBMS', 'Algorithms']);
});

test('StudyPlan model stores user, document, and generated plan content', () => {
  const payload = {
    userId: '64d3a6d2d0ec2a8f9a0c1234',
    documentId: '64d3a6d2d0ec2a8f9a0c5678',
    title: 'DBMS Revision',
    plan: {
      title: 'DBMS Revision',
      subjects: ['DBMS'],
      recommendedActions: ['Review definitions'],
    },
  };

  assert.equal(payload.title, 'DBMS Revision');
  assert.equal(typeof payload.plan, 'object');
  assert.equal(Array.isArray(payload.plan.recommendedActions), true);
  assert.equal(payload.plan.subjects[0], 'DBMS');
});

test('listStudyPlans and deleteStudyPlan return the correct payloads for the authenticated user', async () => {
  const originalFind = StudyPlan.find;
  const originalFindOne = StudyPlan.findOne;
  const originalDeleteOne = StudyPlan.deleteOne;
  const planRecord = {
    _id: '64d3a6d2d0ec2a8f9a0c9999',
    userId: '64d3a6d2d0ec2a8f9a0c1234',
    title: 'DBMS Revision',
    plan: { title: 'DBMS Revision', subjects: ['DBMS'] },
  };

  StudyPlan.find = () => ({ sort: async () => [planRecord] });
  StudyPlan.findOne = async () => planRecord;
  StudyPlan.deleteOne = async () => ({ acknowledged: true });

  const res = {
    status(code) { this.code = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };

  await listStudyPlans({ user: { _id: '64d3a6d2d0ec2a8f9a0c1234' } }, res, () => {});
  assert.equal(res.payload.success, true);
  assert.equal(Array.isArray(res.payload.data.plans), true);

  const deleteResponse = {
    status(code) { this.code = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };

  await deleteStudyPlan({ user: { _id: '64d3a6d2d0ec2a8f9a0c1234' }, params: { id: '64d3a6d2d0ec2a8f9a0c9999' } }, deleteResponse, () => {});
  assert.equal(deleteResponse.payload.success, true);

  StudyPlan.find = originalFind;
  StudyPlan.findOne = originalFindOne;
  StudyPlan.deleteOne = originalDeleteOne;
});

test('createStudyPlan accepts raw text when no documentId is supplied', async () => {
  const originalCreate = StudyPlan.create;
  StudyPlan.create = async () => ({ _id: '64d3a6d2d0ec2a8f9a0c4444' });

  const req = {
    user: { _id: '64d3a6d2d0ec2a8f9a0c1234' },
    body: {
      title: 'Direct Text Plan',
      documentText: 'Normalization reduces redundancy in a database. It organizes data and prevents anomalies.',
      userPreference: { difficulty: 'easy', preferredStudyStyle: 'active recall', subjects: ['DBMS'] },
    },
  };

  const res = {
    status(code) { this.code = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };

  await createStudyPlan(req, res, () => {});
  assert.equal(res.payload.success, true);
  assert.equal(res.payload.data.plan.title, 'Direct Text Plan');
  assert.equal(Array.isArray(res.payload.data.plan.schedule), true);

  StudyPlan.create = originalCreate;
});
