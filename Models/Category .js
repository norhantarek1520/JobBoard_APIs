const {connectDb}  = require('../Config/connect_db')
const util = require('util');

class Category {
  constructor(id, title , description ){
    this.id =id, 
    this.title =title , 
    this.description =description ;
  }

  getId() {return this.id;}
  getTitle () {return this.title ;}
  getDescription () {return this.description ;}

  setId(value) {  this.id= value;}
  setTitle (value) {  this.title= value ;}
  setDescription (value) {  this.description= value ;}

  static query = util.promisify(connectDb.query).bind(connectDb);

  static async getAll() {
    try {
      const result = await this.query("SELECT * FROM categories"); 
      if (result.length === 0) {return [];} else {return result;}
    } catch (error) {console.error(error); throw error;}
  }
  static async get(id) {
    try {
      const result = await this.query(`select * from categories where id = ${id}`)
      if (result.length === 0) {return [];} else {return result;}
    
    }catch (error) {console.error(error); throw error;}

  }
  static async addNew(category) {
    try {
      const result = await this.query("INSERT INTO categories set ?", category)
      if (result.affectedRows === 1) {return true;} else {return false;}
    }catch (error) {console.error(error); throw error;}


  }
  static async delete(id) {
    try {
      const result = await this.query(`DELETE FROM categories WHERE  id = ${id};`)
      if (result.affectedRows === 1) {return true;} else {return false;}
    }catch (error) {console.error(error); throw error;}

  }
  static async update(category) {
    try {
      const result = await this.query(`UPDATE categories SET title = ? ,description = ? where  id=? `, [category.title, category.description, category.id])
      if (result.affectedRows === 1) {return true;} else {return false;}
    }catch (error) {console.error(error); throw error;}

  }
  static async JobsInOneCategory(categoryId) {
    try {

    const result = await this.query(`SELECT  j.id,  j.title FROM jobs j INNER JOIN categories c ON j.category = c.title where c.id = ${categoryId}`)
    if (result.length != 0) { return result} else {return []}

    }catch (error) {console.error(error); throw error;}

  }

}
module.exports ={Category}