import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
} from '../controllers/task.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskStatus);

export default router;