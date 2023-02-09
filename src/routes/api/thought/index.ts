import { Router } from "express";
import controller from "./ThoughtController";

/**
 *
 * /api/thoughts
 *
 */
const router = Router();

// GET to get all thoughts
router.get("/", async (req, res, next) => {
  try {
    const response = await controller.getAllThoughts();
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET to get a single thought by its _id
router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const response = await controller.getOneThought(_id);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST to create a new thought
// (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post("/", async (req, res, next) => {
  try {
    const { user_id, username, thought_text } = req.body;
    const response = await controller.createThought(user_id, username, thought_text);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PUT to update a thought by its _id
router.put("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { thought_text } = req.body;
    const response = await controller.updateThought(_id, thought_text);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const response = await controller.deleteThought(_id);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST to create a reaction to be stored in a single thought's reactions array field
router.post("/:thought_id/reactions", async (req, res, next) => {
  try {
    const { thought_id } = req.params;
    const { username, reaction_body } = req.body;
    const response = await controller.addReaction(thought_id, username, reaction_body);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE to pull and remove a reaction by the reaction's reaction_id value
router.delete("/:thought_id/reactions/:reaction_id", async (req, res, next) => {
  try {
    const { thought_id, reaction_id } = req.params;
    const response = await controller.removeReaction(thought_id, reaction_id);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { router as thoughtRoutes };
