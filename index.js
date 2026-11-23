const express = require("express");
const app = express();
const PORT = 3000;

require("./db");
app.use(express.json());
const studentRoutes = require("./routes/studentRoutes");

app.get("/", (req, res) => {
    res.send("Student Management System Application Is Running");
});

app.use("/students", studentRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})