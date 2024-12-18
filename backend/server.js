const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
// const connectDB = require("./config/db");
// connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});