import {Form, Button, Col, Row} from 'react-bootstrap'
import React, {useContext} from 'react'
import '../../css/sign-up.scss'
import ToDo from '../todo/todo-connected'
import IF from '../todo/if'
import {authContext} from '../../context/authContext'
import useForm from '../Hooks/use-form' 

const SignUp = () => {
    const auContext = useContext(authContext) 
    const { handleInputChange, item} = useForm()

    const handleSignUpData = (e) => {
        e.preventDefault()
        e.target.reset()
        item.role = e.target.cars.value
        console.log(item)
        auContext.signUp(item)
    }

    return (
        <>
        <IF condition={!auContext.loggedIn  }>

        <div className="sign-up">
            <Form onSubmit={handleSignUpData} >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    </Form.Label>
                    <Col sm={10}>
                     <h3>Sign Up</h3>
                        <Form.Control required name="username"  placeholder="username"   onChange={handleInputChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control required name="email" type="email" placeholder="Email" onChange={handleInputChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control required name="password" type="password" placeholder="Password"  onChange={handleInputChange}  />
                <select id="cars" name="cars">
                    <option value="user">user</option>
                    <option value="editor">editor</option>
                    <option value="admin">admin</option>
                </select>
                    </Col>
                </Form.Group >
                <Form.Group as={Row} className="signup-button">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Sign Up</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
        </IF>

        <IF condition={auContext.loggedIn}>

            <ToDo/>

        </IF>
        </>
    )
}

export default SignUp