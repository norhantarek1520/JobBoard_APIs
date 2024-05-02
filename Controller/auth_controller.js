const { User } = require('../Models/User')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


class AuthorizeController {

  static login = async (req, res, next) => {

    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }
      else {
        const emailExists = await User.isEmailExists(email);
        const isPasswordValid = await User.comparePasswprd(email, password);
        if (emailExists == false) return res.status(404).json({ error: 'User not found' });
        else if (isPasswordValid == false) {return res.status(404).json({ error: 'Incorrect password' });}
        else {
          const token = await User.getTokenByEmail(email);
          res.status(200).json({ token })
        }
      }
      
    } catch (err) {res.status(500).send(err)}


  }
  static logout = async (req, res) => {
    try {
      req.logout(); // Clear the user session
      res.clearCookie('token'); // Optionally clear any cookie
      // Send JSON response confirming logout
     res.status(200).json({ message: 'Successfully logged out' });
    }catch(error){res.status(200).json({ "message": error });}
 
  }; 
  static registre = async (req, res, next) => {
    try {

      const { name, email, password , conformpassword } = req.body;
      
      if (!email || !password || !name || !conformpassword) {
        return res.status(400).json({ error: 'Missing username or email or password ' });
      }else{
        const emailExists = await User.isEmailExists(email);
         if (emailExists == true) {
          return res.status(404).json({ msg: "This email is already exists " });
        }
        else {
          if (conformpassword != password) { return res.status(400).json('password and conformpassword is not the same  ');}
          else{
            const user = new User()
            user.setName(req.body.name);
            user.setEmail(req.body.email);
            user.setPassword(await bcrypt.hash(req.body.password, 10));
            user.setToken(crypto.randomBytes(16).toString("hex")); 
            const result = await User.addNew(user);
            if (result === true) {
              delete user.getPassword();
              const token = await User.getTokenByEmail(email);
              res.status(201).json({ token })
            }
            else {res.status(500).json("Server Error");}
          }
          
        }
      }
     

    } catch (err) {
      res.status(500).send("errrrrr++rrrrrror " + err);
    }

  }



}
module.exports = { AuthorizeController }