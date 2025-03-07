const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    res.status(201).json({ message: "Task created successfully", data: task });
  } catch (error) {
    res.status(400).json({ error: "Error creating task." });
  }
});

// Get all tasks (filter by status if provided)
router.get("/", auth, async (req, res) => {
  try {
    const match = {};
    if (req.query.status) match.status = req.query.status;

    const tasks = await Task.find({ user: req.user._id, ...match });
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks." });
  }
});

// Update a task
router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found." });
    res.send(task);
  } catch (error) {
    res.status(400).json({ error: "Error updating task." });
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ error: "Task not found." });
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: "Error deleting task." });
  }
});

module.exports = router;
