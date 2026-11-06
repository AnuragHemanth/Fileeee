
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("."));

// Save student data into JSON file
app.post("/save", (req, res) => {

    // Read existing students
    let students = JSON.parse(
        fs.readFileSync("students.json", "utf8")
    );

    // Add new student
    students.push(req.body);

    // Convert JavaScript object into JSON string
    let jsonData = JSON.stringify(students, null, 2);

    //JSON.stringify(value, replacer, space);

    // Store JSON string in file
    fs.writeFileSync("students.json", jsonData);

    res.json({
        message: "Student saved successfully!"
    });
});

// Read students from JSON file
app.get("/students", (req, res) => {

    let data = fs.readFileSync("students.json", "utf8");

    // Convert JSON string into JavaScript object
    let students = JSON.parse(data);

    res.json(students);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
