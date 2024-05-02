const { User } = require('../Models/User')
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserController {

   static getUser = async (req, res, next) => {
      try{
         const { token } = req.headers;
         const user = await User.get(token)  
         if (user.length != 0) {res.status(200).json({ user })}
         else {res.status(404).send("This User is not in the system")}
       } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
       }

   }
   static delelteUser = async (req, res) => {
      try{
      const { token } = req.headers;
      const result = await User.delete(token);
      if (result == true) res.status(204).json('user deleted successfully!');
       else res.status(404).json("Error deleting  user!")
      
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
       }
      
   }
   static updateUser = async (req, res, next) => {
      try{
         
      const { token } = req.headers;
      const oldData = await User.get(token);
      if (oldData.length === 0) {
         return res.status(404).json({ msg: "User not found!" });
      }
      else {
         const newData = new User();
         //name ,email ,gender , address , education , job_title , image , phone_number , age 
         if (req.body.name != null) { newData.setName(req.body.name); }
         else { newData.setName(oldData[0].name); }

         if (req.body.email != null) { newData.setEmail(req.body.email); }
         else { newData.setEmail(oldData[0].email); }

         if (req.body.age != null) { newData.setAge(req.body.age); }
         else { newData.setAge(oldData[0].age) }

         if (req.body.gender != null) { newData.setGender(req.body.gender); }
         else { newData.setGender(oldData[0].gender) }

         if (req.body.address != null) { newData.setAddress(req.body.address); }
         else { newData.setAddress(oldData[0].address) }

         if (req.body.education != null) { newData.setEducation(req.body.education); }
         else { newData.setEducation(oldData[0].education) }

         if (req.body.job_title != null) { newData.setJobTitle(req.body.job_title); }
         else { newData.setJobTitle(oldData[0].job_title) }

         if (req.body.phone_number != null) { newData.setPhoneNumber(req.body.phone_number); }
         else { newData.setPhoneNumber(oldData[0].phone_number) }

         newData.setToken(token)
           // Handle image upload and update user's image field
            if (req.file) {
            //    const image = req.file.path; // Get the stored image path
            //    newData.setImage(image);
            //   // Delete old image if a new one was uploaded
            //    if (oldData.image) {
            //    fs.unlinkSync('./uploads/' + oldData.image);
            //    }
            newData.setImage(req.file.filename)
            } else {
               newData.setImage(oldData.image);
            }
         const result = await User.update(newData);
         if (result == true) {
            res.status(200).json({ msg: "User updated successfully" });
         } else {
            res.status(404).json({ msg: "Failed to update user" });
         }
      }
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
       }

   }

}
module.exports = { UserController }