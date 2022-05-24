const JWTToken = require('./middleware/authentication.js')
const { User, Credentials, Stack, AllUsers, AllQuestions, AllTest, gettests } = require('./model/user.js')
const { Question, nounsBasedonCountry } = require('./model/question.js')
const { Test } = require('./model/test.js')
const { MyDataBase } = require('./repository/database.js')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const axios = require('axios')
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


app.post('/api/v1/createuser', async (req, resp) => {
    console.log(JWTToken.isValidateToken(req, resp, req.cookies["token"]).isValid)
    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).isValid) {

        let mydb = new MyDataBase()
        mydb.connectDatabase()


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
        for (let index = 0; index < AllUsers.length; index++) {
            if (AllUsers[index].credentials.username == username) {
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
            let tests = gettests(stackofNewUser, AllTest)
            let newUser = new User(fullName, role, stackofNewUser, exprieance, country, credentials, tests)
            AllUsers.push(newUser)
            // console.log("iUserCreated", newUser)
            mydb.createNewUser(newUser)
            resp.status(200).send(newUser)
        }
    } else {
        // console.log("Unauthorised")
        resp.status(401).send("Unauthorised")
    }

})
app.get('/api/v1/getAllUsers', async (req, resp) => {

    console.log(JWTToken.isValidateToken(req, resp, req.cookies["token"]).isValid)
    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).isValid) {
        let mydb = new MyDataBase()
        mydb.connectDatabase()
        let allusersfromdb, allquestionsfromdb, allstacksfromdb
        let alldata = await mydb.fetchAllUsers()
        console.log(alldata[0])
        console.log(AllUsers)
        resp.status(200).send(AllUsers)
        // console.log("AllUsers sent")
    } else {
        resp.status(401).send("Unauthorised")
    }

})
app.post('/api/v1/createquestion', async (req, resp) => {
    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).role != "admin") {
        resp.status(401).send("Unauthorised")
        return
    }
    const type = req.body.type
    const tech = req.body.tech
    const details = req.body.details
    const options = req.body.options
    const correctAnswer = req.body.correctAnswer
    const complexity = req.body.complexity
    let newQuestion = new Question(type, tech, details, options, correctAnswer, complexity)
    for (let index = 0; index < AllTest.length; index++) {
        if (tech == AllTest[index].tech) {
            AllTest[index].insertQuestiontoTest(newQuestion)
            // console.log(AllTest[index])
            break
        }

    }

    AllQuestions.push(newQuestion)
    resp.status(200).send(newQuestion)
    // console.log(newQuestion)
})
app.get('/api/v1/getAllQuestions', (req, resp) => {
    if (JWTToken.isValidateToken(req, resp, req.cookies["token"]).role == "admin") {
        resp.status(200).send(AllQuestions)
        return
    }
    resp.status(405).send("Unauthorised")
})
app.post('/api/v1/login', async (req, resp) => {

    let flag = 0
    const username = req.body.username
    const password = req.body.password
    for (let i = 0; i < AllUsers.length; i++) {
        if (username == AllUsers[i].credentials.username) {
            flag = 1
            let isMatch = await AllUsers[i].comparePassword(password)

            if (isMatch) {
                flag = 2
                let jwttoken = new JWTToken(AllUsers[i])
                let newToken = jwttoken.createToken()
                resp.cookie("token", newToken)
                resp.status(201).send(AllUsers[i])

                break
            }
        }

    }
    if (flag == 0) {
        resp.status(400).send("Invalid Username")
    } else if (flag == 1) {

        resp.status(400).send("Invalid Password")
    } else {
        // console.log("Login done")
    }

})
app.get('/api/auth/logout', (req, resp) => {
    // console.log("logout")
    let tokenPayload = JWTToken.isValidateToken(req, resp, req.cookies["token"])
    resp.cookie('token', 'none', {
        expires: new Date(Date.now() + 0 * 1000),
        httpOnly: true,
    })
    resp.status(200).send({ success: true, message: 'User logged out successfully' })
})
app.get('/api/v1/fetchquestion/:username', (req, resp) => {
    const username = req.params.username
    let jwttoken = JWTToken.isValidateToken(req, resp, req.cookies["token"])
    if (!jwttoken.isValid) {
        resp.status(405).send("Unauthorised")
        return
    }

    let user = null
    for (let i = 0; i < AllUsers.length; i++) {
        if (username == AllUsers[i].credentials.username) {
            user = AllUsers[i]
        }
    }


})
app.get('/api/v1/getTests', (req, resp) => {
    let tokenPayload = JWTToken.isValidateToken(req, resp, req.cookies["token"])
    if (tokenPayload.role != "user") {
        resp.status(405).send("Unauthorised")
        return
    }

    let index = findUser(tokenPayload.username)
    resp.status(201).send(AllUsers[index])


})
app.post('/api/v1/getQuestions', async (req, resp) => {
    let tokenPayload = JWTToken.isValidateToken(req, resp, req.cookies["token"])
    if (tokenPayload.role != "user") {
        resp.status(405).send("Unauthorised")
        return
    }
    const testid = req.body.testid
    let username = tokenPayload.username
    let index = findUser(tokenPayload.username)
    let indexOftest = findquestion(AllUsers[index], testid)
    if (indexOftest == "Already Attempted") {
        resp.status(504).send(indexOftest)
        return
    }
    AllUsers[index].tests[indexOftest].attempt = true
    resp.status(201).send(AllUsers[index].tests[indexOftest].questions)
})
app.post('/api/v1/submitTest', async (req, resp) => {
    let tokenPayload = JWTToken.isValidateToken(req, resp, req.cookies["token"])
    if (tokenPayload.role != "user") {
        resp.status(405).send("Unauthorised")
        return
    }
    let questions = req.body
    let index = findUser(tokenPayload.username)
    AllUsers[index].updateScore(questions)

    console.log(AllUsers[index])
    resp.status(201).send(AllUsers[index])



})
app.listen(8888, () => {
    const questions = [new Question("MCQ", "React", "React is a ?", ["FrontEnd Tech", "Backend Tech", "DB Tech", "None"], "FrontEnd Tech", 6),
    new Question("MCQ", "Node", "Node is a ?", ["FrontEnd Tech", "Backend Tech", "DB Tech", "None"], "Backend Tech", 4),
    new Question("MCQ", "Mongo", "Mongo is a ?", ["FrontEnd Tech", "Backend Tech", "DB Tech", "None"], "DB Tech", 7), new Question("MCQ", "Node", "2212112Node is a ?", ["FrontEnd Tech", "Backend Tech", "DB Tech", "None"], "Backend Tech", 4)]
    const test = [new Test("React"), new Test("Node"), new Test("Mongo")]
    for (let index = 0; index < test.length; index++) {
        AllTest.push(test[index])
    }
    for (let index = 0; index < questions.length; index++) {
        AllQuestions.push(questions[index])
        for (let j = 0; j < AllTest.length; j++) {
            if (AllTest[j].tech == questions[index].tech) {
                AllTest[j].insertQuestiontoTest(questions[index])
            }

        }
    }
    const adminStack = new Stack("React", "Node", "Mongo")
    const adminCred = new Credentials("yash123", "$2b$10$wc.wxLlpEpciU0JB9QSh.uJmf7GLIxi/fM7ruPHRX6NsvlypKNQEO")
    const userCred = new Credentials("kanan123", "$2b$10$wc.wxLlpEpciU0JB9QSh.uJmf7GLIxi/fM7ruPHRX6NsvlypKNQEO")
    const adminUser = new User("Yash Shah", "admin", adminStack, 10, "India", adminCred)
    const newuser = new User("Kanan", "user", adminStack, 10, "India", userCred)

    AllUsers.push(adminUser, newuser)
    // console.log("AllQuestions****************************************")
    // console.log(AllQuestions)
    // console.log("AllUsers****************************************")
    // console.log(AllUsers)
    // console.log("AllTest****************************************")
    // console.log(AllTest)
    console.log("Backend service running at 8888")
});


function findUser(username) {
    let flag = false
    let index = -100

    for (let i = 0; i < AllUsers.length; i++) {

        if (AllUsers[i].credentials.username == username) {
            index = i
            flag = true
            break
        }

    }
    if (flag) {
        return index
    } else {
        // console.log(flag)
        // console.log("inside else")
        return "User Not Found"
    }
}

function findquestion(user, testid) {
    let flag = false
    let attempt = false
    let tests = user.tests
    let index = 0
    for (let i = 0; i < tests.length; i++) {
        if (tests[i].testid == testid) {
            attempt = tests[i].attempt
            flag = true
            index = i
            break
        }
    }
    if (flag && !attempt) {
        // return tests[index].questions
        return index
    } else {
        return "Already Attempted"
    }


}