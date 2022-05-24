const User = require('../model/user.js')
const express = require("express");
const jwt = require("jsonwebtoken");
const secretkey = "Strong Key"
class JWTToken {
    constructor(user) {
        this.username = user.credentials.username
        this.fname = user.fname
        this.lname = user.lname
        this.role = user.role
        this.exprieance = user.exprieance
        this.isValid = true
    }
    createToken() {
        return jwt.sign(JSON.stringify(this), secretkey)
    }
    static isValidateToken(req, resp, token) {
        let allCookie = req.cookies
        if (!allCookie["token"]) {
            return false
        }
        return jwt.verify(token, secretkey)
    }
   
    
}
module.exports = JWTToken