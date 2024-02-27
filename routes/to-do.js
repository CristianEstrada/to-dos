const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todo.controller');
const TokenJWT = require('../middlewares/jwtMiddleware')


router.post('/', TokenJWT ,TodoController.createTodo);
router.get('/', TokenJWT, TodoController.getTodosByUser);
router.get('/:id',TokenJWT, TodoController.getTodoById);
router.put('/:id', TokenJWT, TodoController.updateTodo);
router.delete('/:id', TokenJWT, TodoController.deleteTodo);


module.exports = router;