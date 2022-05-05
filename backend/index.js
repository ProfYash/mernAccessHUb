const JWTToken = require('./middleware/authentication.js')
const { User, Credentials, Stack } = require('./model/user.js')
const { Question, nounsBasedonCountry } = require('./model/question.js')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const axios = require('axios')
const app = express();
const { MyDataBase } = require('./repository/databse.js')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
const allUsers = []
const adminStack = new Stack("Reactjs", "nodejs", "MongoDb")
const adminCred = new Credentials("yash123", "$2b$10$wc.wxLlpEpciU0JB9QSh.uJmf7GLIxi/fM7ruPHRX6NsvlypKNQEO")
const adminUser = new User("Yash Shah", "admin", adminStack, 10, "India", adminCred)
allUsers.push(adminUser)
// console.log(allUsers)
const allQuestions = []
app.post('/api/v1/postuserdb', async (req, resp) => {
    console.log("inside postuserdb")
    const fullName = req.body.fullname;
    const role = req.body.role;
    const exprieance = req.body.exprieance;
    const country = req.body.country;
    const frontend = req.body.frontend;
    const backend = req.body.backend;
    const db = req.body.db;
    const username = req.body.username
    const password = req.body.password
    let credentials = new Credentials(username, password)
    credentials.password = await credentials.getHashOfPassword()
    let stackofNewUser = new Stack(frontend, backend, db)
    let newUser = new User(fullName, role, stackofNewUser, exprieance, country, credentials)
    // console.log(newUser)
    console.log("iUserCreated in postuserdb")
    const mydb = await new MyDataBase()
    console.log("mydb created",mydb)
    const newQuery = await mydb.createNewUser(newUser)
    console.log("newQuery created")
    resp.status(200).send(newQuery)
})
app.post('/api/v1/createuser', async (req, resp) => {
    console.log("inside Create User")
    if (!JWTToken.isValidateToken(req, resp, req.cookies["token"]).isValid) {
        console.log("Unauthorised")
        resp.status(401).send("Unauthorised")

    } else {
        let usernameExists = false
        const fullName = req.body.fullname;
        const role = req.body.role;
        const exprieance = req.body.exprieance;
        const country = req.body.country;
        const frontend = req.body.frontend;
        const backend = req.body.backend;
        const db = req.body.db;
        const username = req.body.username
        const password = req.body.password
        for (let index = 0; index < allUsers.length; index++) {
            if (allUsers[index].credentials.username == username) {
                usernameExists = true
                break
            }

        }


        if (usernameExists == true) {
            resp.status(405).send("Username Already Exist")
        } else {
            let credentials = new Credentials(username, password)
            credentials.password = await credentials.getHashOfPassword()
            let stackofNewUser = new Stack(frontend, backend, db)
            let newUser = new User(fullName, role, stackofNewUser, exprieance, country, credentials)
            allUsers.push(newUser)
            console.log("iUserCreated")
            resp.status(200).send(newUser)
        }
    }

})
app.get('/api/v1/getallusers', (req, resp) => {

    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).isValid) {
        console.log("here")
        resp.status(200).send(allUsers)
        console.log("allusers sent")
    } else {
        resp.status(401).send("Unauthorised")
    }

})
app.post('/api/v1/createquestion', async (req, resp) => {
    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).role != "admin") {
        resp.status(405).send("Unauthorised")
        return
    }
    const type = req.body.type
    const tech = req.body.tech
    const details = req.body.details
    const options = req.body.options
    const correctAnswer = req.body.correctAnswer
    const complexity = req.body.complexity
    let newQuestion = new Question(type, tech, details, options, correctAnswer)
    allQuestions.push(newQuestion)
    resp.status(200).send(newQuestion)
})
app.get('/api/v1/getallquestions', (req, resp) => {
    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).role == "admin") {
        resp.status(200).send(allQuestions)
        return
    }
    resp.status(405).send("Unauthorised")
})
app.post('/api/v1/login', async (req, resp) => {

    let flag = 0
    const username = req.body.username
    const password = req.body.password
    for (let i = 0; i < allUsers.length; i++) {
        if (username == allUsers[i].credentials.username) {
            flag = 1
            let isMatch = await allUsers[i].comparePassword(password)

            if (isMatch) {
                flag = 2
                let jwttoken = new JWTToken(allUsers[i])
                let newToken = jwttoken.createToken()
                resp.cookie("token", newToken)
                resp.status(201).send(allUsers[i])

                break
            }
        }

    }
    if (flag == 0) {
        resp.status(400).send("Invalid Username")
    } else if (flag == 1) {

        resp.status(400).send("Invalid Password")
    } else {
        console.log("Login done")
    }

})
app.get('/api/v1/fetchquestion/:username', (req, resp) => {
    const username = req.params.username
    let jwttoken = JWTToken.isValidateToken(req, resp, req.cookies["token"])
    if (!jwttoken.isValid) {
        resp.status(405).send("Unauthorised")
        return
    }

    let user = null
    for (let i = 0; i < allUsers.length; i++) {
        if (username == allUsers[i].credentials.username) {
            user = allUsers[i]
        }
    }


})
app.listen(8888, () => {
    console.log("Backend service running at 8888")
});
