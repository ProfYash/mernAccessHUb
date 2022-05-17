import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Navigation from "../navigation/navigation";
function AllQuestions() {
    const role = "admin"
    const user = useParams().username
    const [allQuestions, updateallQuestions] = useState({})
    const [loginStatus, updateloginStatus] = useState("")
    let navigate = useNavigate();
    const loadQuestions = async (e) => {

        let resp = await axios.get("http://localhost:8888/api/v1/getallquestions").catch(e => {
            console.log(e.message)
            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
        })
        if (resp.data != null) {
            // console.log(resp.data)
            updateallQuestions(resp.data)
        }
    }
    useEffect(() => {
        loadQuestions();
    }, [])
    let cardofQuestion
    if (allQuestions != null) {
        // console.log(allQuestions)
        // console.log("generating Cards")
        cardofQuestion = Object.values(allQuestions).map(u => {
            // console.log(u) 
            
            return (
                <div className="card" style={{ width: "50%", marginBottom: "50px" }}>
                    <div className="card-header" style={{ backgroundColor: "orange" }}>
                        Question Id:&nbsp;{u.id}
                    </div>
                    <div className="card-body" key={u.id}>
                        Type: &nbsp;{u.type}<br />
                        Tech:&nbsp;{u.tech}<br />
                        Details:&nbsp;{u.details}<br />
                        Option A:&nbsp;{u.options[0]}<br />
                        Option B:&nbsp;{u.options[1]}<br />
                        Option C:&nbsp;{u.options[2]}<br />
                        Option D:&nbsp;{u.options[3]}<br />
                        Correct Answer:&nbsp;{u.correctAnswer}<br />
                        Complexity:&nbsp;{u.complexity}<br />

                    </div>
                </div>)
        })
    }
    // console.log(cardofQuestion)
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
                <Navigation username={user} role={role} />
            </div>
            <div className="d-flex felx-row flex-wrap justify-content-between">
                {cardofQuestion}
            </div>
        </div>
    )
}
export default AllQuestions