const express = require("express");
const app = express();
const PORT = 3000;

require("./db");
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Student Management System Application Is Running");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})