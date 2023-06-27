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
    res.json(thoughts);
  } catch (error) {
    next(error);
  }
};

export const getOneThought: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const thought = await thoughtController.getOneThought(id);
    res.json(thought);
  } catch (error) {
    next(error);
  }
};

export const createThought: RequestHandler<{}, {}, IThought & { userId: string }> = async (req, res, next) => {
  try {
    const { userId, username, thoughtText } = req.body;
    const thought = await thoughtController.createThought(userId, username, thoughtText);
    await userController.addThought(userId, thought._id);
    res.json(thought);
  } catch (error) {
    next(error);
  }
};

export const updateThought: RequestHandler<IParams, {}, IThought> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { thoughtText } = req.body;
    const thought = await thoughtController.updateThought(id, { thoughtText });
    res.json(thought ?? {});
  } catch (error) {
    next(error);
  }
};

export const deleteThought: RequestHandler = async (req, res, next) => {
  try {
    let update = null;
    const { id } = req.params;
    const deleted_thought = await thoughtController.deleteThought(id);
    if (deleted_thought) {
      update = await userController.removeThought(deleted_thought._id, deleted_thought.username);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addReaction: RequestHandler<IParams, {}, IReaction> = async (req, res, next) => {
  try {
    const { thoughtId } = req.params;
    const { username, reactionBody } = req.body;
    const thought = await thoughtController.addReaction(thoughtId, { username, reactionBody });
    res.json(thought ?? {});
  } catch (error) {
    next(error);
  }
};

export const removeReaction: RequestHandler = async (req, res, next) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const thought = await thoughtController.removeReaction(thoughtId, reactionId);
    res.json(thought ?? {});
  } catch (error) {
    next(error);
  }
};
