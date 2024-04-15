export const normalizeStudyPreference = (userPreference = {}) => {
  const preference = userPreference || {};
  const allowedDifficulties = ['easy', 'medium', 'hard'];

  const normalizedDifficulty = typeof preference.difficulty === 'string'
    ? preference.difficulty.trim().toLowerCase()
    : 'medium';

  const difficulty = allowedDifficulties.includes(normalizedDifficulty)
    ? normalizedDifficulty
    : 'medium';

  const preferredStudyStyle = typeof preference.preferredStudyStyle === 'string'
    ? preference.preferredStudyStyle.trim().toLowerCase()
    : 'balanced';

  const subjects = Array.isArray(preference.subjects)
    ? [...new Set(
        preference.subjects
          .map((subject) => String(subject).trim())
          .filter(Boolean)
      )]
    : ['General Study'];

  return {
    difficulty,
    preferredStudyStyle: preferredStudyStyle || 'balanced',
    subjects: subjects.length > 0 ? subjects : ['General Study'],
  };
};

export const buildStudyPlan = ({
  title = 'Study Plan',
  documentText = '',
  userPreference = {},
} = {}) => {
  const cleanedText = String(documentText || '').trim();
  const preference = normalizeStudyPreference(userPreference);
  const subjectList = preference.subjects;
  const difficulty = preference.difficulty;
  const style = preference.preferredStudyStyle;

  if (!cleanedText) {
    return {
      title,
      studyStyle: style,
      difficulty,
      subjects: subjectList,
      recommendedActions: ['Add source material to begin planning.'],
      schedule: [{ day: 'Day 1', focus: 'Collect notes and identify key concepts.' }],
    };
  }

  const concepts = cleanedText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 4);

  const schedule = [
    {
      day: 'Day 1',
      focus: `Review the core definition and the most important idea: ${concepts[0] || 'main concept'}`,
    },
    {
      day: 'Day 2',
      focus: `Practice ${style} on ${subjectList.join(', ')} and rewrite the concept in your own words.`,
    },
    {
      day: 'Day 3',
      focus: 'Use quick self-tests, recap examples, and identify gaps before revision.',
    },
  ];

  return {
    title,
    studyStyle: style,
    difficulty,
    subjects: subjectList,
    recommendedActions: [
      `Focus on ${subjectList.join(', ')} concepts with a ${difficulty} difficulty level.`,
      `Use ${style} techniques to reinforce the main points from the uploaded material.`,
      'Summarize each section in one paragraph and test yourself without notes.',
    ],
    schedule,
  };
};
