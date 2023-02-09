import { Router } from 'express';
import * as users from './user-handlers';

const router = Router();

/**
 *
 * /api/users
 *
 */

router.get('/', users.getAllUsers);
router.get('/:_id', users.getOneUser);
router.post('/', users.createUser);
router.put('/:_id', users.updateUser);
router.delete('/:_id', users.deleteUser);
router.route('/:user_id/friends/:friend_id').post(users.addFriend).delete(users.removeFriend);

export { router as userRoutes };
