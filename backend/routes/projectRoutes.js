const express = require("express");
const db = require("../database/db");
const router = express.Router();

const handleError = (res, err) => {
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error", details: err.message });
};

router.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      return handleError(res, err);
    }
    res.json(rows);
  });
});

router.put("/projects/:id/accept", (req, res) => {
  const id = req.params.id;
  db.run("UPDATE projects SET status = 'Accepted' WHERE id = ?", [id], function (err) {
    if (err) {
      return handleError(res, err);
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project accepted successfully." });
  });
});

router.put("/projects/:id/progress", (req, res) => {
  const id = req.params.id;
  const { progress, score } = req.body;

  if (typeof progress !== "number" || progress < 0 || progress > 100) {
    return res.status(400).json({ error: "Progress must be a number between 0 and 100." });
  }
  if (typeof score !== "number" || score < 0 || score > 10) {
    return res.status(400).json({ error: "Score must be a number between 0 and 10." });
  }

  db.run(
    "UPDATE projects SET progress = ?, score = ? WHERE id = ?",
    [progress, score, id],
    function (err) {
      if (err) {
        return handleError(res, err);
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ message: "Progress and score updated successfully." });
    }
  );
});

router.post("/projects/seed", (req, res) => {
  const projects = [
    { title: "Project A", description: "Build a login page" },
    { title: "Project B", description: "Create a dashboard" },
  ];
  const placeholders = projects.map(() => "(?, ?)").join(", ");
  const values = projects.flatMap((p) => [p.title, p.description]);

  db.run(
    `INSERT INTO projects (title, description) VALUES ${placeholders}`,
    values,
    function (err) {
      if (err) {
        return handleError(res, err);
      }
      res.json({ message: "Sample projects added successfully." });
    }
  );
});

router.get("/projects/summary", (req, res) => {
  db.all(
    "SELECT SUM(progress) AS totalProgress, AVG(score) AS averageScore FROM projects",
    [],
    (err, rows) => {
      if (err) {
        return handleError(res, err);
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "No projects found." });
      }
      const { totalProgress = 0, averageScore = 0 } = rows[0];
      res.json({
        totalProgress,
        averageScore: averageScore.toFixed(2), 
      });
    }
  );
});

module.exports = router;

// const Project = require("../models/Project");
// const router = express.Router();

// router.get("/projects", async (req, res) => {
//   const projects = await Project.find();
//   res.json(projects);
// });

// router.put("/projects/:id/accept", async (req, res) => {
//   const project = await Project.findByIdAndUpdate(req.params.id, { status: "Accepted" }, { new: true });
//   res.json(project);
// });

// router.put("/projects/:id/progress", async (req, res) => {
//   const { progress, score } = req.body;
//   const project = await Project.findByIdAndUpdate(
//     req.params.id,
//     { progress, score },
//     { new: true }
//   );
//   res.json(project);
// });

// module.exports = router;