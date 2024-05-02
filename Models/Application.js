const { error } = require("console");
const { connectDb } = require("../Config/connect_db")
const util = require("util")
class Application {
    constructor(id ,userID, jobID, cv, protfolio, applaiedOn , status, contactEmail) {
        this.id = id ,
        this.userID = userID,
        this.jobID = jobID,
        this.cv = cv,
        this.protfolio = protfolio,
        this.status = status,
        this.applaiedOn = applaiedOn,
        this.contactEmail= contactEmail;
    }
    //========================= Getters ==================================
    getId() { return this.id; }
    getUserID() { return this.userID; }
    getJobID() { return this.jobID; }
    getCV() { return this.cv; }
    getProtfolio() { return this.protfolio; }
    getApplaiedOn() { return this.applaiedOn; }
    getStatus(){return this.status}
    getContactEmail(){return this.contactEmail}


    //=================================================== all setters ================================================
    setId(value) { this.id =value ; }
    setCV(value) { this.cv = value; }
    setProtfolio(value) { this.protfolio = value; }
    setUserId(value) { this.userID = value }
    setJobId(value) { this.jobID = value }
    setApplaiedOn(value) { this.applaiedOn = value; }
    setStatus(value){this.status = value;}
    setContactEmail(value){this.contactEmail = value}
    //=====================================CRUDS Operations on candidates ================================================
    static query = util.promisify(connectDb.query).bind(connectDb);

    static async addNew(application) {
        try {
        const result = await this.query("INSERT INTO applications set ?", application)
        if (result.affectedRows === 1) {return true;} else {return false;}
        
        }catch (error) {console.log(error)}
    }
    static async delete(applicationId) {
        try {
        const result = await this.query(`DELETE FROM applications WHERE  id = ${applicationId} ;`)
        if (result.affectedRows === 1) {return true;} else {return false;}
       } catch (error) {console.error(error); throw error;}

    }
    static async update(application) {
        try {
            const result = await this.query(`UPDATE applications SET protfolio =\"${application.protfolio}" , cv =\"${application.cv}" , contactEmail =\"${application.contactEmail}" , status = 'pending' WHERE  id = ${application.id} ;`)
            if (result.affectedRows === 1) {return true;} else {return false;}
        }  catch (error) {console.log(error)}
    }
    static async get(applicationId) {
        try {
            const result = await this.query(`select * from applications  WHERE  id = ${applicationId}  `)
            if (result.length === 0) {return [];} else {return result;}
        } catch (error) {console.error(error); throw error;}

    }
    static async getApplicationId(userId, jobId) {
        try {
            const result = await this.query(`select id from applications  WHERE  userID = ${userId} && jobID=${jobId} `)
            if (result.length === 0) {return [];} else {return result;}
        } catch (error) {console.error(error); throw error;}
    }
    static async getUserId(applicationId) {
        try {
            const result = await this.query(`select userId from applications  WHERE  id = ${applicationId}`)
            if(result != null){ return result[0].userId}else {return []}
       } catch (error) {console.error(error); throw error;}
    }
    static async isAppliationExists(applicationId) {
        try {  
            const result = await this.query(`select id from applications  WHERE  id = ${applicationId} `)
            if(result.length != 0){return true;} else {return false;}
       } catch (error) {console.error(error); throw error;}
    }

    // for user 
    static async getUserApplications(userId) {
        try {
            const result = await this.query(`select * from applications  WHERE  userID = ${userId} `)
            if (result.length === 0) {return [];} else {return result;}
        } catch (error) {console.error(error); throw error;}
    }
    static async getUserApplication(userId, jobId) {
        try {
            const result = await this.query(`select * from applications  WHERE  userID = ${userId} && jobID=${jobId} `)
            if (result.length === 0) {return [];} else {return result;}
        } catch (error) {console.error(error); throw error;}
        

    }
    static async appliedBefore(userId, jobId) {
        try {
            const result = await this.query(`select * from applications  WHERE   userID= ${userId} && jobID=${jobId} `)
            if (result.length === 0) {return false;} else {return true}
        } catch (error) {console.log(error) }
    }
    // for admin in job 
    static async getJobApplications(jobId) {
        try {
            const result = await this.query(`select * from applications  WHERE  jobID = ${jobId} `)
            if (result.length === 0) {return [];} else {return result;}
        } catch (error) {console.error(error); throw error;}

    }
    static async updateStatus(applicationId , status){
        try {
            const result = await this.query(`UPDATE applications SET status =${status}   WHERE  id = ${applicationId} ;`)
            if (result.affectedRows === 1) {return true;} else {return false;}
        } catch (error) {console.error(error); throw error;}
       
    }
}

module.exports = { Application }