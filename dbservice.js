import mysql from 'mysql'
import dotenv from 'dotenv'
let instance=null;
dotenv.config();

// const connection=mysql.createConnection({
//     host:"sql12.freesqldatabase.com",
//     user:"sql12676079",
//     password:"tYe4DEfXK6",
//     database:"sql12676079",
//     port:"3306"
// });
const connection=mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"0710",
    database:"backend-assignment",
    port:"3306"
});


connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM assignment;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(name) {
        try {
            const date = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO assignment (name, date) VALUES (?,?);";

                connection.query(query, [name, date] , (err, result) => {
                    console.log(result)
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return {
                id :insertId,
                name : name,
                dateAdded : date
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM assignment WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE assignment SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM assignment WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}


export default DbService;