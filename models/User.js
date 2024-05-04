const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['candidate', 'employer',], default: 'candidate' },
    profilePicture: { type: String },
    resume: { type: String },
    about: { type: String },
    skills: [{ type: String }],
    experience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    favoriteJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    jobAlerts: [
      {
        keywords: [{ type: String }],
        location: { type: String },
        jobType: { type: String },
        // Add more fields as needed
      },
    ],
    isAdmin : {
        type: Boolean,
        default:"false"
    },
    companyName: { type: String }, // For employers
    companyDescription: { type: String }, // For employers
    companyWebsite: { type: String }, // For employers
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  userSchema.methods.generateToken = async function() {
    try {
      return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
     process.env.SECRET_KEY,
      { expiresIn: "30d" }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const User = new mongoose.model("User",userSchema);
  module.exports = User