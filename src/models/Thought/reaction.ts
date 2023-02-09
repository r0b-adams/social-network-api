import { Schema } from 'mongoose';

export interface IReaction {
  username: string;
  reaction_body: string;
  created_at: Date;
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
      // TODO: 280 character maximum
    },
    created_at: {
      type: Date,
      default: Date.now,
      // TODO:  Use a getter method to format the timestamp on query
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
