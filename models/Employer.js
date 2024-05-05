const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    industry: { type: String },
    location: { type: String },
    contactInfo: {
        phone: { type: String },
        address: { type: String }
    },
    website: { type: String },
    logo: { type: String }, 
    users : [ {type : Schema.Types.ObjectId, ref: "User" }],
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    createdAt: { type: Date, default: Date.now }
});


employerSchema.methods.generateToken = async function() {
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


const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
