import express from 'express';
import { createUser, getUsers, authenticateUser, updateUser, getUser, deleteUser } from '../controllers/users.controllers.js';
import { forgotPassword } from '../middleware/forgotPasswordEmail.js';
// import { ApiRateLimiter } from '../middleware/attempts.middleware.js';

const router = express.Router();
router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/signup', createUser);
router.post('/signin', authenticateUser);
router.patch('/:id', forgotPassword, updateUser);
router.delete('/:id', deleteUser);

export default router;