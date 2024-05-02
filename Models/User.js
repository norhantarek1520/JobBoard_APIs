const {connectDb}  = require('../Config/connect_db')
const util = require('util');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class User
{
    constructor(id,name,email,password,age,address,image,is_admin,phone_number ,token ,gender , job_title , education){
        // id,name,email,password,age,address,image,is_admin,phone_number ,token
        this.id =id, 
        this.name =  name,
        this.email  = email, 
        this.password = password , 
        this.age = age ,
        this.address = address,
        this.image =image ,
        this.is_admin = is_admin ,
        this.phone_number =phone_number ,
        this.token =token , 
        this.gender =gender,
        this.education = education ,
        this.job_title = job_title

    }

    getId() {  return this.id;}
    getName () { return this.name ;}
    getEmail() {  return this.email ;}
    getPassword() {  return this.password ;}
    getAge() {  return this.age ;}
    getAddress() {  return this.address ;}
    getImage() { return this.image ;}
    getIsAdmin() {  return this.is_admin;}
    getPhoneNumber() { return this.phone_number ;}
    getToken() { return this.token ;}
    getGender(){ return this.gender}
    getEducation(){ return this.education}
    getJobTitle(){ return this.job_title }

    setId (value)  {this.id= value  ; } 
    setName (value) {this.name= value  ;}
    setEmail(value) {this.email= value  ;}
    setPassword(value){this.password= value  ;}
    setAge(value) {this.age= value  ;}
    setAddress(value) {this.address= value  ;}
    setImage(value) {this.image= value  ;}
    setIsAdmin(value) {this.is_admin= value ;}
    setPhoneNumber(value) {this.phone_number= value  ;}
    setToken(value){this.token= value}
    setGender(value) {this.gender= value  ;}
    setEducation(value){ this.education = value}
    setJobTitle(value){ this.job_title = value}


//=====================================CRUDS Operations ==============================================
    static query = util.promisify(connectDb.query).bind(connectDb);


    static async getAll() {
    try {
    const result = await this.query("select  name ,email ,gender, phone_number , age from users")
    if (result.length === 0) {return [];} else {return result;}
    } catch (error) {console.error(error); throw error;}


    }
    static async get(token) {
    try {
    const result = await this.query(`select  name ,email ,gender , address , education , job_title , image , phone_number , age from users where token = \"${token}"`)
    if (result.length === 0) {return [];} else {return result[0];}
    } catch (error) {console.error(error); throw error;}

    }
    static async addNew(user) {
    try {
    const result = await this.query("INSERT INTO users set ?", user)
    if (result.affectedRows === 1) {return true;} else {return false;}
    } catch (error) {console.error(error); throw error;}

    }
    static async update(user) {
    try {
    //name ,email , age ,gender  address , phone_number  , job_title , education
    const result = await this.query(`UPDATE users SET name=?,email=?,gender=?,address=?,education=?,job_title=?,image=?,phone_number=?,age=? WHERE token=?`,
    [user.name, user.email, user.gender, user.address, user.education, user.job_title, user.image, user.phone_number, user.age, user.token])
    if (result.affectedRows === 1) {return true;} else {return false;}
    } catch (error) {console.error(error); throw error;}
    }
    static async delete(token) {
    try {
    const result = await this.query(`DELETE FROM users WHERE  token = \"${token}"`)
    if (result.affectedRows === 1) {return true;} else {return false;}
    } catch (error) {console.error(error); throw error;}

    }

    static async isEmailExists(email) {
    try {
    const checkEmailExists = await this.query(`select * from users where email = \"${email}"`);
    if (checkEmailExists.length > 0) {return true}else {return false;}
    } catch (error) {console.error(error); throw error;}



    }
    static async getIdByEmail(email) {
    try {
        const result = await this.query(`select id from users where email = \"${email}"`);
        if (result.length === 0) {return [];} else {result[0].id}
    } catch (error) {console.error(error); throw error;}

    }
    static async isExist(token) {
    try{
    const user = await this.query(`select id from users where token = \"${token}"`);
    if (user[0]) {return true;}return false;
    } catch (error) {console.error(error); throw error;}

    }
    static async isValid(token) {
    try{
    const user = await this.query(`select * from users where token =\"${token}"`);
    if (user[0]) {return true;}return false;
    }catch (error) {console.error(error); throw error;}


    }
    static async isAdmin(email) {
    try {
    const user = await this.query("select is_admin from users where email = ? ", [email]);
    if (user[0].is_admin) {return true;}return false;
    } catch (error) {console.error(error); throw error;}
    }
    static async getUserByEmail(email) {
    try {
    const result = await this.query(`select  name ,email ,gender , address , education , job_title , image , phone_number , age from users where email = \"${email}"`)
    if (result.length === 0) {return [];} else {return result;}
    } catch (error) {console.error(error); throw error;}


    }
    static async getTokenByEmail(email) {
    try {
    const result = await this.query(`select token from users where email = \"${email}"`)
    if (result.length === 0) {return [];} else {return result[0].token;}
    } catch (error) {console.error(error); throw error;}

    }
    static async getUserByToken(token) {
    try {
    const result = await this.query(`select id from users where token = \"${token}"`)
    if (result.length === 0) {return [];} else {result[0].id;}
    } catch (error) {console.error(error); throw error;}

    }


    static async comparePasswprd(email, password) {
    try {

    const userPassword = await this.query(`select password from users where email = \"${email}"`);
    const checkPassword = await bcrypt.compare(password, userPassword[0].password);
    return checkPassword;
    } catch (error) {console.error(error); throw error;}


    }


}


module.exports = {User}