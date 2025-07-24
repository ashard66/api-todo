const express = require('express');
const router = express.Router();
const { Todo } = require('../models'); // Impor model Todo
const { body, validationResult } = require('express-validator');

// --- Aturan Validasi ---
const createTaskRules = [
  body('task').notEmpty().withMessage('Kolom task tidak boleh kosong')
];

const updateTaskRules = [
  body('completed').isBoolean().withMessage('Kolom completed harus bernilai true atau false')
];

// Middleware untuk menjalankan validasi
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // Lanjut jika tidak ada error
  }
  // Kirim response error jika validasi gagal
  return next({ status: 400, message: errors.array()[0].msg });
};

// GET /api/todos: Mendapatkan semua tugas
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

// POST /api/todos: Membuat tugas baru
router.post('/', createTaskRules, validate, async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/todos/:id: Mengubah status completed
router.patch('/:id', updateTaskRules, validate, async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      todo.completed = req.body.completed;
      await todo.save();
      res.json(todo);
    } else {
        next(error);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/todos/:id: Menghapus tugas
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Tugas berhasil dihapus' });
    } else {
        next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;