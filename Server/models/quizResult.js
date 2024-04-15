import mongoose from 'mongoose';

const questionAnswerSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    userAnswer: { type: String, default: '' },
    correctAnswer: { type: String, default: '' },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Userdatas',
      required: true,
      index: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
      index: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    questions: {
      type: [questionAnswerSchema],
      default: [],
    },
    answers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const QuizResult = mongoose.model('QuizResult', quizResultSchema);
