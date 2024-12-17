const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Assigned" }, 
  progress: { type: Number, default: 0 },
  score: { type: Number, default: 0 },    
});

module.exports = mongoose.model("Project", projectSchema);