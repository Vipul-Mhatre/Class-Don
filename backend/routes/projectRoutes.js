const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.put("/projects/:id/accept", async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { status: "Accepted" }, { new: true });
  res.json(project);
});

router.put("/projects/:id/progress", async (req, res) => {
  const { progress, score } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { progress, score },
    { new: true }
  );
  res.json(project);
});

module.exports = router;