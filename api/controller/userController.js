const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  signup: async (req, res) => {
    try {
      console.log(req.body);
      const { name, email,mobile, password } = req.body;
      //check request

      if (!(name && email && password && mobile )) {
        return res.status(400).json({ msg: "all field is required" });
      }

      // check if user allready  exist

      const oldUser = await User.findOne({ email: email });
      if (oldUser) {
        return res.json({ msg: "user all ready exist" });
      }
      //generate salt to hash password

      const salt = await bcrypt.genSalt(10);

      // user save
      const newUser = await new User({
        ...req.body
      });
      // now we set user password to hashed password
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();
      //generate token
      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );
      //save token
      newUser.token = token;
      res.status(200).json({ msg: "user register succesfully", data: newUser });
    } catch (error) {
      res.status(404).json({ msg: "something is error", error: error });
    }
  },

  login: async (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (user) {
        // check user password with hashed password stored in the database

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          // create token
          const email = user.email;
          const token = jwt.sign(
            { user_id: user._id },
            process.env.SECRET_KEY,
            {
              expiresIn: "5h",
            }
          );
          user.token = token;
          return res.status(200).json({ msg: "valid password", data: user });
        } else {
          return res.status(400).json({ msg: "invalid password" });
        }
      } else {
        res.status(401).json({ msg: "user does not exist" });
      }
    } catch (error) {
      res.status(400).json({ error: error, msg: "something is error" });
    }
  },
  logout: async (req, res) => {},

  userList: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({ msg: "user list is", data: user });
    } catch (error) {
      res.status(401).json({ msg: "not found userlist" });
    }
  },

  oneUser:async(req,res)=>{
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if(user){
        res.status(202).json({msg:"user",data:user})
      }else{
        res.status(401).json({msg:"user is not exist"})
      }
    } catch (error) {
      res.status(404).json({msg:"something is error"})
    
    }
  },

  deleteUser:async(req,res)=>{
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if(user){
        res.status(202).json({msg:"user deleted successfully",data:user})
      }else{
        res.status(401).json({msg:"user is not exist"})
      }
    } catch (error) {
      res.status(404).json({msg:"something is error"})
    
    }

  },

  updateUser:async(req,res)=>{
   try { 
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})
   res.status(202).json({msg:"user updated successfully",data:user})
   } catch (error) {
      res.status(404).json({msg:"user is not exist"})
    
   }
  }
};

module.exports = userController;
