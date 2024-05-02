// ================== all requierd packages ====================
const cors = require("cors");
const bodyParser = require('body-parser');
const formData = require('express-form-data');

// ================== all requierd modules ==================== 
const job_router = require('./Routers/Job_router');
const auth_router = require('./Routers/auth_router');

const user_router = require('./Routers/user_router')
const application_router = require('./Routers/application_router')
const category_router = require('./Routers/category_router')




//========================= INITIALIZE EXPRESS APP ================
const express = require('express');
let app = express();
let  port =  process.env.PORT || 5000;
// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// app.use(formData.parse({ keepExtensions: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
app.use(express.static("uploads"));


app.set('view engine', 'ejs');
app.set('views', 'Views');
app.use(express.static("Views"));

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use('/job' , job_router);
app.use( '/',auth_router);
app.use('/user' , user_router);
app.use('/application' , application_router);
app.use('/category' , category_router)
// ============================ test my code  ======================

//======================= run the app ================================

app.listen(port , ()=>{console.log(`this server running in port number :  ${port}` )})


