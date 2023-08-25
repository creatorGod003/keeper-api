const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /api/users/register:
 *    post:
 *      tags:
 *        - Users end points
 *      summary: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  default: John
 *                email:
 *                  type: string
 *                  default: john@gmail.com
 *                password:
 *                  type: string
 *                  default: john123@
 *      responses:
 *        '201':
 *          description: User registered successfully
 *          content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              id:
 *               type: string
 *               default: dlsarjfkldjasfklj
 *              email:
 *               type: string
 *               default: john@gmail.com

 *        '400':
 *          description: Bad request - missing fields or user already registered
 *     
 */

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ id: user._id, email: user.email,phone: user.phone });
  } else {
    res.status(400);
    throw new Error("User already registered");
  }
  
});

/**
 * @swagger
 * /api/users/login:
 *  post:
 *   tags:
 *     - Users end points
 *   summary: Authenticating existing user
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               default: john@gmail.com
 *             password:
 *               type: string
 *               default: john123@ 
 *   responses:
 *    200:
 *     description: User login successfully
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *    400:
 *     description: Bad Request - all fields are mandatory
 *    401:
 *     description: Unauthorized - email or password is not valid
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }

  res.json({ message: "Login the user" });
});

/**
 * @swagger
 *  /api/users/current:
 *   get:
 *    tags:
 *     - Users end points
 *    summary: Get the details of current logged in user (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    responses:
 *     200:
 *      description: Successful response
 *      content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserCurrent'
 *     401:
 *      description: Unauthorized
 *          
 *  
 */

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
