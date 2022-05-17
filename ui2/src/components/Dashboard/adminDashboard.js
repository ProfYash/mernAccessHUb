import React, { useState } from "react";
import axios from "axios";
import Navigation from "../navigation/navigation";
import { useNavigate, useParams } from "react-router-dom";


function AdminDashboard() {
    const role = "admin"
    const user = useParams().username
    console.log(user)
    let navigate = useNavigate();
    return (
        <div>
            <Navigation username={user} role={role} />
        </div>

    )
}
export default AdminDashboard