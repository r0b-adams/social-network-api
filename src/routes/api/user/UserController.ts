import { User } from '../../../models';

class UserController {
  private user;

  constructor(user_model: typeof User) {
    this.user = user_model;
  }

  async getAllUsers() {
    return await this.user.find().populate('friends', ['username', 'email']).populate('thoughts');
  }

  async getOneUser(user_id: string) {
    return await this.user.findById(user_id).populate('friends', ['username', 'email']).populate('thoughts');
  }

  async createUser(username: string, email: string) {
    return await this.user.create({ username, email });
  }

  async updateUser(user_id: string, update: { username: string; email: string }) {
    return await this.user
      .findByIdAndUpdate(user_id, update, { new: true })
      .populate('friends', ['username', 'email'])
      .populate('thoughts');
  }

  async deleteUser(user_id: string) {
    let update_result = null;
    const deleted_user = await this.user.findByIdAndDelete(user_id);

    if (deleted_user) {
      update_result = await this.user.updateMany(
        { _id: { $in: deleted_user.friends } },
        { $pull: { friends: user_id } },
      );
    }

    return { deleted_user, update_result };
  }

  async addFriend(user_id: string, friend_id: string) {
    // ids each added to the other user's friends
    const [user, friend] = await Promise.all([
      this.user
        .findByIdAndUpdate(user_id, { $addToSet: { friends: friend_id } }, { new: true })
        .populate('friends', ['username']),
      this.user
        .findByIdAndUpdate(friend_id, { $addToSet: { friends: user_id } }, { new: true })
        .populate('friends', ['username']),
    ]);

    return { user, friend };
  }

  async removeFriend(user_id: string, friend_id: string) {
    // ids each removed from the other user's friends
    const [user, friend] = await Promise.all([
      this.user
        .findByIdAndUpdate(user_id, { $pull: { friends: friend_id } }, { new: true })
        .populate('friends', ['username']),
      this.user
        .findByIdAndUpdate(friend_id, { $pull: { friends: user_id } }, { new: true })
        .populate('friends', ['username']),
    ]);

    return { user, friend };
  }
}

export default new UserController(User);
