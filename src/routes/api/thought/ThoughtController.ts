import { Thought } from '../../../models';
import { User } from '../../../models';

class ThoughtController {
  private user;
  private thought;

  constructor(user_model: typeof User, thought_model: typeof Thought) {
    this.user = user_model;
    this.thought = thought_model;
  }

  async getAllThoughts() {
    return await this.thought.find().populate('reactions');
  }

  async getOneThought(_id: string) {
    return await this.thought.findById(_id);
  }

  async createThought(user_id: string, username: string, thought_text: string) {
    const thought = await this.thought.create({ user_id, username, thought_text });

    // push created thought id to user's thoughts
    const user = await this.user.findByIdAndUpdate(
      user_id,
      {
        $addToSet: { thoughts: thought._id },
      },
      { new: true },
    );

    return { thought, user };
  }

  async updateThought(_id: string, update: { thought_text: string }) {
    return await this.thought.findByIdAndUpdate(_id, update, { new: true });
  }

  async deleteThought(_id: string) {
    let update = null;
    const thought = await this.thought.findByIdAndDelete(_id);

    if (thought) {
      // remove thought id from user's thoughts
      update = await this.user.updateOne(
        { username: thought.username },
        {
          $pull: { thoughts: thought._id },
        },
        { new: true },
      );
    }

    return { thought, update };
  }

  async addReaction(thought_id: string, reaction: { username: string; reaction_body: string }) {
    return await this.thought.findByIdAndUpdate(
      thought_id,
      {
        $push: { reactions: reaction },
      },
      { new: true },
    );
  }

  async removeReaction(thought_id: string, reaction_id: string) {
    return await this.thought.findByIdAndUpdate(
      thought_id,
      {
        $pull: { reactions: { _id: reaction_id } },
      },
      { new: true },
    );
  }
}

export default new ThoughtController(User, Thought);
