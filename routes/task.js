const express = require("express");
const router = express.Router();
const tasks = require("../data/task");
const { VALID_PRIORITIES } = require("../data/config/constants");

router.get('/', (req, res) => {
  const { completed, sortBy, order } = req.query;

  let filteredTasks = tasks;


  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
  }

  if (sortBy === 'createdAt') {
    filteredTasks = filteredTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }

  res.json(filteredTasks);
});


router.get("/priority/:level", (req, res) => {
  const { level } = req.params;
  if (!VALID_PRIORITIES.includes(level.toLowerCase())) {
    return res.status(400).send("Invalid priority level. Use 'low', 'medium', or 'high'.");
  }

  const filtered = tasks.filter(task => task.priority === level.toLowerCase());
  res.json(filtered);
});


router.get("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).send("Task not found.");
  res.json(task);
});

router.post("/", (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!title || !description) {
    return res.status(400).send("Title and description are required.");
  }

  if (priority && !VALID_PRIORITIES.includes(priority.toLowerCase())) {
    return res.status(400).send("Priority must be 'low', 'medium', or 'high'.");
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: completed || false,
    createdAt: new Date(),
    priority: priority ? priority.toLowerCase() : 'low' 
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed, priority } = req.body;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).send("Task not found.");

  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Title, description, and boolean 'completed' are required.");
  }

  if (priority && !VALID_PRIORITIES.includes(priority.toLowerCase())) {
    return res.status(400).send("Priority must be 'low', 'medium', or 'high'.");
  }

  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority ? priority.toLowerCase() : task.priority;

  res.json(task);
});


router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
   if (isNaN(taskId)) {
    return res.status(400).json({ error: "Invalid task ID. ID must be a number." });
  }

  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});


module.exports = router;
