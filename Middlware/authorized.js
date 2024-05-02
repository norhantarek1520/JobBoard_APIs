const {connectDb} = require("../Config/connect_db");
const util = require("util");

 
const authorized = async(req , res , next )=>{
    // 1. connect db
    const query = util.promisify(connectDb.query).bind(connectDb);
    // 2. get the token from the header 
    const {token} = req.headers ;

    // 3. get data from db  
    const user = await query("select * from users where token = ?" , [token] );
    // 4. show the result 
    if (user[0]) {
        res.locals.user = user[0];
        next();
      } else {
        res.status(401).json("you are not authorized !");
      }

}



module.exports = {authorized};