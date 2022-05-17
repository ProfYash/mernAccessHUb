import React, { useState, useEffect, useDeferredValue } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'
import '../login/login.css'
import img from '../../logoswabhav.png'
import Navigation from '../navigation/navigation.js'
function CreateQuestion() {
     
    const roleofadmin = "admin"
    const usernameofadmin = useParams().username

    const [type, updateType] = useState("MCQ")
    const [tech, updateTech] = useState("Node")
    const [details, updateDetails] = useState("React is a ?")
    const [options, updateOptions] = useState([])
    const [option1, updateOption1] = useState("Front End Tech")
    const [option2, updateOption2] = useState("Backend End Tech")
    const [option3, updateOption3] = useState("Both")
    const [option4, updateOption4] = useState("None")
    const [correctAnswer, updateCorrectAnswer] = useState("A")
    const [complexity, updateComplexity] = useState(5)
    const [loginStatus, updateloginStatus] = useState("")
    const handleMySubmit = async (e) => {
        if (type != "" && tech != "") {
            options.push(option1,option2,option3,option4)
            e.preventDefault();
            console.log(options)
            let resp = await axios.post("http://localhost:8888/api/v1/createquestion", { type, tech, details, options, correctAnswer, complexity}).catch(e => {
                console.log(e.message)
                if (e.response.status == 401) {
                    updateloginStatus("Unauthorized")
                    return
                }
                else if (e.response.status == 405) {
                    updateloginStatus("UserAlreadyExist")
                    return
                }
                updateloginStatus("User Created")
            })
            updateOptions([])

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
                                &nbsp;Question Creation
                            </div>
                            <div className="card-body" style={{ backgroundColor: "rgb(150, 112, 70)" }}>
                                <form onSubmit={handleMySubmit}>
                                    <label className="form-group"><b>type:</b> </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={type} onChange={(e) => updateType(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>tech:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={tech} onChange={(e) => updateTech(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>details:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={details} onChange={(e) => updateDetails(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>A:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={option1} onChange={(e) => updateOption1(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>B:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={option2} onChange={(e) => updateOption2(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>C:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={option3} onChange={(e) => updateOption3(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>D:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={option4} onChange={(e) => updateOption4(e.target.value)} className="form-control" /><br /><br />
                                    <label className="form-group"><b>correctAnswer:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={correctAnswer} onChange={(e) => updateCorrectAnswer(e.target.value)} className="form-control" /><br />
                                    <label className="form-group"><b>complexity:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="text" value={complexity} onChange={(e) => updateComplexity(e.target.value)} className="form-control" /><br />
                                    <label for="customRange3"><b>complexity:</b></label>&nbsp;&nbsp;&nbsp;
                                    <input type="range" value={complexity} onChange={(e) => updateComplexity(e.target.value)}  class="custom-range" style={{Color: "orange" }} min="0" max="10" step="1" id="customRange3"></input><br /><br />
                                    
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
export default CreateQuestion