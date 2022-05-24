const uuid = require('uuid')
const AllUsers = []
const AllQuestions = []
const AllTest = []
class User {
    constructor(fullName, role, stack, experiance, country, credentials) {
        this.id = uuid.v4()
        this.credentials = credentials
        let tempName = fullName.split(" ")
        this.fname = tempName[0]
        this.lname = tempName[1]
        this.role = role
        this.exprieance = experiance
        this.stack = stack
        this.country = country
        this.tests = gettests(this.stack, AllTest)
        this.score = 0
        this.outoffscore = 0
        for (let index = 0; index < this.tests.length; index++) {
            this.outoffscore = this.outoffscore + this.tests[index].outoffscore

        }

    }
    sendUserDetails() {
        return this
    }
    comparePassword(password) {
        let isMatch = bcrypt.compare(password, this.credentials.password)

        return isMatch
    }
    updateScore(questions) {
        Object.values(questions).map(q => {
            let questionId = q[0].id
            let testIndex = -100
            for (let i = 0; i < this.tests.length; i++) {
                for (let j = 0; j < this.tests[i].questions.length; j++) {
                    if (questionId == this.tests[i].questions[j].id) {
                        testIndex = i
                        break
                    }

                }
                if (testIndex != -100) {
                    break
                }
            }



            console.log(q)
            for (let index = 0; index < q.length; index++) {
                if (q[index].correctAnswer == q[index].selectedAnswer) {
                    this.score = this.score + q[index].totalMark
                    this.tests[testIndex].score = this.tests[testIndex].score + q[index].totalMark
                } else {
                    this.score = this.score - q[index].negMark
                    this.tests[testIndex].score = this.tests[testIndex].score - q[index].negMark
                }

            }
        })
    }
}
const bcrypt = require('bcrypt')
class Credentials {
    constructor(username, password) {
        this.id=uuid.v4()
        this.username = username
        this.password = password
    }

    getHashOfPassword = async () => {
        return bcrypt.hash(this.password, 10)
    }
}
class Stack {
    constructor(frontend, backend, db) {
        this.id = uuid.v4()
        this.frontend = frontend
        this.backend = backend
        this.db = db

    }
    sendStackDetails() {
        return this
    }
}
function gettests(stack, alltest) {
    let frontend = stack.frontend
    let backend = stack.backend
    let db = stack.db
    let temptest = []
    for (let index = 0; index < alltest.length; index++) {
        if (alltest[index].tech == frontend || alltest[index].tech == backend || alltest[index].tech == db) {
            temptest.push(alltest[index])
        }

    }
    return temptest
}
module.exports = { User, Credentials, Stack, AllUsers, AllQuestions, AllTest, gettests }