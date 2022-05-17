const uuid = require('uuid')
class Test {
    constructor(tech) {
        this.testid = uuid.v4()
        this.tech = tech
        this.questions = []
        this.outoffscore = 0
        this.score = 0
        this.attempt=false
    }
    insertQuestiontoTest(question) {
        if (question.tech == this.tech) {
            this.questions.push(question)
            this.outoffscore=this.outoffscore+question.totalMark
        }
    }
}
module.exports = {Test}