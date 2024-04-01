import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
//
// Sign up
//
export const signup = async (req, res, next) => {
  //Instead of clog req body, we want to push it to the database
  const { username, email, password } = req.body;
  const requiredFields = [username, email, password];

  if (!requiredFields.every((field) => field)) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: 'Signup succesful' });
  } catch (error) {
    next(error);
  }
};

//
// Sign in
//
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const requiredFields = [email, password];
  if (!requiredFields.every((field) => field)) {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    // Find the user
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    // Check the password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, 'Invalid password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: _pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
