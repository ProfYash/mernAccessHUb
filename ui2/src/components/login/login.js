import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import './login.css'
import Navigation from "../navigation/navigation";
import img from '../../logoswabhav.png'

function Login() {
    const [username, updateUsername] = useState("yash123")
    const [password, updatePassword] = useState("hi")
    const [loginStatus, updateloginStatus] = useState("")
    const navigate = new useNavigate()
    const handleMyLogin = async (e) => {
        if (username != "" && password != "") {
            e.preventDefault();
            let resp = await axios.post("http://localhost:8888/api/v1/login", { username, password }).catch(e => {
                console.log(e.message)
                if (e.response.status == 400) {
                    updateloginStatus("login failed")
                    return
                }
            })
            console.log(resp.data)
            if (resp.data.role == "admin") {
                console.log(resp.data.role + " found")
                navigate(`/AdminDashboard/${username}`)

            } else {
                console.log(resp.data.role + " found")
                navigate(`/dashboard/${username}`)
            }
        }
    }
    return (
        <div>
            <div className="login">
                <div className="container">
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: "orange" }}>
                            <img src={img}></img>
                            &nbsp;Login Page
                        </div>
                        <div className="card-body" style={{ backgroundColor: "rgb(150, 112, 70)" }}>
                            <form onSubmit={handleMyLogin}>
                                <label className="form-group"><b>Username:</b> </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" value={username} onChange={(e) => updateUsername(e.target.value)} className="form-control" /><br /><br />
                                <label className="form-group"><b>Password:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" value={password} onChange={(e) => updatePassword(e.target.value)} className="form-control" /><br /><br />
                                <button className="btn btn-primary" style={{ backgroundColor: "orange" }}>Login Here</button><br /><br />
                                <label className="form-group">{loginStatus}</label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login