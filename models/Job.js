import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
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
  companyDesc: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  experience: String,
  location: String,
  jobDesc: [String],
  batch: String,
  jobResponsibilities: [String],
  skills: [String], // Change to an array of strings
  eligibility: String,
  allStreams: Boolean,
  applyLink: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Job', JobSchema)