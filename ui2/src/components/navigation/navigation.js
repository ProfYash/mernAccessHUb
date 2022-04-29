import React, { Component } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import img from '../../logoswabhav.png'
function Navigation({ username, role }) {

    if (role == "admin") {
        const displayPath="/AllUser/"+username
        const createUserPath="/CreateUser/"+username
        return (

            <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                    <img src={img}></img> &nbsp;
                        {username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                           
                            <NavDropdown title="Users" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={createUserPath}>Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={displayPath}>Display</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Questions" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Display</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                       
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        return (

            <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                    <img src={img}></img> &nbsp;
                        {username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Give Test</Nav.Link>
                        </Nav>
                       
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}
export default Navigation

