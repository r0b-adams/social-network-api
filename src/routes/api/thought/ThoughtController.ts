import { Thought } from '../../../models';

class ThoughtController {
  private thought = Thought;

  async getAllThoughts() {
    return await this.thought.find().populate('reactions');
  }

  async getOneThought(id: string) {
    return await this.thought.findById(id);
  }

  async createThought(userId: string, username: string, thoughtText: string) {
    return await this.thought.create({ userId, username, thoughtText });
  }

  async updateThought(id: string, update: { thoughtText: string }) {
    return await this.thought.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteThought(id: string) {
    return await this.thought.findByIdAndDelete(id);
  }

  async deleteAllUserThoughts(username: string) {
    return await this.thought.deleteMany({ username });
  }

  async addReaction(id: string, reaction: { username: string; reactionBody: string }) {
    return await this.thought.findByIdAndUpdate(id, { $push: { reactions: reaction } }, { new: true });
  }

  async removeReaction(id: string, reactionId: string) {
    return await this.thought.findByIdAndUpdate(id, { $pull: { reactions: { reactionId } } }, { new: true });
  }
}

export default new ThoughtController();
