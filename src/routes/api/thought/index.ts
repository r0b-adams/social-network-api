import { Router } from 'express';
import * as thoughts from './thought-handlers';

const router = Router();

/**
 *
 * /api/thoughts
 *
 */

router.get('/', thoughts.getAllThoughts);
router.get('/:_id', thoughts.getOneThought);
router.post('/', thoughts.createThought);
router.put('/:_id', thoughts.updateThought);
router.delete('/:_id', thoughts.deleteThought);
router.post('/:thought_id/reactions', thoughts.addReaction);
router.delete('/:thought_id/reactions/:reaction_id', thoughts.removeReaction);

export { router as thoughtRoutes };
