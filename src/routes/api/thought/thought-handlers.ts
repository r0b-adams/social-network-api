import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IThought, IReaction } from '../../../models/Thought';
import userController from '../user/UserController';
import thoughtController from './ThoughtController';

// alias
type IParams = ParamsDictionary;

export const getAllThoughts: RequestHandler = async (_req, res, next) => {
  try {
    const thoughts = await thoughtController.getAllThoughts();
    res.json({ thoughts });
  } catch (error) {
    next(error);
  }
};

export const getOneThought: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const thought = await thoughtController.getOneThought(_id);
    res.json({ thought });
  } catch (error) {
    next(error);
  }
};

export const createThought: RequestHandler<{}, {}, IThought & { user_id: string }> = async (req, res, next) => {
  try {
    const { user_id, username, thought_text } = req.body;
    const thought = await thoughtController.createThought(user_id, username, thought_text);
    const user = await userController.addThought(user_id, thought._id);
    res.json({ thought, user });
  } catch (error) {
    next(error);
  }
};

export const updateThought: RequestHandler<IParams, {}, IThought> = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { thought_text } = req.body;
    const thought = await thoughtController.updateThought(_id, { thought_text });
    res.json({ thought });
  } catch (error) {
    next(error);
  }
};

export const deleteThought: RequestHandler = async (req, res, next) => {
  try {
    let update = null;
    const { _id } = req.params;
    const deleted_thought = await thoughtController.deleteThought(_id);
    if (deleted_thought) {
      update = await userController.removeThought(deleted_thought._id, deleted_thought.username);
    }
    res.json({ deleted_thought, update });
  } catch (error) {
    next(error);
  }
};

export const addReaction: RequestHandler<IParams, {}, IReaction> = async (req, res, next) => {
  try {
    const { thought_id } = req.params;
    const { username, reaction_body } = req.body;
    const thought = await thoughtController.addReaction(thought_id, { username, reaction_body });
    res.json({ thought });
  } catch (error) {
    next(error);
  }
};

export const removeReaction: RequestHandler = async (req, res, next) => {
  try {
    const { thought_id, reaction_id } = req.params;
    const thought = await thoughtController.removeReaction(thought_id, reaction_id);
    res.json({ thought });
  } catch (error) {
    next(error);
  }
};
