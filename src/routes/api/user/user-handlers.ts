import { RequestHandler } from 'express';
import userController from './UserController';
import thoughtController from '../thought/ThoughtController';

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
    const { id } = req.params;
    const user = await userController.getOneUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await userController.createUser(username, email);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = await userController.updateUser(id, { username, email });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted_user = await userController.deleteUser(id);
    if (deleted_user) {
      await thoughtController.deleteAllUserThoughts(deleted_user.username);
    }
    res.json({ deleted_user });
  } catch (error) {
    next(error);
  }
};

export const addFriend: RequestHandler = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;
    const response = await userController.addFriend(userId, friendId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const removeFriend: RequestHandler = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;
    const response = await userController.removeFriend(userId, friendId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
