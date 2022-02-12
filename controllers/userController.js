const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

//@desc         get user information
//@route        GET /api/users
//@access       PRIVATE
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    users,
  });
});
