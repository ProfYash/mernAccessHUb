import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Navigation from "../navigation/navigation";
function AllUsers() {
    const role = "admin"
    const user = useParams().username
    const [allUsers, updateallUsers] = useState({})
    const [loginStatus, updateloginStatus] = useState("")
    let navigate = useNavigate();
    const loadUsers = async (e) => {

        let resp = await axios.get("http://localhost:8888/api/v1/getallusers").catch(e => {
            console.log(e.message)
            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
        })
        if (resp.data != null) {
            console.log(resp.data)
            updateallUsers(resp.data)
        }
    }
    useEffect(() => {
        loadUsers();
    }, [])
    let cardofuser
    if (allUsers != null) {
        console.log(allUsers)
        console.log("generating Cards")
        cardofuser = Object.values(allUsers).map(u => {
            { console.log(u) }
            return (
                <div className="card" style={{ width: "50%", marginBottom: "50px" }}>
                    <div className="card-header" style={{ backgroundColor: "orange" }}>
                       Username: &nbsp; {u.credentials.username}
                    </div>
                    <div className="card-body" key={u.id}>
                        
                        Full Name: &nbsp;{u.fname}&nbsp;{u.lname}<br />
                        Country: &nbsp;{u.country}<br />
                        Frontend:&nbsp;{u.stack.frontend}<br />
                        Backend:&nbsp;{u.stack.backend}<br />
                        DataBase:&nbsp;{u.stack.db}<br />
                        Score:&nbsp;{u.score}<br />
                        Out off Score:&nbsp;{u.outoffscore}<br />
                    

                    </div>
                </div>)
        })
    }
    console.log(cardofuser)
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
                {cardofuser}
            </div>
        </div>
    )
}
export default AllUsers