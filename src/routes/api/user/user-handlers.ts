import { RequestHandler } from 'express';
import userController from './UserController';

export const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getOneUser: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await userController.getOneUser(_id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await userController.createUser(username, email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { username, email } = req.body;
    const user = await userController.updateUser(_id, { username, email });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  // BONUS: Remove a user's associated thoughts when deleted.
  try {
    const { _id } = req.params;
    const response = await userController.deleteUser(_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const addFriend: RequestHandler = async (req, res, next) => {
  try {
    const { user_id, friend_id } = req.params;
    const response = await userController.addFriend(user_id, friend_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const removeFriend: RequestHandler = async (req, res, next) => {
  try {
    const { user_id, friend_id } = req.params;
    const response = await userController.removeFriend(user_id, friend_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
