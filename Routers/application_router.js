const express = require('express');
let router = express();
const { admin } = require('../Middlware/admin');
const { ApplicationController } = require('../Controller/Application_controller');
const { authorized } = require('../Middlware/authorized');
const upload = require("../Middlware/uploadFiles")

router.delete('/delete/:id', authorized, ApplicationController.deleteApplication);
router.post('/add/:id' , authorized , upload.single('cv'),ApplicationController.addNewApplication);
router.get('/userApplications', authorized, ApplicationController.userApplications);  
router.get('/userApplication/:id', authorized, ApplicationController.userApplication) ;
router.put('/update/:id', authorized,  upload.single('cv') ,ApplicationController.updateApplication); 

// for The system (testing )
router.get('/:id', authorized, ApplicationController.getApplication) ;
// for Admind 
router.get('/JobApplications/:id', admin, ApplicationController.JobApplications) ;
router.put('/updateStates/:id' , admin , ApplicationController.updateApplicationStatus)

// // test code 
//   // Route for receiving name and image
//   router.post('/data', upload.single('cv'), async (req, res) => {
//     if (!req.body.name || !req.file) {
//       return res.status(400).json({ message: 'Missing name or image' });
//     }
//     const name = req.body.name;
//      const imagePath = req.file.filename;
//     res.json({ name, imagePath });
// })

module.exports = router;
