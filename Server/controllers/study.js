import { generateStudyNotes, generateQuiz, generateFlashcards } from '../services/ai/studyFeatures.js';
import { buildStudyPlan } from '../services/ai/studyAgent.js';
import { Document } from '../models/document.js';
import { StudyPlan } from '../models/studyPlan.js';

export const listStudyPlans = async (req, res, next) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Study plans fetched successfully',
      data: { plans },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudyPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await StudyPlan.findOne({ _id: id, userId: req.user._id });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Study plan fetched successfully',
      data: { plan },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudyPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await StudyPlan.findOne({ _id: id, userId: req.user._id });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found',
      });
    }

    await StudyPlan.deleteOne({ _id: id, userId: req.user._id });

    return res.status(200).json({
      success: true,
      message: 'Study plan deleted successfully',
      data: { deletedPlanId: id },
    });
  } catch (error) {
    next(error);
  }
};

export const createStudyPlan = async (req, res, next) => {
  try {
    const { documentId, title, userPreference, documentText } = req.body;

    if (!documentId && !documentText) {
      return res.status(400).json({
        success: false,
        message: 'Document ID or study text is required to create a study plan',
      });
    }

    let document = null;

    if (documentId) {
      document = await Document.findById(documentId);

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found',
        });
      }

      if (String(document.userId) !== String(req.user._id)) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to create a study plan for this document',
        });
      }
    }

    const plan = buildStudyPlan({
      title: title || document?.title || 'Study Plan',
      documentText: document?.extractedText || document?.originalFileName || documentText || '',
      userPreference,
    });

    const savedPlan = document
      ? await StudyPlan.create({
          userId: req.user._id,
          documentId: document._id,
          title: title || document.title || 'Study Plan',
          plan,
        })
      : await StudyPlan.create({
          userId: req.user._id,
          documentId: null,
          title: title || 'Study Plan',
          plan,
        });

    return res.status(200).json({
      success: true,
      message: 'Study plan generated successfully',
      data: { plan, savedPlanId: savedPlan._id },
    });
  } catch (error) {
    next(error);
  }
};

export const createNotes = async (req, res, next) => {
  try {
    const { documentId, title } = req.body;
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    if (String(document.userId) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate notes for this document',
      });
    }

    const notes = generateStudyNotes(document.extractedText || document.originalFileName, title || document.title);

    return res.status(200).json({
      success: true,
      message: 'Study notes generated successfully',
      data: { notes },
    });
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (req, res, next) => {
  try {
    const { documentId, count = 5, difficulty = 'medium' } = req.body;
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    if (String(document.userId) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate quizzes for this document',
      });
    }

    const quiz = generateQuiz({
      documentText: document.extractedText || document.originalFileName,
      count,
      difficulty,
    });

    return res.status(200).json({
      success: true,
      message: 'Quiz generated successfully',
      data: { quiz },
    });
  } catch (error) {
    next(error);
  }
};

export const createFlashcards = async (req, res, next) => {
  try {
    const { documentId, count = 4 } = req.body;
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    if (String(document.userId) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate flashcards for this document',
      });
    }

    const cards = generateFlashcards({
      documentText: document.extractedText || document.originalFileName,
      count,
    });

    return res.status(200).json({
      success: true,
      message: 'Flashcards generated successfully',
      data: { flashcards: cards },
    });
  } catch (error) {
    next(error);
  }
};
