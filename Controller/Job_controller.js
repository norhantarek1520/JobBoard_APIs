const { Job } = require('../Models/Job')
class JobController {

  static getAllJobs = async (req, res, next) => {

    try {
      const jobs = await Job.getAll()
      if (jobs.length != 0) { res.status(200).json(jobs)}
      else {res.status(404).json("NO Jobs ")}

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }
  static getJob = async (req, res, next) => {
    try {
      const id = req.params.id;
      const job = await Job.get(id);
      if (job.length != 0) {res.status(200).json(job)}
      else {res.status(404).json("This job is not Exists !")}
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  static deleteJob = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Job.delete(id);
      if (result === true) {res.status(204).json(" job deleted  successfully ")}
      else res.json(' Fail in deleteing!' )
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }
  static addNewteJob = async (req, res, next) => {

    try {
      //const JobObj = req.body ;
      const JobObj = new Job(req.body);
      JobObj.setTitle(req.body.title)
      JobObj.setJobType(req.body.job_type)
      JobObj.setOwner(req.body.owner)
      JobObj.setSalary(req.body.salary)
      JobObj.setVacancy(req.body.vacancy)
      JobObj.setLocation(req.body.location)
      JobObj.setCategory(req.body.category)
      JobObj.setExperience(req.body.experience)
      JobObj.setImage(req.body.image)
      JobObj.setDeadline(req.body.deadline)
      JobObj.setQualifications(req.body.qualifications)
      JobObj.setResponsibility(req.body.responsibility)

      const now = new Date();
      JobObj.setPublishedOn(now.toISOString().split('T')[0])

      const result = await Job.addNew(JobObj);
      if (result === true) res.status(201).json(" job added successfully ")
      else res.status(404).json('Fail in adding ')

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }
  static updateJob = async (req, res, next) => {
    try {
      const id = req.params.id;
      const oldData = await Job.get(id)
      if (oldData.length == null) {
        res.status(201).json("No Job with this id")
      }
      else {
        const JobObj = new Job(req.body);
        if (req.body.title == null) JobObj.setTitle(oldData[0].title)
        else JobObj.setTitle(req.body.title)

        if (req.body.job_type == null) { JobObj.setJobType(oldData[0].job_type) }
        else { JobObj.setJobType(req.body.job_type) }

        if (req.body.owner == null) { JobObj.setOwner(oldData[0].owner) }
        else { JobObj.setOwner(req.body.owner) }

        if (req.body.salary == null) { JobObj.setSalary(oldData[0].salary) }
        else { JobObj.setSalary(req.body.salary) }

        if (req.body.vacancy == null) { JobObj.setVacancy(oldData[0].vacancy) }
        else { JobObj.setVacancy(req.body.vacancy) }

        if (req.body.location == null) { JobObj.setLocation(oldData[0].location) }
        else { JobObj.setLocation(req.body.location) }

        if (req.body.category == null) { JobObj.setCategory(oldData[0].category) }
        else { JobObj.setCategory(req.body.category) }

        if (req.body.experience == null) { JobObj.setExperience(oldData[0].experience) }
        else { JobObj.setExperience(req.body.experience) }


        if (req.body.deadline == null) { JobObj.setDeadline(oldData[0].deadline) }
        else { JobObj.setDeadline(req.body.deadline) }

        if (req.body.qualifications == null) { JobObj.setQualifications(oldData[0].qualifications) }
        else { JobObj.setQualifications(req.body.qualifications) }

        if (req.body.responsibility == null) { JobObj.setResponsibility(oldData[0].responsibility) }
        else { JobObj.setResponsibility(req.body.responsibility) }

        if (req.body.published_on == null) { JobObj.setPublishedOn(oldData[0].published_on) }
        else { JobObj.setPublishedOn(req.body.published_on) }

        const result = await Job.update(id, JobObj);
        if (result === true) res.status(200).json(" job Updated  successfully ")
        else res.status(404).json(' Can not update this job')

      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }


}
module.exports = { JobController }