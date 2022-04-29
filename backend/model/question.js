const uuid = require('uuid')
class Question {
    constructor(type, tech, details, options, correctAnswer, complexity) {
        this.id = uuid.v4()
        this.type = type
        this.tech = tech
        this.details = details
        this.options = options
        this.correctAnswer = correctAnswer
        this.complexity = complexity
        if (this.complexity > 6) {
            this.totalMark = 4
        } else if (this.complexity > 4) {
            this.totalMark = 2
        } else {
            this.totalMark = 1
        }
        this.negMark = 0.25 * this.totalMark
    }
}
const nounsBasedonCountry = [{
    country: "India",
    nouns: ["yash", "Kanan", "aditi"]
}, {
    country: "US",
    nouns: ["Jennifer", "Bob", "Alice"]
}]
module.exports = {Question,nounsBasedonCountry}