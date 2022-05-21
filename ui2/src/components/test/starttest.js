import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Navigation from "../navigation/navigation";
function StartTest() {
    let navigate = useNavigate();
    const [correctAnswer, updateallcorrectAnswer] = useState()
    const username = useParams().username
    const testid = useParams().testid
    const [loginStatus, updateloginStatus] = useState("")
    const [questions, updateallquestions] = useState([])
    const [currentquestion, updatecurrentquestion] = useState()
    let correctAnswerNew = []
    const handleMySubmit = async (e) => {
        e.preventDefault();
       let resp= await axios.post("http://localhost:8888/api/v1/submitTest", { questions }).catch(e => {

            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
            else if (e.response.status == 405) {
                updateloginStatus("UserAlreadyExist")
                return
            }

        })
        console.log(resp.data)
        alert("Test Submitted")
        navigate(`/Test/${username}`)
    }
    const loadQuestions = async (e) => {
        let resp = await axios.post("http://localhost:8888/api/v1/getQuestions", { username, testid }).catch(e => {

            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
            else if (e.response.status == 405) {
                updateloginStatus("UserAlreadyExist")
                return
            }

        })
        if (resp.data != null) {

            updateallquestions(resp.data)
        }
    }

    useEffect(() => {
        loadQuestions();
    }, [])

    let cardofquetions
    if (questions != null) {

        console.log(questions)
        cardofquetions = Object.values(questions).map(u => {
            return (
                <div className="card" style={{ width: "50%", marginBottom: "50px" }}>
                    <div className="card-header" style={{ backgroundColor: "orange" }}>
                        <b> Question:</b>
                    </div>
                    <div className="card-body" key={u.id}>
                        {u.details}<br />
                        <div>
                            <input type="radio" value={u.options[0]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} /> A:  {u.options[0]}<br />
                            <input type="radio" value={u.options[1]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} /> B:    {u.options[1]}<br />
                            <input type="radio" value={u.options[2]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} /> C:    {u.options[2]}<br />
                            <input type="radio" value={u.options[3]} name={u.id} onChange={(e) => {
                                u.selectedAnswer = e.target.value
                                console.log(u)
                            }} />D:   {u.options[3]}<br />
                        </div>
                    </div>
                </div>)

        })
    }
    if (loginStatus == "Unauthorized") {
        return (
            <div className="d-flex felx-row flex-wrap justify-content-between">
                <h1>
                    <a href="/">Login Again From here</a></h1>
            </div>
        )
    }
    return (
        <div>
            <div >
                <Navigation username={username} role={"user"} />
            </div>

            <div className="d-flex felx-row flex-wrap justify-content-between">
                {cardofquetions}
            </div>
            <div className="d-flex felx-row flex-wrap justify-content-between">
                <form onSubmit={handleMySubmit}>
                    <button className="btn btn-primary" style={{ backgroundColor: "orange" }}>Submit Here</button><br /><br />
                </form>
            </div>
        </div>
    )
}
export default StartTest