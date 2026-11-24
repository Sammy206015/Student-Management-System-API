const express = require("express");
const app = express();
const PORT = 3000;

require("./db");

const lecturerRoutes = require("./routes/lecturerRoutes");

app.use("/api/lecturers", lecturerRoutes);

app.get("/", (req, res) => {
  res.send("Student Management System Application Is Running");
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
