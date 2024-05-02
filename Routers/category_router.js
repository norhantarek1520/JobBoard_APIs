const express = require('express');
let router = express();

const { admin } = require('../Middlware/admin');
const { CategoryController } = require('../Controller/Category_controller')
const { errorHandler } = require('../Middlware/errorHandler')


router.get('/', errorHandler, CategoryController.getAllCategories) // get all  category
router.get('/:id', errorHandler, CategoryController.getCategory) // get one category 
router.put('/update/:id', admin, errorHandler, CategoryController.updateCategory) // update category 
router.delete('/delete/:id', admin, errorHandler, CategoryController.deleteCategory) // delete category 
router.post('/add', admin, errorHandler, CategoryController.createCategory) // delete category 


// all jobs in every category 
router.get('/jobs_in_category/:id', errorHandler, CategoryController.JobsInOneCategory) // all jobs in one category id = category id  

module.exports = router;
