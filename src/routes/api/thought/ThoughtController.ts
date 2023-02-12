import { Thought } from '../../../models';

class ThoughtController {
  private thought;

  constructor(thought_model: typeof Thought) {
    this.thought = thought_model;
  }

  async getAllThoughts() {
    return await this.thought.find().populate('reactions');
  }

  async getOneThought(_id: string) {
    return await this.thought.findById(_id);
  }

  async createThought(user_id: string, username: string, thought_text: string) {
    return await this.thought.create({ user_id, username, thought_text });
  }

  async updateThought(_id: string, update: { thought_text: string }) {
    return await this.thought.findByIdAndUpdate(_id, update, { new: true });
  }

  async deleteThought(_id: string) {
    return await this.thought.findByIdAndDelete(_id);
  }

  async deleteAllUserThoughts(username: string) {
    return await this.thought.deleteMany({ username });
  }

  async addReaction(_id: string, new_reaction: { username: string; reaction_body: string }) {
    return await this.thought.findByIdAndUpdate(_id, { $push: { reactions: new_reaction } }, { new: true });
  }

  async removeReaction(_id: string, reaction_id: string) {
    return await this.thought.findByIdAndUpdate(_id, { $pull: { reactions: { _id: reaction_id } } }, { new: true });
  }
}

export default new ThoughtController(Thought);
