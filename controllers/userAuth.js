import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })

        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        // console.log("Hi from Backend")
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);

        const { password, ...otherDetails } = user._doc;

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ otherDetails, token });

    } catch (err) {
        // console.log("Err From Backend!")
        next(err);
    }
};

export const verifyToken = async (req, res, next) => {
    // let token = req.cookies.access_token;
    let token = req.body.token || req.cookies.access_token;

    //console.log(token)

    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT, (err) => {
        if (err) return next(createError(403, "Token is not valid!"));

        // req.user = user;
        // next();
        res.json({
            auth: true
        })
    });
}