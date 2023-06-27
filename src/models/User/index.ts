import { Schema, model, Types } from 'mongoose';

interface IUser {
  _id: string;
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
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'must enter a valid email address'],
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

userSchema.virtual('friendCount').get(function () {
  return this.friends?.length;
});

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts?.length;
});

export const User = model<IUser>('User', userSchema);
