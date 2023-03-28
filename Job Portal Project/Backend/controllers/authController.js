// Setting up authController by Aditya Raj Sahoo

const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if (userExist) {
        return next(new ErrorResponse("This E-mail is already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new ErrorResponse("Enter an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("Enter a password", 403));
        }

        //check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }
        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

// When user signs in successfully, token is sent
// For Response
const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        // 1 hour of expiry
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }) 
        .json({ 
            success: true, 
            role: user.role
        })
}

// For log out
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "You have been logged out"
    })
}

// For user profile
exports.userProfile = async (req, res, next) => {

    // Request for id
    // await is used to wait for a Promise and get its fulfillment value.
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}