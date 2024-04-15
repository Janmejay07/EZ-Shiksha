import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { askDocumentQuestion } from '../controllers/ai.js';

const router = express.Router();

router.post('/ask', isAuthenticated, askDocumentQuestion);

export default router;
