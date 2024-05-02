
const { Application } = require('../Models/Application')
const { User } = require('../Models/User')
const { Job } = require('../Models/Job');
class ApplicationController {

  static addNewApplication = async (req, res, next) => {
    try {
      const { token } = req.headers;
      const userId = await User.getUserByToken(token)
      const isJobExists = await Job.isExist(req.params.id)

      if (isJobExists == true) {
        const appliedBefore = await Application.appliedBefore(userId, req.params.id)
        if (appliedBefore == true) { 
          res.status(100).json('You applay for this job before')
        }
        else {
            const applicationObj = new Application()
            const now = new Date();
            applicationObj.setApplaiedOn(now.toISOString().split('T')[0])
            applicationObj.setProtfolio(req.body.protfolio)
            applicationObj.setJobId(req.params.id)
            applicationObj.setUserId(userId)
            applicationObj.setCV(req.file.filename)
            applicationObj.setStatus('pending')
            applicationObj.setContactEmail(req.body.constactEmail)

            const result = await Application.addNew(applicationObj);
            if (result === true) res.status(201).json("You Apply for this job successfully ")
            else res.status(404).json('Fail to Apply , try again later..')
        }
      }
      else {
      res.status(404).json("This Job Is Not Avaliable Now")
      }

  } catch (error) {res.status(500).json({ "message": 'Error processing request' , "The error" :error});
  }

  }
  static deleteApplication = async (req, res, next) => {
  try {
    if (await Application.isAppliationExists(req.params.id) == true) {
      const { token } = req.headers;
      const userId = await User.getUserByToken(token)
      const realOwnar = await Application.getUserId(req.params.id)
      if (realOwnar === userId) {
        const result = await Application.delete(req.params.id)
        if (result === true) res.status(204).json("No Contant")
        else res.status(404).json(' This Application is is not exsist')
      }else { res.status(404).json("You are not allowed to Delete this Application") }
    }else { res.status(404).json("This Application is not Exists ") }

  } catch (error) {res.status(500).json({ "message": 'Error processing request' , "The error" :error});
  }}
  static userApplications = async (req, res, next) => {
  // get all applications for this user
  try {
    const { token } = req.headers;
    const userId = await User.getUserByToken(token);

    const result = await Application.getUserApplications(userId)
    if (result.length != 0) res.status(200).json(result)
    else res.status(404).json("You have not applied for any job ")

  }catch (error) {res.status(500).json({ "message": 'Error processing request' , "The error" :error});}

  }
  static userApplication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const userId = await User.getUserByToken(token);

    const result = await Application.getUserApplication(userId, req.params.id)
    if (result.length != 0) res.status(200).json(result)
    else res.status(404).json("You have not applied for this job ")

  } catch (error) {res.status(500).json({ "message": 'Error processing request' , "The error" :error});}
  }
  static JobApplications = async (req, res, next) => {
  try {
    const result = await Application.getJobApplications(req.params.id)
    if (result.length != 0) res.status(200).json(result)
    else res.status(404).json("No one has applied for this job")

  } catch (error) {res.status(500).json({ "message": 'Error processing request' , "The error" :error});}
  }
  static updateApplication = async (req, res, next) => {
  try {
    if (await Application.isAppliationExists(req.params.id) == true) {
      const { token } = req.headers;
      const userId = await User.getUserByToken(token)
      const realOwnar = await Application.getUserId(req.params.id)
      if (realOwnar === userId) {
        const newData = new Application()
        newData.setProtfolio(req.body.protfolio);
        newData.setCV(req.file.filename)
        newData.setId(req.params.id)
        newData.setContactEmail(req.body.constactEmail)

        const result = await Application.update(newData);
        if (result.length != 0) { res.status(201).json("done") }
        else res.status(500).json("fail")

      }else { res.status(404).json("You are not allowed to Edit this Application") }
    }else { res.status(404).json("This Application is not Exists ") }

  } catch (error) {res.status(500).json({ "message": 'Error processing request' , "The error is :" :error});}
  }
  static getApplication =async(req ,res, next)=>{

    const result = await Application.get(req.params.id)
    res.json(result) 
    
  }
  static updateApplicationStatus = async(req, res, next)=>{
     
    const result = await Application.updateStatus(req.params.id , req.body.status);
    if (result == true)   res.status(201).json('application status is updated successfully!');
    else res.status(404).json("fail");
  }


}
module.exports = { ApplicationController }