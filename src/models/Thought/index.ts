import { Schema, model } from 'mongoose';
import { reactionSchema } from './Reaction';
import { formatDate } from '../../utils';

export { IReaction } from './Reaction';
export interface IThought {
  _id: string;
  username: string;
  thought_text: string;
  created_at: Date | string;
  reactions: [typeof reactionSchema];
}

const thoughtSchema = new Schema<IThought>(
  {
    username: {
      type: String,
      required: true,
    },
    thought_text: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxlength: 280,
    },
    created_at: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    reactions: [reactionSchema],
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

thoughtSchema.virtual('reaction_count').get(function () {
  return this.reactions?.length;
});

export const Thought = model<IThought>('Thought', thoughtSchema);
