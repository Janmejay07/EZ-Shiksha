export const generateStudyNotes = (documentText = '', title = 'Study Notes') => {
  const cleaned = String(documentText || '').trim();

  if (!cleaned) {
    return {
      title,
      overview: 'No study material was provided for note generation.',
      keyConcepts: [],
      definitions: [],
      importantPoints: [],
      examples: [],
      examTips: [],
    };
  }

  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const keyConcepts = Array.from(new Set(sentences.slice(0, 3))).map((sentence) => sentence.trim());

  return {
    title,
    overview: `This note summarizes the main ideas in the uploaded material. The source content points to the following key themes and takeaways.`,
    keyConcepts,
    definitions: [
      'Concepts are the main ideas repeated in the study material.',
      'Definitions help clarify terminology and build stronger understanding.',
    ],
    importantPoints: sentences.slice(0, 5).map((sentence) => sentence.trim()),
    examples: ['Use examples from your document to reinforce the concept.'],
    examTips: [
      'Review the key concepts and definitions before exams.',
      'Focus on connections between terms, examples, and real use cases.',
    ],
  };
};

export const generateQuiz = ({ documentText = '', count = 5, difficulty = 'medium' } = {}) => {
  const cleaned = String(documentText || '').trim();

  if (!cleaned) {
    return {
      count: 0,
      difficulty,
      questions: [],
      message: 'No content available to generate a quiz.',
    };
  }

  const questions = Array.from({ length: Math.min(count, 5) }, (_, index) => ({
    question: `Question ${index + 1}: What is a key concept highlighted in the study material?`,
    options: ['Main idea', 'Unrelated detail', 'Irrelevant fact', 'Random statement'],
    correctAnswer: 'Main idea',
    explanation: 'The study material is designed to emphasize the core concept, not unrelated details.',
  }));

  return {
    count: questions.length,
    difficulty,
    questions,
  };
};

export const generateFlashcards = ({ documentText = '', count = 4 } = {}) => {
  const cleaned = String(documentText || '').trim();

  if (!cleaned) {
    return {
      count: 0,
      cards: [],
      message: 'No content available to generate flashcards.',
    };
  }

  const cards = Array.from({ length: Math.min(count, 4) }, (_, index) => ({
    question: `Flashcard ${index + 1}: What is the central idea of this study material?`,
    answer: 'It highlights the core concept and important points you should remember.',
    difficulty: 'medium',
  }));

  return {
    count: cards.length,
    cards,
  };
};
