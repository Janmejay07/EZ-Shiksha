export const cleanText = (text = '') =>
  String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();

export const chunkText = (text = '', chunkSize = 500) => {
  const cleaned = cleanText(text);

  if (!cleaned) return [];

  const chunks = [];
  for (let i = 0; i < cleaned.length; i += chunkSize) {
    const part = cleaned.slice(i, i + chunkSize).trim();
    if (part) chunks.push(part);
  }

  return chunks;
};

export const buildDocumentMetadata = ({ documentId, userId, title, chunkIndex = 0, page = 1 }) => ({
  documentId,
  userId,
  title,
  chunkIndex,
  page,
  source: title,
});
