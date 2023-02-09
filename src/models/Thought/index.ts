import { Schema, model } from "mongoose";
import { reactionSchema } from "./Reaction";

interface IThought {
  username: string;
  thought_text: string;
  created_at: Date;
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
      // TODO: Must be between 1 and 280 characters
    },
    created_at: {
      type: Date,
      default: Date.now,
      // TODO: Use a getter method to format the timestamp on query
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
  }
);

export const Thought = model<IThought>("Thought", thoughtSchema);
