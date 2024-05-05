const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: { type: String },
    resume: { type: String }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    applicationDate: { type: Date, default: Date.now }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
