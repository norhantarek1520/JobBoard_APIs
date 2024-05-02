const express = require('express');
let router = express();
const { AuthorizeController } = require('../Controller/auth_controller')
const { body } = require("express-validator");
const { authorized } = require('../Middlware/authorized');

router.post('/login',
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("password").isLength({ min: 4, max: 12 }).withMessage("password should be between (8-12) character"),
    AuthorizeController.login)

router.post('/registre',
    body('name').isString().withMessage("please enter a valid name!"),
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("password").isLength({ min: 4, max: 12 }).withMessage("password should be between (8-12) character"),
    AuthorizeController.registre
)

router.get('/logout', authorized,AuthorizeController.logout)
module.exports = router;