const Employer = require("../models/Employer")
const JobApplication = require("../models/JobApplication")
const { sendEmail } = require('../utils/emailService');


const updateEmployer = async(req,res) => {};

const updateStatus = async(req,res) => {
    try {
        const applicationId = req.params.applicationId;
        const jobApps = await JobApplication.findById(applicationId).populate('candidate','email');
        if(!jobApps) return res.status(404).json({ msg: 'Job application not found' });

        const { newStatus } = req.body;

        JobApplication.status = newStatus;
        const updatedJobApplication = await JobApplication.save();

        const candidateEmail = jobApps.candidate.email;

        await sendEmail(
            candidateEmail,``,
            `Your job application ${applicationId} status has been updated to ${newStatus}.`
          );

        res.status(200).json(updatedJobApplication); // need to send mail

    } catch (error) {
        res.status(500).json("Internal servere error")
    }
}

module.exports = updateStatus