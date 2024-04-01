import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  //Instead of clog req body, we want to push it to the database
  const { username, email, password } = req.body;
  const requiredFields = [username, email, password];

  if (!requiredFields.every((field) => field)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: 'Signup succesful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
