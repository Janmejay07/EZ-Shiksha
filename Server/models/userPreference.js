import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Userdatas',
      required: true,
      unique: true,
      index: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    preferredStudyStyle: {
      type: String,
      default: 'balanced',
    },
  },
  { timestamps: true }
);

export const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);
