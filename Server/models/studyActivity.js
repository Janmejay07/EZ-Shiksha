import mongoose from 'mongoose';

const studyActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Userdatas',
      required: true,
      index: true,
    },
    activityType: {
      type: String,
      required: true,
      trim: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      default: null,
      index: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export const StudyActivity = mongoose.model('StudyActivity', studyActivitySchema);
