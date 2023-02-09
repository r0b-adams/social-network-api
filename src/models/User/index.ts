import { Schema, model, Types } from 'mongoose';
import { EMAIL_REGEX } from '../../utils';

interface IUser {
  username: string;
  email: string;
  password: string;
  thoughts: [Types.ObjectId];
  friends: [Types.ObjectId];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [EMAIL_REGEX, 'must enter a valid email address'],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

userSchema.virtual('friend_count').get(function () {
  return this.friends.length;
});

userSchema.virtual('thought_count').get(function () {
  return this.thoughts.length;
});

export const User = model<IUser>('User', userSchema);
