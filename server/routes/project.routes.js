import express from 'express';
import { createProject, getProjects, updateProject, getProject, deleteProject } from '../controllers/projects.controllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', auth, getProject)
router.get('/', getProjects);
router.post('/', auth, createProject);
router.patch('/:id', auth,updateProject);
router.delete('/:id', auth, deleteProject);

export default router;