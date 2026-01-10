const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const User = require('../db');

const signUpSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    password: z.string(),
});

// signup route
router.post('/signup', async (req, res) => {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "All fields are required with valid data"
        });
    }

    const userExist = await User.findOne({ username: req.body.username });
    if (userExist['_id']) {
        return res.status(400).json({
            error: "Username already exists"
        });
    }

    const newUser = await User.create(req.body);

    const token = jwt.sign(
        { user_id: newUser._id },
        JWT_SECRET
    );

    return res.status(201).json({
        message: "User has been created",
        token
    });
});

// signin route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Username and password required"
        });
    }

    const userExist = await User.findOne({ username, password });
    if (!userExist) {
        return res.status(404).json({
            error: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        {userId: userExist._id},
        JWT_SECRET
    )

    return res.status(200).json({
        message: "Signed in successfully",
        token
    });
});

// bulk fetch route
router.get('/bulk', async (req, res) => {

    const name = req.params.filter
    if(name.trim() == ''){
        res.status(400).json({
            error: "Could not find Name to filter"
        })
    }

    
})

module.exports = router;
