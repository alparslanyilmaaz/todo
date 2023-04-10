import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const controller = new UserController();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const response = await controller.createUser(email, password);
  res.status(response.code).json(response.body);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const response = await controller.login(email, password);
  res.status(response.code).json(response.body);
});

export default router;