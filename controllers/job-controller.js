const Job = require("../models/Job");
const Employer = require("../models/Employer")

const createJob = async (req, res) => {
  try {
    const EmployerId = req.employer._id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      datePosted,
      status,
    } = req.body;

    const newJob = new Job({
      title,
      description,
      requirements,
      company : EmployerId,
      salary,
      location,
      datePosted,
      status,
    });

    const job = await newJob.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(200).json({ msg: "Internal server error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = await Job.findById(req.params.jobId);
    if (!jobId) {
      return res.status(404).json({ msg: "No job found with that id!" });
    }
    res.status(200).json(jobId);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllJobs = async (req,res) => {
    try {
        const jobs = await Job.find();
        if (jobs.length === 0) { // Check if jobs array is empty
            return res.status(404).json({ msg: "No jobs found" });
        }
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ msg:"Internal server error"})
    }
}

const updateJobById = async(req,res) => {
  try {
    const jobId = req.params.jobId;
    const {updates} = req.body;
    if  (updates.length === 0) return res.status(400).json({msg:"no updates"})
    const updatedJob = await Job.findByIdAndUpdate(jobId,updates, { new: true})
    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found" });
  }
    res.status(200).json(updatedJob)
  } catch (error) {
    res.status(500).json({msg:"Internal server error"})
  }
}

const deleteJobById = async(req,res) => {
  try {
    const jobId = req.params.jobId;
    const deletedJob = await Job.findByIdAndDelete(jobId)
    if (!deletedJob) {
      return res.status(404).json({ msg: "Job not found" });
  }
    res.status(200).json(deletedJob)
  } catch (error) {
    res.status(500).json({msg:"Internal server error"})
  }
}

const searchJobs = async (req, res) => {
  try {
      const { query } = req.body; 

      if (!query) {
          return res.status(400).json({ msg: "Search query is required" });
      }

      const jobs = await Job.find({
        $or: [
            { company: { $regex: query, $options: 'i' } }, 
            { location: { $regex: query, $options: 'i' } },
            { title: { $regex: query, $options: 'i' } }
        ]
    });

      if (!jobs || jobs.length === 0) {
          return res.status(404).json({ msg: "No jobs found matching the search criteria" });
      }

      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
  }
};


const filterJobs = async (req, res) => {
  try {
      const { salaryMin, salaryMax, datePosted } = req.body;

      const filter = {};

      if (salaryMin !== undefined && salaryMax !== undefined) {
          filter.salary = { $gte: salaryMin, $lte: salaryMax }; 
      } else if (salaryMin !== undefined) {
          filter.salary = { $gte: salaryMin }; 
      } else if (salaryMax !== undefined) {
          filter.salary = { $lte: salaryMax }; 
      }

      if (datePosted) {
          filter.datePosted = { $lte: new Date(datePosted) }; 
      }

      const jobs = await Job.find(filter);

      if (!jobs || jobs.length === 0) {
          return res.status(404).json({ msg: "No jobs found matching the filter criteria" });
      }

      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
  }
};



module.exports = { createJob, getJobById, getAllJobs, updateJobById, deleteJobById , searchJobs, filterJobs}
