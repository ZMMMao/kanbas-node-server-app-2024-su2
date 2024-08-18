import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    // Create an assignment
    app.post('/api/courses/:cid/assignments', (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            _id: new Date().getTime().toString(),
            course: cid
        };
        db.assignments.push(newAssignment);
        res.status(201).json(newAssignment);
    });

    // Retrieve all assignments
    app.get("/api/assignments", (req, res) => {
        res.json(db.assignments);
    });

    // Retrieve assignments for a specific course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const courseAssignments = db.assignments.filter((assignment) => assignment.course === cid);
        if (courseAssignments.length > 0) {
            res.json(courseAssignments);
        } else {
            res.status(404).send("No assignments found for this course");
        }
    });

    // Retrieve a specific assignment
    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments.find((a) => a._id === aid);
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).send("Assignment not found");
        }
    });

    // Update an assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = {
                ...db.assignments[assignmentIndex],
                ...req.body
            };
            res.sendStatus(204);
        } else {
            res.status(404).send("Assignment not found");
        }
    });

    // Delete an assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
}
