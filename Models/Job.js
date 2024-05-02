const { reconstructFieldPath } = require('express-validator/src/field-selection');
const {connectDb}  = require('../Config/connect_db')
const util = require('util');
class Job {
    constructor(id ,title ,job_type , experience , location , image , published_on ,vacancy ,salary ,owner, category, responsibility,qualifications,deadline	) {          		
            this.id = id,
            this.title = title,
            this.job_type = job_type,
            this.experience = experience,
            this.location = location,          
            this.image = image,
            this.published_on = published_on,
            this.vacancy = vacancy,
            this.salary = salary,
            this.owner = owner,
            this.category = category,
            this.deadline = deadline,
            this.qualifications = qualifications,	
            this.responsibility =responsibility
    }
 
    getId() { return this.id;}
    getTitle () {return this.title ;}
    getJobType() {return this.job_type ;}
    getExperience() {return this.experience ;}
    getLocation() {return this.location ;} 
    getImage() {return this.image ;}
    getPublishedOn() {return this.published_on;}
    getVacancy() {return this.vacancy ;}
    getSalary() {return this.salary ;}
    getOwner() {return this.owner ;}
    getCategory() { return this.category ;}
    getDeadline(){return this.deadline ;}
    getQualifications(){return this.qualifications; }
    getResponsibility(){return this.responsibility }
  
    setTitle (value) {this.title= value  ;}
    setJobType(value) {this.job_type= value  ;}
    setExperience(value) {this.experience= value  ;}
    setLocation(value) {this.location= value  ;}
    setImage(value) {this.image= value  ;}
    setPublishedOn(value) {this.published_on= value ;}
    setVacancy(value) {this.vacancy= value  ;}
    setSalary(value) {this.salary= value  ;}
    setOwner(value) {this.owner= value  ;}
    setCategory(value) {this.category= value  ;}
    setDeadline(value){this.deadline = value ; }
    setQualifications(value){this.qualifications = value ;}
    setResponsibility(value){this.responsibility  = value ;}

  
    static query = util.promisify(connectDb.query).bind(connectDb);

    static async getAll() {
     try {
        const result = await this.query("select * from jobs")
        if (result.length === 0) {return [];} else {return result;}
     } catch (error) {console.error(error); throw error;}
    }
    static async get(id) {
        try {
            const result = await this.query(`select * from jobs where id = ${id}`)
            if (result.length === 0) {return [];} else {return result;}
        } catch (error) {console.error(error); throw error;}
    }
    static async delete(id) {
        try {
            const result = await this.query(`DELETE FROM jobs WHERE  id = ${id};`)
            if (result.affectedRows === 1) {return true;} else {return false;}
        }catch (error) {console.error(error); throw error;}
    }
    static async update(id, job) {
        try {
            const result = await this.query(` UPDATE jobs SET title = \"${job.title}",experience = \"${job.experience}" ,job_type =\"${job.job_type}",location =\"${job.location}", published_on =\"${job.published_on}",deadline=\"${job.deadline}",salary = ${job.salary},responsibility= \"${job.responsibility}" ,owner =\"${job.owner}" , vacancy = \"${job.vacancy}" ,category =\"${job.category}" ,qualifications =\"${job.qualifications}" , image =\"${job.image}" ,category=\"${job.category}"  WHERE id = ${id}`);
            if (result.affectedRows === 1) {return true;} else {return false;}
        } catch (error) {console.error(error); throw error;}
    }
    static async addNew(job) {
        try {
            const result = await this.query("INSERT INTO jobs set ?", job);
            if (result.affectedRows === 1) {return true;} else {return false;}
        } catch (error) {console.error(error); throw error;}

    }
    static async isExist(id) {
        try{
            const job = await this.query("select * from jobs  where id = ? ", [id]);
            if (job[0]) {return true;}return false;
        }catch (error) {console.error(error); throw error;}
        
    }
  
}


module.exports = {Job}; 