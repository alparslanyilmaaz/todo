// postRoutes.ts
import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.middleware';
import { TodoController } from './todo.controller';

const controller = new TodoController();

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const {userId} = res.locals;
  const response = await controller.getTodos(userId);
  res.status(response.code).json(response.body);
});

router.post('/', authenticate, async (req, res) => {
  const {userId} = res.locals;
  const {todo, executionDate, groupIds} = req.body;
  const response = await controller.createTodo(todo, executionDate, userId, groupIds);
  res.status(response.code).json(response.body);
});

router.put('/:id', authenticate, async (req, res) => {
  const {userId} = res.locals;
  const {id} = req.params;
  const {executionDate, groupIds, todo} = req.body;
  const response = await controller.updateTodo(id, userId, executionDate, todo, groupIds);
  res.status(response.code).json(response.body || null);
});

router.put('/toggle-complete/:id', authenticate, async (req, res) => {
  const {id} = req.params;
  const {isCompleted} = req.body;
  const response = await controller.completeTodo(id, isCompleted);
  res.status(response.code).json(response.body || null);
});

router.delete('/:id', authenticate, async (req, res) => {
  const {userId} = res.locals;
  const {id} = req.params;
  const response = await controller.deleteTodo(id, userId);
  res.status(response.code).json(response.body || null);
});

export default router;