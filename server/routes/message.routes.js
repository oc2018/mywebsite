import express from 'express';
import { getMessage, getMessages, createMsg, updateMsg, deleteMsg } from '../controllers/messages.controllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id',auth, getMessage);
router.get('/', getMessages);
router.post('/', auth, createMsg);
router.patch('/:id', auth, updateMsg);
router.delete('/:id', auth, deleteMsg);

export default router;