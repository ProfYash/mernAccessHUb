import React, { Component } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import img from '../../logoswabhav.png'
function Navigation({ username, role }) {
    let navigate = useNavigate();
    const handleMyLogout = (e) => {
        console.log("Logout")
        let resp = axios.get('http://localhost:8888/api/auth/logout').catch(e => {
            console.log(e.message)
            if (e.response.status == 401) {

                return
            }
        })

        // console.log(resp.data)
        // e.preventdefault();
        navigate('/')





    }
    if (role == "admin") {
        const displayuserPath = "/AllUser/" + username
        const createUserPath = "/CreateUser/" + username
        const createQuestionPath = "/CreateQuestion/" + username
        const displayquestionPath = "/AllQuestions/" + username

        return (

            <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img}></img> &nbsp;
                        {username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Users" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={createUserPath}>Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={displayuserPath}>Display</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Questions" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={createQuestionPath}>Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={displayquestionPath}>Display</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <div className='pull-right' >
                            <ul class="nav navbar-nav">
                                <form onSubmit={handleMyLogout}>

                                    <button className="btn btn-primary" style={{ backgroundColor: "orange" }}>Logout</button>
                                </form>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        const giveTestPath = "/Test/" + username
        return (

            <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img}></img> &nbsp;
                        {username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={giveTestPath}>Give Test</Nav.Link>


                        </Nav>
                        <div className='pull-right' >
                            <ul class="nav navbar-nav">
                                <form onSubmit={handleMyLogout}>

                                    <button className="btn btn-primary" style={{ backgroundColor: "orange" }}>Logout</button>
                                </form>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}
export default Navigation

