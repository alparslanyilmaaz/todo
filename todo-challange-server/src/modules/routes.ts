// routes.ts
import { Router } from 'express';
import userRoutes from './user/user.routes';

const router = Router();

router.use('/api/users', userRoutes);

export default router;