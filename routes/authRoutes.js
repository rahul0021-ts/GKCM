import express from "express";//Needed to create routes and router.
import { register, login } from "../controllers/authController.js";//Imports the register and login controller functions.
const router = express.Router();//Creates a router object.

/**
Defines a POST route for /register.
When a client sends a POST request to /register:
register controller function is executed
Handles signup logic
 */
router.post("/register", register);

/*
Defines a POST route for /login.
Handles login requests using login controller. */
router.post("/login", login);

export default router;//Exports this router so it can be imported in server.js
