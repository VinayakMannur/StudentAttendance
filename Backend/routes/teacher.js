const express = require('express');

const teacher = require('../controllers/teacher');

const router = express.Router();

router.get('/allStudents',teacher.getAllStudents);

router.post('/postAttendance', teacher.postAttendance);

module.exports = router;