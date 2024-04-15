import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {
  createStudyPlan,
  listStudyPlans,
  getStudyPlanById,
  deleteStudyPlan,
  createNotes,
  createQuiz,
  createFlashcards,
} from '../controllers/study.js';

const router = express.Router();

router.get('/', isAuthenticated, listStudyPlans);
router.get('/:id', isAuthenticated, getStudyPlanById);
router.delete('/:id', isAuthenticated, deleteStudyPlan);
router.post('/plan', isAuthenticated, createStudyPlan);
router.post('/notes', isAuthenticated, createNotes);
router.post('/quiz', isAuthenticated, createQuiz);
router.post('/flashcards', isAuthenticated, createFlashcards);

export default router;
