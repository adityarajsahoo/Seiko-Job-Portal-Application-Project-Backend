// Setting up authRoutes by Aditya Raj Sahoo

const express = require('express');
const router = express.Router();
const {signup, signin, logout, userProfile} = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');


// All auth routes
// Path /api/signup
router.post('/signup', signup);
// Path /api/signin
router.post('/signin', signin);
// Path /api/logout
router.get('/logout', logout);
// Path /api/me
router.get('/me', isAuthenticated, userProfile);

module.exports = router;