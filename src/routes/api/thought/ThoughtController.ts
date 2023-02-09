import { Thought } from '../../../models';

class ThoughtController {
  thought: typeof Thought;

  constructor(thought_model: typeof Thought) {
    this.thought = thought_model;
  }

  async getAllThoughts() {
    const response = 'GET all thoughts';
    return response;
  }

  async getOneThought(_id: string) {
    const response = `GET thought with id: ${_id}`;
    return response;
  }

  async createThought(user_id: string, username: string, thought_text: string) {
    const response = `create thought with data: ${JSON.stringify({
      user_id,
      username,
      thought_text,
    })}`;
    return response;
  }

  async updateThought(_id: string, thought_text: string) {
    const response = `PUT update thought with id: ${_id} with text: ${thought_text}`;
    return response;
  }

  async deleteThought(_id: string) {
    const response = `DELETE thought with id: ${_id}`;
    return response;
  }

  async addReaction(thought_id: string, username: string, reaction_body: string) {
    const response = `add reaction ${reaction_body} from ${username} to thought ${thought_id}`;
    return response;
  }

  async removeReaction(thought_id: string, reaction_id: string) {
    const response = `remove reaction ${reaction_id} from thought ${thought_id}`;
    return response;
  }
}

export default new ThoughtController(Thought);
