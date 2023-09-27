import express from "express";
import { addJob, getAllJob, getJobById, getRecentJob } from "../controllers/job.js"
import { verifyToken } from "../controllers/userAuth.js";

const router = express.Router()

router.post('/addJob', verifyToken, addJob)
router.get('/allJob', getAllJob)
router.get('/find/:jobId', getJobById)
router.get('/recentJob', getRecentJob)
export default router