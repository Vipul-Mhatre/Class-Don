const express = require("express");
const db = require("../database/db");
const router = express.Router();

router.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.put("/projects/:id/accept", (req, res) => {
  const id = req.params.id;
  db.run("UPDATE projects SET status = 'Accepted' WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Project accepted successfully." });
  });
});

router.put("/projects/:id/progress", (req, res) => {
  const id = req.params.id;
  const { progress, score } = req.body;

  db.run(
    "UPDATE projects SET progress = ?, score = ? WHERE id = ?",
    [progress, score, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Progress and score updated successfully." });
    }
  );
});

//  for testing
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
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Sample projects added successfully." });
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