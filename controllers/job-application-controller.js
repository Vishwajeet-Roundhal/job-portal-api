const JobApplication = require("../models/JobApplication");

const crtJobApp = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user._id;

    const { coverLetter, resume } = req.body;

    const newJobApps = new JobApplication({
      jobId: jobId,
      userId: userId,
      coverLetter: coverLetter ? coverLetter : "",
      resume: resume ? resume : "",
      status: "Pending",
      applicationDate: new Date(),
    });

    const savedJobApps = await newJobApps.save();

    res.status(200).json(savedJobApps);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllJobApps = async (req, res) => {
  try {
    const jobApps = await JobApplication.find();
    if (!jobApps || jobApps.length === 0)
      return res.status(404).json({ msg: "no applications found" });
    res.status(201).json(jobApps);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getOneJobApp = async (req, res) => {
  try {
    const jobAppId = req.params.jobAppId;
    const jobApp = await JobApplication.findOne({ _id: jobAppId });
    if (!jobApp) return res.status(400).json({ msg: "No application found" });
    res.status(200).json(jobApp);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getJobAppByCandidate = async (req, res) => {
  try {
    const candidateId = req.user._id;
    const jobApps = await JobApplication.find({
      candidate: candidateId,
    }).populate({
        path: "job",
        select: "title company",
        populate: {
          path: "company",
          select: "companyName location", // nested populate
        },
      })
      .lean();
    if(!jobApps) return res.status(404).json({msg:"No applications found"})

    res.status(201).json(jobApps)
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { crtJobApp, getAllJobApps, getOneJobApp,getJobAppByCandidate };
