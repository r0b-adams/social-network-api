import { RequestHandler } from 'express';
import thoughtController from './ThoughtController';

export const getAllThoughts: RequestHandler = async (_req, res, next) => {
  try {
    const thoughts = await thoughtController.getAllThoughts();
    res.json(thoughts);
  } catch (error) {
    next(error);
  }
};

export const getOneThought: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const thought = await thoughtController.getOneThought(_id);
    res.json(thought);
  } catch (error) {
    next(error);
  }
};

// POST to create a new thought
// (don't forget to push the created thought's _id to the associated user's thoughts array field)
interface INewThought {
  user_id: string;
  username: string;
  thought_text: string;
}

export const createThought: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { user_id, username, thought_text } = req.body as INewThought;
    const thought = await thoughtController.createThought(user_id, username, thought_text);
    res.json(thought);
  } catch (error) {
    next(error);
  }
};

// PUT to update a thought by its _id

// DELETE

// POST to create a reaction to be stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reaction_id value
