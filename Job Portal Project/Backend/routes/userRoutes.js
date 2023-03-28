const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


// For user routes

// Path /api/allusers
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// Path /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);
// Path /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// Path /api/admin/user/delete/id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
// Path /api/user/jobhistory
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

module.exports = router;