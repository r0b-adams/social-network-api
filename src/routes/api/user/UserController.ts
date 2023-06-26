import { User } from '../../../models';

class UserController {
  private user = User;

  async getAllUsers() {
    return await this.user.find().populate('friends', ['username', 'email']).populate('thoughts');
  }

  async getOneUser(_id: string) {
    return await this.user.findById(_id).populate('friends', ['username', 'email']).populate('thoughts');
  }

  async createUser(username: string, email: string) {
    return await this.user.create({ username, email });
  }

  async updateUser(_id: string, update: { username: string; email: string }) {
    return await this.user
      .findByIdAndUpdate(_id, update, { new: true })
      .populate('friends', ['username', 'email'])
      .populate('thoughts');
  }

  // delete user and remove the deleted user's id from all friend arrays
  async deleteUser(_id: string) {
    const deleted_user = await this.user.findByIdAndDelete(_id);
    if (deleted_user) {
      await this.user.updateMany({ _id: { $in: deleted_user.friends } }, { $pull: { friends: deleted_user._id } });
    }
    return deleted_user;
  }

  async addFriend(_id: string, friend_id: string) {
    // ids each added to the other user's friends list
    const [user, friend] = await Promise.all([
      this.user
        .findByIdAndUpdate(_id, { $addToSet: { friends: friend_id } }, { new: true })
        .populate('friends', ['username']),
      this.user
        .findByIdAndUpdate(friend_id, { $addToSet: { friends: _id } }, { new: true })
        .populate('friends', ['username']),
    ]);
    return { user, friend };
  }

  async removeFriend(_id: string, friend_id: string) {
    // ids each removed from the other user's friends list
    const [user, friend] = await Promise.all([
      this.user
        .findByIdAndUpdate(_id, { $pull: { friends: friend_id } }, { new: true })
        .populate('friends', ['username']),
      this.user
        .findByIdAndUpdate(friend_id, { $pull: { friends: _id } }, { new: true })
        .populate('friends', ['username']),
    ]);
    return { user, friend };
  }

  async addThought(user_id: string, thought_id: string) {
    return await this.user.findByIdAndUpdate(user_id, { $addToSet: { thoughts: thought_id } }, { new: true });
  }

  async removeThought(thought_id: string, username: string) {
    return await this.user.updateOne({ username }, { $pull: { thoughts: thought_id } }, { new: true });
  }
}

export default new UserController();
