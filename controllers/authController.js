const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { firebaseAuth } = require('../config/firebase');

//@desc         Check user is logged in
//@route        GET /api/auth
//@access       PRIVATE
exports.authenticate = (req, res) => {
  res.status(200).json({ user: req.user });
};

//@desc         User login through social account like FB, Google
//@route        POST /api/auth/login/social
//@access       PRIVATE
exports.socialLogin = catchAsync(async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) {
    return next(new AppError('Not authorized!', 401));
  }
  const decodedToken = await firebaseAuth.verifyIdToken(req.body.idToken);
  if (!decodedToken) {
    return next(new AppError('Not authorized!', 401));
  }

  const user = await User.findOne({
    uid: decodedToken.uid,
  });

  if (user) {
    return createSendToken({ ...user.toObject(), isNew: false }, 200, res);
  }

  const newUser = await User.create({
    uid: decodedToken.uid,
    email: decodedToken.email,
    name: decodedToken.name,
    avatar: decodedToken.picture,
  });
  createSendToken(
    {
      ...newUser.toObject(),
      isNew: true,
    },
    201,
    res,
  );
});

const createSendToken = (user, statusCode, res) => {
  const accessToken = signToken(user._id);

  res.status(statusCode).json({
    accessToken,
    user,
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
