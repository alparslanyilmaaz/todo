import { Router } from 'express';
import groupRoutes from './group/group.routes';
import todoRoutes from './todo/todo.routes';
import userRoutes from './user/user.routes';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/todo', todoRoutes);
router.use('/api/group', groupRoutes);

export default router;