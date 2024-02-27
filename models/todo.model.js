const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: false,
        trim: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Esto establece la referencia al modelo User
      }
    }, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;