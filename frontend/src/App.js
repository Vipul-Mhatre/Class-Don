import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await axios.get("http://localhost:5000/api/projects");
    setProjects(response.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const acceptProject = async (id) => {
    await axios.put(`http://localhost:5000/api/projects/${id}/accept`);
    fetchProjects();
  };

  const updateProgress = async (id, progress, score) => {
    await axios.put(`http://localhost:5000/api/projects/${id}/progress`, { progress, score });
    fetchProjects();
  };

  return (
    <div className="App">
      <h1>Project Assignment Management</h1>
      {projects.map((project) => (
        <div key={project._id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Status: {project.status}</p>
          <p>Progress: {project.progress}%</p>
          <p>Score: {project.score}</p>

          {project.status === "Assigned" && (
            <button onClick={() => acceptProject(project._id)}>Accept Project</button>
          )}

          {project.status === "Accepted" && (
            <div>
              <input
                type="number"
                placeholder="Progress"
                onChange={(e) => updateProgress(project._id, e.target.value, project.score)}
              />
              <input
                type="number"
                placeholder="Score"
                onChange={(e) => updateProgress(project._id, project.progress, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;