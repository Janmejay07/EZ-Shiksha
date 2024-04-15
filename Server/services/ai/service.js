export const buildGroundedAnswer = (question, documentText = '', provider = process.env.LLM_PROVIDER || 'ollama') => {
  const cleanedQuestion = (question || '').trim();

  if (!cleanedQuestion) {
    return 'Please provide a valid question to continue.';
  }

  if (!documentText || !documentText.trim()) {
    return `AI is configured for ${provider}, but there is no uploaded study material to ground the answer yet. Add a document first or ask a question tied to uploaded content.`;
  }

  const excerpt = documentText.trim().slice(0, 1200).replace(/\s+/g, ' ');

  return `Based on the uploaded study material, here is a grounded explanation for: "${cleanedQuestion}". The relevant content indicates: ${excerpt}. This response is intentionally grounded in the uploaded document and should be reviewed against the original source for academic accuracy.`;
};

export const answerQuestionFromDocument = async ({ question, document }) => {
  const rationale = buildGroundedAnswer(
    question,
    document?.extractedText || document?.content || '',
    process.env.LLM_PROVIDER || 'ollama'
  );

  return rationale;
};
