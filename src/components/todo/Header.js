import React, {useContext} from 'react';
import '../../css/header.scss'
import Login from '../auth/login'
import {Navbar, Nav} from 'react-bootstrap'
import {authContext} from '../../context/authContext'

const Header = (props) => {
    const auContext = useContext(authContext)
    return (
        <>
            <Navbar className="header" bg="primary" variant="dark">
                <Navbar.Brand href="#home">ToDo App</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                
                    <Login/>    
        
            </Navbar>
    
        </>
    )
}

export default Header