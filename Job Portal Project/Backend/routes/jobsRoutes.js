const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


// For jobs routes
// For clearly seeing the end point => Path

// Path /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// Path /api/job/id
router.get('/job/:id', singleJob);
// Path /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// Path /api/jobs/show
router.get('/jobs/show', showJobs);

module.exports = router;