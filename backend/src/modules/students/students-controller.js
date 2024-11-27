const asyncHandler = require("express-async-handler");
const {
    getAllStudents,
    addNewStudent,
    getStudentDetail,
    setStudentStatus,
    updateStudent
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { query } = req;
    const students = await getAllStudents(query);
    res.status(200).json({
        success: true,
        data: students,
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(400).json({
            success: false,
            message: "Request body is missing",
        });
    }
    const result = await addNewStudent(body);
    res.status(201).json({
        success: true,
        message: result.message,
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(400).json({
            success: false,
            message: "Request body is missing",
        });
    }
    const result = await updateStudent(body);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Student ID is missing",
        });
    }
    const student = await getStudentDetail(id);
    res.status(200).json({
        success: true,
        data: student,
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { userId, reviewerId, status } = req.body;
    if (!userId || !reviewerId || !status) {
        res.status(400).json({
            success: false,
            message: "Request body is missing",
        });
    }
    const result = await setStudentStatus({ userId, reviewerId, status });
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
