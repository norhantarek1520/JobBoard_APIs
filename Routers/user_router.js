
const express = require('express');
let router = express();
const upload  = require('../Middlware/uploadFiles')
const { UserController } = require("../Controller/User_controller")
const { authorized } = require("../Middlware/authorized")


router.get('/profile', authorized, UserController.getUser);// get one user 
router.put('/update' , authorized ,  upload.single('image'),UserController.updateUser) // update users 
router.delete('/', authorized, UserController.delelteUser) // update users 




module.exports = router;