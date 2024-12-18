import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const App = () => {
  const [projects, setProjects] = useState([]);
  const [summary, setSummary] = useState({ totalProgress: 0, averageScore: 0 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchProjects();
    fetchSummary();
  }, []);

  const updateProgress = async (id, progress, score) => {
    try {
      await axios.put(`http://localhost:5000/api/projects/${id}/progress`, { progress, score });
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? { ...project, progress, score } : project
        )
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Project Assignment Management</h1>
      </header>
      <main>
        <section className="projects">
          <h2>Projects</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>{project.progress}%</td>
                  <td>{project.score}</td>
                  <td>
                    <button
                      className="progress-btn"
                      onClick={() =>
                        updateProgress(project.id, Math.min(project.progress + 10, 100), project.score + 5)
                      }
                    >
                      Increase Progress
                    </button>
                    <button
                      className="progress-btn"
                      onClick={() =>
                        updateProgress(project.id, Math.max(project.progress - 10, 0), Math.max(project.score - 5, 0))
                      }
                    >
                      Decrease Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="summary">
  <h2>Summary</h2>
  <div className="chart-container">
    <Bar
      data={{
        labels: ["Total Progress", "Average Score", "Total Completed", "Total Pending", "Total Projects", "Total Revenue", "Total Costs", "Average Completion Time"],
        datasets: [
          {
            label: "Project Stats",
            data: [
              summary.totalProgress,
              summary.averageScore,
              summary.totalCompletedProjects,
              summary.totalPendingProjects,
              summary.totalProjects,
              summary.totalRevenue,
              summary.totalCosts,
              summary.averageCompletionTime,
            ],
            backgroundColor: [
              "#4caf50",
              "#2196f3",
              "#ff9800",
              "#f44336",
              "#9c27b0",
              "#03a9f4",
              "#8bc34a",
              "#e91e63",
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      key={`${summary.totalProgress}-${summary.averageScore}-${summary.totalCompletedProjects}-${summary.totalPendingProjects}-${summary.totalProjects}-${summary.totalRevenue}-${summary.totalCosts}-${summary.averageCompletionTime}`}
    />
  </div>
</section>

      </main>
    </div>
  );
};

export default App;