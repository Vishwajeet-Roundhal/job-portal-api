const User = require("..//models/User");
const bcrypt = require("bcryptjs");
const Employer = require("../models/Employer");

const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password ) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }
      const userExists = await User.findOne({ email: email });
  
      if (await userExists)
        return res.status(409).json({ message: "User already exists" });
  
      const salt = 10;
      const pass = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        name,
        email,
        password: pass,
      });
      
      if (!name || !email || !password ) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }
  
      res.status(200).json({
        newUser,
        token: await newUser.generateToken(),
        userId: newUser._id.toString(),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("server error");
    }
  };
  
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(email);
  
      if (!user) return res.status(400).json("user or password wrong");
      console.log(email, password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
  
      if (!isMatch) return res.status(400).json("Invalid");
      // Return jsonwebtoken
      if (user) {
        res.json({
          token: await user.generateToken(),
          userId: user._id.toString(),
          username: user.username,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };

  const employerRegister = async(req,res) => {
    try {
      const { email , password, companyName } = req.body;

      if (!companyName || !email || !password ) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }
      const employerExists = await Employer.findOne({ email: email });
  
      if (await employerExists){
        return res.status(409).json({ message: "User already exists" });
      }
      const salt = 10;
      const pass = await bcrypt.hash(password, salt);
  
      const newEmployer = await Employer.create({
        companyName,
        email,
        password: pass,
      });
      
      if (!companyName || !email || !password ) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }

      res.status(200).json({
        newEmployer,
        employertoken: await newEmployer.generateToken(),
        employerId: newEmployer._id.toString(),
      });

    } catch (error) {
      res.status(500).json({msg:"internal server error"})
    }
  }


  const employerLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const employer = await Employer.findOne({ email });
      console.log(email);
  
      if (!employer) return res.status(400).json("user or password wrong");
      console.log(email, password);
  
      const isMatch = await bcrypt.compare(password, employer.password);
      console.log(isMatch);
  
      if (!isMatch) return res.status(400).json("Invalid");
      // Return jsonwebtoken
      if (employer) {
        res.json({
          employertoken: await employer.generateToken(),
          employerId: employer._id.toString(),
          companyName: employer.companyName,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };


  module.exports = { register, login , employerRegister, employerLogin}