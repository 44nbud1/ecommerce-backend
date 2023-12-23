import User from "../model/User.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generate_token.js";
import {getTokenFromHeader} from "../utils/getTokenFromHeader.js";
import {verifyToken} from "../utils/verify_token.js";

// Register user
// route POST /api/v1/users/register
// access private / admin

export const registerUserController = expressAsyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    const userExist = await User.findOne({email})
    if (userExist) {
        throw new Error("User is allready registered")
    }

    // hash pwd
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        fullName,
        email,
        password: hashedPwd,
    });

    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: user,
    })

});

export const loginUserController = expressAsyncHandler (async (req, res) => {
    const {email,password} = req.body;

    // find user by email
    const userFound = await User.findOne({
        email,
    })

    if (userFound && await bcrypt.compare(password, userFound?.password)) {
        res.json({
            msg: "login success",
            status: 'success',
            userFound,
            token: generateToken(userFound?._id)
        })
    } else {
        throw new Error("Invalid login credentials")
    }
});

export const getUserProfileController = expressAsyncHandler(async (req, res) => {
    const token = getTokenFromHeader(req);
    // verify Token
    const verified = verifyToken(token);
    console.log(verified)
    res.json({
        msg: 'Welcome to Profile page'
    })
})