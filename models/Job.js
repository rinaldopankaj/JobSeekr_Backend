import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  jobrole: {
    type: String,
    required: true,
  },
  experience: String,
  location: String,
  jobdescription: [String],
  batch: String,
  jobResponsibilities: [String],
  keyRequirements: [String], // Change to an array of strings
  eligibility: String,
  allStreams: Boolean,
  requiredSkills: [String],
  applyLink: String,
});

export default mongoose.model('Job', JobSchema)