// For loading user modules by Aditya Raj Sahoo
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// For loading all users
exports.allUsers = async (req, res, next) => {
    // To enable pagination
    // Adding the numbers to identify the sequential number of the pages
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount(); // To count

    try {
        // Display user by last user created one (CreatedAt: -1)
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        // Sending page information
        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
}

// To show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

// To edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

// To delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}

// For viewing jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;
    // Check if current user is signed in
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        // Custom error response
        if (!currentUser) {
            return next(new ErrorResponse("You must be logged In", 401));
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}