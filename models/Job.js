const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Employer' },
    salary: { type: Number },
    location: { type: String },
    datePosted: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
