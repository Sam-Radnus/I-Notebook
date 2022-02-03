const express = require('express');
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
//Create a User using:POST "/api/auth/createUser".Does not Require Auth
const JWT_SECRET = '$aveMoney';

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
module.exports = router