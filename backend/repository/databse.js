const Pool = require('pg').Pool
const pool = new Pool(
    {
        user: "postgres",
        password: "root",
        database: "mydb",
        host: "127.0.0.1",
        port: "5432"
    }
);
// let user ={
//     id:"123",
//     fname:"xyz",
//     lname:"abc",
//     role:"user",
//     exprieance:"555",
//     country:"australia"
// }
// pool.connect()

// let newQuery = pool.query(`INSERT INTO users (id,credentialsid,fname,lname,role,exprieance,stackid,country) VALUES(${user.id}, ${"1"}, ${user.fname}, ${user.lname}, ${user.role}, ${user.exprieance}, ${"2"},${user.country}) RETURNING *`)
class MyDataBase {
    constructor() {
        this.pool = pool
        // let newQuery = pool.query("\d")
    }
    static connectDatabase() {
        if (!pool) {
            pool = new Pool(
                {
                    user: "postgres",
                    password: "root",
                    database: "mydb",
                    host: "localhost",
                    port: "5432"
                }
            );
        }
        return pool
    }
    async createNewUser(user) {
        console.log("inside function")
        try {
            console.log("inside Try")
            let newQuery = await this.pool.query("INSERT INTO users (id,credentialsid,fname,lname,role,exprieance,stackid,country) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [user.id, "1", user.fname, user.lname, user.role, user.exprieance, "2", user.country])
            return newQuery
        }
        catch (err) {
            console.log("inside error")
            console.error(err.message)
        }
        // console.log("inside function", newQuery)
        return true
    }

}
module.exports = { MyDataBase }