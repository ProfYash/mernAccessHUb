const Pool = require('pg').Pool
const { Sequelize } = require('sequelize')
const pool = new Pool(
    {
        user: "postgres",
        password: "root",
        database: "mydb",
        host: "127.0.0.1",
        port: "5432"
    }
);

const seq = new Sequelize("mydb", "postgres", "root", {
    dialect: 'postgres', host: pool.host
})
async function test() {
    try {
        await seq.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test()
const User = seq.define(
    'users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING,
    },
    lname: {
        type: Sequelize.STRING,
    },

    role: {
        type: Sequelize.STRING,
    },

    exprieance: {
        type: Sequelize.INTEGER
    },
    country: { type: Sequelize.STRING },
    outoffscore: { type: Sequelize.INTEGER },
    credentialsid: { type: Sequelize.STRING },
    stackid: { type: Sequelize.STRING }
});
const Credentials = seq.define(
    "credentials", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    }
}

)
const Stacks = seq.define(
    "stacks", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    frontend: {
        type: Sequelize.STRING
    },
    backend: {
        type: Sequelize.STRING
    },
    db: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    }
}

)
User.hasOne(Credentials, {
    foreignKey: 'uid'
});
console.log("Done**************")
User.hasOne(Stacks, {
    foreignKey: 'uid'
})

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
    static async fetchUser(usernameTofetch) {
        console.log("inside fetchUseruser function")
        try {
            console.log("inside Try")
            const users = await User.findAll({
                include: {
                    model: Credentials,
                    where: {
                        username: usernameTofetch
                    }
                },

            });
            console.log(users[0].dataValues)
        }
        catch (err) {
            console.log("inside error")
            console.error(err.message)
        }
    }
    async createNewUser(user) {
        console.log("inside create new user function")
        try {
            console.log("inside Try")
            // let QueryForUserCreate = await this.pool.query("INSERT INTO users (id,credentialsid,fname,lname,role,exprieance,stackid,country) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [user.id, user.credentials.id, user.fname, user.lname, user.role, user.exprieance, user.stack.id, user.country])
            // let QueryForCredentialCreate = await this.pool.query("INSERT INTO credentials (credentialsid,username,password,uid) VALUES($1,$2,$3,$4) RETURNING *", [user.credentials.id, user.credentials.username, user.credentials.password, user.id])
            // let QueryForStackCreate = await this.pool.query("INSERT INTO stacks (id,frontend,backend,db,uid) VALUES($1,$2,$3,$4,$5) RETURNING *", [user.stack.id, user.stack.frontend, user.stack.backend, user.stack.db, user.id])
            // console.log(QueryForUserCreate)
            // console.log(QueryForStackCreate)
            // console.log(QueryForCredentialCreate)
            let QueryForUserCreate = await User.create({
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                role: user.role,
                exprieance: user.exprieance,
                country: user.country,
                outoffscore: 0,
                stackid: user.stack.id,
                credentialsid: user.credentials.id

            })
            let QueryForStackCreate = await Stacks.create({
                id: user.stack.id,
                frontend: user.stack.frontend,
                backend: user.stack.backend,
                db: user.stack.db,
                uid: user.id

            })
            let QueryForCredentialCreate = await Credentials.create({
                id: user.credentials.id, 
                username:user.credentials.username,
                password:user.credentials.password,
                uid: user.id
            })
            // console.log(QueryForUserCreate)
            // console.log(QueryForStackCreate)
            // console.log(QueryForCredentialCreate)
        }
        catch (err) {
            console.log("inside error")
            console.error(err.message)
        }
        // console.log("inside function", newQuery)
        return true
    }
    async fetchAllUsers() {
        console.log("inside fetchAllUsers function")
        try {
            console.log("inside Try")
            let QueryForUserCreate = await this.pool.query("SELECT * FROM users")
            let QueryForCredentialCreate = await this.pool.query("SELECT * FROM credentials")
            let QueryForStackCreate = await this.pool.query("SELECT * FROM stacks")
            console.log(QueryForCredentialCreate.rows)
            return [QueryForUserCreate.rows, QueryForCredentialCreate.rows, QueryForStackCreate.rows]
        }
        catch (err) {
            console.log("inside error")
            console.error(err.message)
        }
        // console.log("inside function", newQuery)
        return true
    }

}
MyDataBase.fetchUser("kanan123")
module.exports = { MyDataBase }