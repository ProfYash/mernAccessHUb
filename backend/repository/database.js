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
    connectDatabase() {
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
        console.log("inside create new user function")
        try {
            console.log("inside Try")
            let QueryForUserCreate = await this.pool.query("INSERT INTO users (id,credentialsid,fname,lname,role,exprieance,stackid,country) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [user.id, user.credentials.id, user.fname, user.lname, user.role, user.exprieance, user.stack.id, user.country])
            let QueryForCredentialCreate = await this.pool.query("INSERT INTO credentials (credentialsid,username,password,uid) VALUES($1,$2,$3,$4) RETURNING *", [user.credentials.id, user.credentials.username,  user.credentials.password,user.id])
            let QueryForStackCreate = await this.pool.query("INSERT INTO stack (id,frontend,backend,db,uid) VALUES($1,$2,$3,$4,$5) RETURNING *", [user.stack.id, user.stack.frontend, user.stack.backend, user.stack.db, user.id])
            console.log(QueryForUserCreate)
            console.log(QueryForStackCreate)
            console.log(QueryForCredentialCreate)
        }
        catch (err) {
            console.log("inside error")
            console.error(err.message)
        }
        // console.log("inside function", newQuery)
        return true
    }
    async fetchAllUsers(){
        console.log("inside fetchAllUsers function")
        try {
            console.log("inside Try")
            let QueryForUserCreate = await this.pool.query("SELECT * FROM users")
            let QueryForCredentialCreate = await this.pool.query("SELECT * FROM credentials")
            let QueryForStackCreate = await this.pool.query("SELECT * FROM stack")
            // console.log(QueryForUserCreate.rows)
            // console.log(QueryForStackCreate)
            // console.log(QueryForCredentialCreate)
            return [QueryForUserCreate.rows,QueryForCredentialCreate.rows,QueryForStackCreate.rows]
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