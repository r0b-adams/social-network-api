import { Router } from 'express';
import * as thoughts from './thought-handlers';

const router = Router();

/**
 *
 * /api/thoughts
 *
 */

router.get('/', thoughts.getAllThoughts);
router.get('/:id', thoughts.getOneThought);
router.post('/', thoughts.createThought);
router.put('/:id', thoughts.updateThought);
router.delete('/:id', thoughts.deleteThought);
router.post('/:thoughtId/reactions', thoughts.addReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughts.removeReaction);

export { router as thoughtRoutes };
