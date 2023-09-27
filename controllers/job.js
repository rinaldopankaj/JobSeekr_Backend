import Job from '../models/Job.js';

//1. Add Job
export const addJob = async (req, res, next) => {
  const newJob = new Job({ ...req.body })
  console.log(newJob)
  try {
    const savedJob = await newJob.save();
    return res.status(200).json(newJob)
  } catch (error) {
    throw (error)
  }
}

//2. Get All Jobs
export const getAllJob = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });;
    res.status(200).json(jobs)
  } catch (error) {
    next(error);
  }
}

//3. Get Job By Id
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    // console.log(job)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
}


//4. Top 10 recent jobs
export const getRecentJob = async (req, res, next) => {
  try {
    // Find the 10 most recently updated jobs
    Job.find()
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order (most recent first)
      .limit(10) // Limit the results to 10 jobs
      .exec((err, jobs) => {
        if (err) {
          console.error('Error fetching jobs:', err);
          return res.status(404).json({ message: 'Job not found' });
          // Handle the error here
        } else {
          // Handle the fetched jobs (jobs variable contains the result)
          // console.log('Recently updated jobs:', jobs);
          res.status(200).json(jobs);
        }
      });
  } catch (error) {
    next(error);
  }
}

