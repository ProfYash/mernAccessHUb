import React, { useState, useEffect, useDeferredValue } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import '../login/login.css'
import img from '../../logoswabhav.png'
import Navigation from '../navigation/navigation.js'
function CreateUser() {
    const roleofadmin = "admin"
    const usernameofadmin = useParams().username

    const [username, updateUsername] = useState("kanan")
    const [password, updatePassword] = useState("hi")
    const [fullname, updateFullName] = useState("kanan s")
    const [role, updateRole] = useState("user")
    const [exprieance, updateExprieance] = useState(10)
    const [country, updateCountry] = useState("USA")
    const [frontend, updateFrontend] = useState("Angular")
    const [backend, updateBackend] = useState("GO")
    const [db, updateDB] = useState("Postgre")
    const [loginStatus, updateloginStatus] = useState("")
    const handleMySubmit = async (e) => {
        if (username != "" && password != "") {
            e.preventDefault();
            let resp = await axios.post("http://localhost:8888/api/v1/createuser", { username, password, fullname, role, exprieance, country, frontend, backend, db }).catch(e => {
                console.log(e.message)
                if (e.response.status == 401) {
                    updateloginStatus("Unauthorized")
                    return
                }
                else if (e.response.status == 405) {
                    updateloginStatus("UserAlreadyExist")
                    return
                }
                
            })
            updateloginStatus("User Created")
            alert("User Created!")
        }
    }

    if (loginStatus == "Unauthorized") {
        return (
            <div className="d-flex felx-row flex-wrap justify-content-between">
                <h1>
                    <a href="/">Login Again From here</a></h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <div >
                    <Navigation username={usernameofadmin} role={roleofadmin} />
                </div>
                <div className="login">
                    <div className="container">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "orange" }}>
                                <img src={img}></img>
                                &nbsp;User Creation
                            </div>
                            <div className="card-body" style={{ backgroundColor: "rgb(150, 112, 70)" }}>
                                <form onSubmit={handleMySubmit}>
                                    <label className="form-group"><b>Username:</b> </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={username} onChange={(e) => updateUsername(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>Password:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={password} onChange={(e) => updatePassword(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>FullName:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={fullname} onChange={(e) => updateFullName(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>Role:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={role} onChange={(e) => updateRole(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>Exprieance:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={exprieance} onChange={(e) => updateExprieance(e.target.value)} className="form-control" /><br />
                                    <label for="customRange3"><b>Exprieance:</b></label>&nbsp;&nbsp;&nbsp;
                                    <input type="range" value={exprieance} onChange={(e) => updateExprieance(e.target.value)}  class="custom-range" style={{Color: "orange" }} min="0" max="20" step="0.1" id="customRange3"></input><br /><br />
                                    <label className="form-group"><b>Country:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={country} onChange={(e) => updateCountry(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>FrontEnd:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={frontend} onChange={(e) => updateFrontend(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>Backend:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={backend} onChange={(e) => updateBackend(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>DataBase:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={db} onChange={(e) => updateDB(e.target.value)} className="form-control" /><br /><br />
                                    <button className="btn btn-primary" style={{ backgroundColor: "orange" }}>Submit</button><br /><br />
                                    <label className="form-group"><b>{loginStatus}</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default CreateUser