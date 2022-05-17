import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Navigation from "../navigation/navigation";
function Test() {
  
    const role = "user"
    const user = useParams().username
    let navigate = useNavigate();
    const [loginStatus, updateloginStatus] = useState("")
    const loadTest = async (e) => {

        let resp = await axios.get("http://localhost:8888/api/v1/getTests",{user}).catch(e => {
            console.log(e.message)
            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
        })
        if (resp.data != null) {
            console.log(resp.data)
            
        }
    }
    useEffect(() => {
        loadTest();
    }, [])
    return (
        <div>
            <div>
                <Navigation username={user} role={role} />
            </div>
            <div>
                Test details here
            </div>

        </div>


    )
}
export default Test