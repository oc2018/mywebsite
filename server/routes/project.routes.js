import express from 'express';
import { createProject, getProjects, updateProject, getProject, deleteProject } from '../controllers/projects.controllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getProject)
router.get('/', getProjects);
router.post('/', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;