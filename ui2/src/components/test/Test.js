import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Navigation from "../navigation/navigation";
function Test() {

    const role = "user"
    const user = useParams().username
    let navigate = useNavigate();
    const [loginStatus, updateloginStatus] = useState("")
    const [alltests, updatealltests] = useState("")
    const [userScore, updateuserScore] = useState(-100)
    const loadTest = async (e) => {

        let resp = await axios.get("http://localhost:8888/api/v1/getTests").catch(e => {
            console.log(e.message)
            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
        })
        if (resp.data != null) {
            console.log(resp.data)
            updateuserScore(resp.data.score)
            updatealltests(resp.data.tests)
        }
    }
    useEffect(() => {
        loadTest();
    }, [])
    let cardoftest
    if (alltests != null) {
        cardoftest = Object.values(alltests).map(u => {
            // console.log(alltests)
            return (
                <div className="card" style={{ width: "50%", marginBottom: "50px" }}>
                    <div className="card-header" style={{ backgroundColor: "orange" }}>
                        Test Tech: &nbsp; {u.tech}
                    </div>
                    <div className="card-body" key={u.testid}>
                        Your Current Score:&nbsp;{u.score}<br /><br />
                        <button className="btn btn-primary" style={{ backgroundColor: "orange" }} onClick={() => navigate(`/Start/${user}/${u.testid}`)}>Start Test</button>
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
            <div>
                <Navigation username={user} role={role} />
            </div>
            <div className="d-flex felx-row flex-wrap justify-content-between" >

                <div className="card" style={{ width: "50%", marginBottom: "50px" }}>
                    <div className="card-header" style={{ backgroundColor: "orange" }}>
                        Your Current Score:
                    </div>
                    <div className="card-body">

                        {userScore}

                    </div>
                </div>
            </div>
            <div className="d-flex felx-row flex-wrap justify-content-between">
                {cardoftest}
            </div>

        </div>


    )
}
export default Test