import { RequestHandler } from 'express';
import thoughtController from './ThoughtController';

// GET to get all thoughts
export const getAllThoughts: RequestHandler = async (_req, res, next) => {
  try {
    const users = await thoughtController.getAllThoughts();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
// GET to get a single thought by its _id

// POST to create a new thought
// (don't forget to push the created thought's _id to the associated user's thoughts array field)

// PUT to update a thought by its _id

// DELETE

// POST to create a reaction to be stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reaction_id value
