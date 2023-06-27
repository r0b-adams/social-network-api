import { Router } from 'express';
import * as users from './user-handlers';

const router = Router();

/**
 *
 * /api/users
 *
 */

router.get('/', users.getAllUsers);
router.get('/:id', users.getOneUser);
router.post('/', users.createUser);
router.put('/:id', users.updateUser);
router.delete('/:id', users.deleteUser);
router.route('/:userId/friends/:friendId').post(users.addFriend).delete(users.removeFriend);

export { router as userRoutes };
