import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let user = new User({
    username,
    password: hashedPassword,
    email
  });
  
  await user.save();
  user = await User.findOne({ email });
  
  const token = jwt.sign(
    { id: user._id },
    "abcd",
    { expiresIn: '7d' }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });

  res.status(200).json({ success: true });
};
