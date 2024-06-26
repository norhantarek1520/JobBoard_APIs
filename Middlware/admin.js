const {connectDb} = require("../Config/connect_db");
const util = require("util");

const admin = async(req , res , next )=>{
    // 1. connect db
    const query = util.promisify(connectDb.query).bind(connectDb);
    // 2. get the token from the header 
    const {token} = req.headers ;
    // 3. get data from db  
    const admin  = await query("select * from users where token = ?" , [token] );
    // 4. show the result 
    if(admin[0] && admin[0].is_admin==1 ){next()}
    else{
        res.status(403).send( "you are not allawed to do complete");
    }

}

module.exports = {admin};