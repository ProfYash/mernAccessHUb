import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Navigation from "../navigation/navigation";
function UserDashboard() {
    const role = "user"
    const user = useParams().username
    let navigate = useNavigate();
    return (
        <div>
            <Navigation username={user} role={role} />
        </div>

    )
}
export default UserDashboard