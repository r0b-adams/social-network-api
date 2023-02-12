import { Schema } from 'mongoose';
import { formatDate } from '../../utils';

export interface IReaction {
  username: string;
  reaction_body: string;
  created_at: Date | string;
}

export const reactionSchema = new Schema<IReaction>(
  {
    username: {
      type: String,
      required: true,
    },
    reaction_body: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    created_at: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    id: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);
