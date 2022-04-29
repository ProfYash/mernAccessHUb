const uuid = require('uuid')
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
       
    }
    sendUserDetails() {
        return this
    }
    comparePassword(password) {
        let isMatch= bcrypt.compare(password, this.credentials.password)
       
        return isMatch
    }
}
const bcrypt = require('bcrypt')
class Credentials {
    constructor(username, password) {
        this.username = username
        this.password = password
    }

    getHashOfPassword = async () => {
        return bcrypt.hash(this.password, 10)
    }
}
class Stack {
    constructor(frontend, backend, db) {
       
        this.frontend = frontend
        this.backend = backend
        this.db = db
   
    }
    sendStackDetails() {
        return this
    }
}
module.exports = { User, Credentials, Stack }