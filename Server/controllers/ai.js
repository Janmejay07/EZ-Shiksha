import { answerQuestionFromDocument } from '../services/ai/service.js';
import { Document } from '../models/document.js';
import { Conversation } from '../models/conversation.js';

export const askDocumentQuestion = async (req, res, next) => {
  try {
    const { question, documentId } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      });
    }

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
        message: 'You do not have permission to ask questions on this document',
      });
    }

    const answer = await answerQuestionFromDocument({
      question,
      document,
    });

    const conversation = await Conversation.findOne({ userId: req.user._id, documentIds: { $in: [String(document._id)] } });

    if (!conversation) {
      await Conversation.create({
        userId: req.user._id,
        title: document.title,
        documentIds: [String(document._id)],
        messages: [
          { role: 'user', content: question },
          { role: 'assistant', content: answer },
        ],
      });
    } else {
      conversation.messages.push(
        { role: 'user', content: question },
        { role: 'assistant', content: answer }
      );
      conversation.title = conversation.title || document.title;
      await conversation.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Answer generated successfully',
      data: {
        answer,
        documentId: document._id,
        documentTitle: document.title,
      },
    });
  } catch (error) {
    next(error);
  }
};
