const Todo = require("../models/todo.model");

const TodoController = {
  createTodo: async (req, res) => {
    try {
      const { titulo, description, startDate, endDate, completed } = req.body;
      const userId = req.user.userId;
      const newTodo = new Todo({
        titulo,
        description,
        startDate,
        endDate,
        completed,
        user: userId,
      });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTodosByUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const todos = await Todo.find({ user: userId });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const id = req.params.id;
      const { titulo, description, startDate, endDate, completed } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { titulo, description, startDate, endDate, completed },
        { new: true }
      );
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      await Todo.findByIdAndDelete(id);
      res.status(200).json({ message: "Todo successfully deleted " });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = TodoController;
