import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.middleware';
import { GroupController } from './group.controller';

const controller = new GroupController();
const router = Router();

router.get('/', authenticate, async (req, res) => {
  const {userId} = res.locals;
  const response = await controller.getGroups(userId);
  res.status(response.code).json(response?.body);
});

router.post('/', authenticate, async (req, res) => {
  const {color, name} = req.body;
  const {userId} = res.locals;

  const response = await controller.createGroup(color, name, userId);
  res.status(response.code).json(response?.body);
});

export default router;