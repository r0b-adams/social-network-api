import { Schema, model } from 'mongoose';
import { reactionSchema } from './reaction';
import { formatDate } from '../../utils';

export { IReaction } from './reaction';
export interface IThought {
  _id: string;
  username: string;
  thoughtText: string;
  createdAt: Date | string;
  reactions: [typeof reactionSchema];
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
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

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export const Thought = model<IThought>('Thought', thoughtSchema);
