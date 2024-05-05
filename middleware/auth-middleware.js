const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employer = require("../models/Employer");

const userAuth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "no token found" });
    }

    const bearerToken = token.replace("Bearer", "").trim();

    const isVerify = jwt.verify(bearerToken, process.env.SECRET_KEY);

    const userData = await User.findOne({ email: isVerify.email });

    if (!userData) {  
      return res.status(200).json({ msg: "user not found" });
    }
    console.log("user =>", userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(500).json({ error: "error verifying token" });
  }
};

const employerAuth = async (req,res,next) => {
  try {
    const token = await req.header("Authorization");

    if(!token) return res.status(401).json({msg:"no token found"})
    const bearerToken = token.replace("Bearer", "").trim();
    const isVerify = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const employerData = await Employer.findOne({ email: isVerify.email });

    if (!employerData) {  
      return res.status(200).json({ msg: "employer not found" });
    }
    console.log("user =>", employerData);

    req.employer = employerData;
    req.employertoken = token;
    req.employerId = employerData._id;

    next();
  } catch (error) {
    res.status(500).json({msg:"invalid token"})
  }
}

const adminValidator = async (req,res,next) => {
  try {
      const admin = req.user.isAdmin;
      console.log(admin);
      if(!admin){
          return res.status(401).json({msg:"you are not authorized to perform this operation"})
      }
      next();
  } catch (error) {
      return res.status(400).json({msg:"something went wrong"})
  }
}


module.exports = {userAuth, adminValidator, employerAuth}