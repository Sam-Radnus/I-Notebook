const express = require('express');
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetchUser');
//Create a User using:POST "/api/auth/createUser".Does not Require Auth
const JWT_SECRET = '$aveMoney';
//ROUTE 1:Create a User using:POST"/api/auth/createUser". No Login Required 
router.post('/createUser', [
  body('email', 'enter a valid Email').isEmail(),
  // password must be at least 5 chars long
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('password', 'password must be of 5 characters').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Check Whether this E-Mail  Exists Already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a User with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const secPass = await bcrypt.hash(req.body.password, salt)
    console.log(secPass)
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const JWTData = JWT.sign(data, JWT_SECRET);
    //console.log(JWTData);
    res.json({ JWTData });
    //res.json(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occured");
  }
  // }).then(user => {
  //     res.json(user)}).catch(err=>{console.log(err)
  //    
})
//Authenticate a User using :POST "/api/auth.login" No Log In Required
//ROUTE 2:Authenticating a User using:POST"/api/auth/login". No Login Required 
router.post('/login', [
  body('email', 'Enter a Valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Entry Denied Incorrect Credentials/Username" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Entry Denied Incorrect Credentials/Password" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = JWT.sign(data, JWT_SECRET);
    res.json({ authtoken })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal Server Error");
  }

})
//ROUTE 3:Get Logged In User details using :post"/api/auth/getuser".Login Required
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router
