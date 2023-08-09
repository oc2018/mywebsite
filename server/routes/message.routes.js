import express from 'express';
import { getMessages, createMsg, updateMsg, deleteMsg } from '../controllers/messages.controllers.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', createMsg);
router.patch('/:id', updateMsg);
router.delete('/:id', deleteMsg);

export default router;