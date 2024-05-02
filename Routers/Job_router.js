
const express = require('express');
let router = express();
const { JobController } = require('../Controller/Job_controller');
const { admin } = require('../Middlware/admin');
const { authorized } = require('../Middlware/authorized');
const upload = require("../Middlware/uploadFiles")

router.get('/', JobController.getAllJobs)
router.get('/:id', JobController.getJob)


// for admin 
router.post('/add', admin, JobController.addNewteJob) // add new job 
router.delete('/delete/:id', admin, JobController.deleteJob) // delete job 
router.put('/update/:id', admin, JobController.updateJob) // update job 


module.exports = router;