import User from "../models/User.js";
import jwt from "jsonwebtoken";//Used to create JWT tokens for authentication.
import bcrypt from "bcryptjs";//Used to compare hashed passwords during login.

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//Defines a helper function to create JWT tokens.
//Takes user ID as input.
//Payload: { id } → user’s MongoDB _id
//Secret: JWT_SECRET (from .env)
//Token expiry: 7 days

export const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = generateToken(user._id);
  
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  };
  
  export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });
  
    const token = generateToken(user._id);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  };
  
/**
 * Think of async as saying: “This function will do slow things (like talking to a database), so wait properly.”
 * req → request (data from client)
 * res → response (data you send back)
 * async allows you to use await inside this function
 * await means:“Pause here until this task is finished, then continue.”
 */
/*Register
Client → name/email/password
↓
Password hashed (pre-save)
↓
User stored in DB
↓
JWT returned
*/

/*Login
Client → email/password
↓
User found
↓
Password compared
↓
JWT returned
*/