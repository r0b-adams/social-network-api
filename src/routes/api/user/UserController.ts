import { User } from '../../../models';

class UserController {
  user: typeof User;

  constructor(user_model: typeof User) {
    this.user = user_model;
  }

  async getAllUsers() {
    return await this.user.find().populate('friends').populate('thoughts');
  }

  async getOneUser(_id: string) {
    return await this.user.findById(_id);
  }

  async createUser(username: string, email: string) {
    return await this.user.create({ username, email });
  }

  async updateUser(_id: string, dto: { username?: string; email?: string }) {
    return await this.user.findByIdAndUpdate(_id, dto, { new: true });
  }

  async deleteUser(_id: string) {
    return await this.user.findByIdAndDelete(_id);
  }

  // TODO: avoid adding duplicate friend
  async addFriend(user_id: string, friend_id: string) {
    return await this.user.findByIdAndUpdate(
      user_id,
      { $push: { friends: friend_id } },
      { new: true },
    );
  }

  async removeFriend(user_id: string, friend_id: string) {
    return await this.user.findByIdAndUpdate(
      user_id,
      { $pull: { friends: friend_id } },
      { new: true },
    );
  }
}

export default new UserController(User);
