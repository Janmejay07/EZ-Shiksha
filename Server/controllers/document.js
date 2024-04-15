import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Document } from '../models/document.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const canAccessDocument = (authenticatedUser, documentOwner) => {
  if (!authenticatedUser || !documentOwner) return false;

  const userId = String(authenticatedUser.userId || authenticatedUser._id || authenticatedUser.id || '');
  const ownerId = String(documentOwner.userId || documentOwner._id || documentOwner.id || '');

  return userId && userId === ownerId;
};

export const normalizeDocumentPayload = (document) => ({
  id: document._id?.toString?.() || document.id,
  title: document.title,
  originalFileName: document.originalFileName,
  fileType: document.fileType,
  status: document.status || 'uploaded',
  createdAt: document.createdAt,
  updatedAt: document.updatedAt,
  filePath: document.filePath,
  extractedText: document.extractedText || '',
});

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const allowedTypes = ['pdf', 'txt', 'docx', 'png', 'jpg', 'jpeg'];
    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');

    if (!allowedTypes.includes(ext)) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        success: false,
        message: 'Unsupported file type',
      });
    }

    const document = await Document.create({
      userId: req.user._id,
      title: path.parse(req.file.originalname).name,
      originalFileName: req.file.originalname,
      fileType: ext,
      filePath: req.file.path,
      status: 'uploaded',
    });

    return res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        document: normalizeDocumentPayload(document),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Documents fetched successfully',
      data: {
        documents: documents.map(normalizeDocumentPayload),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    if (!canAccessDocument({ userId: req.user._id.toString() }, { userId: document.userId.toString() })) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this document',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Document fetched successfully',
      data: {
        document: normalizeDocumentPayload(document),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    if (!canAccessDocument({ userId: req.user._id.toString() }, { userId: document.userId.toString() })) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this document',
      });
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await document.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Document deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
