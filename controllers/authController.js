const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // sync version
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

/* async implementation
  jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    (err, token) => {
      if (err) {
        return next(new AppError('Error signing token...', 500));
      }

      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: newUser,
        },
      });
    }
  );
*/

/* to generate secret key for jwt token in console
 node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"*/
