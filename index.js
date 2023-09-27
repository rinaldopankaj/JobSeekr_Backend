import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv";
import jobRoutes from "./routes/job.js"
import authRoutes from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
import cors from 'cors'


dotenv.config()

const app = express();

const PORT = process.env.PORT || 8010

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        console.log(err)
    })
}

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser())

//middlewares
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
})

app.listen(PORT, () => {
    connect()
    console.log(`connecting to ${process.env.PORT}`)
})



