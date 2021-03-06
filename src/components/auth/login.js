import React from 'react'
import useForm from '../Hooks/use-form'
import {Button} from 'react-bootstrap'
import {useContext, useEffect} from 'react'
import {authContext} from '../../context/authContext'
import cookie from 'react-cookies'
import IF from '../todo/if'

const Login = () => {
    const context = useContext(authContext)
    const { item, handleInputChange,  handleSubmit } = useForm()
    
    const handleData = async (e) => {
        e.preventDefault()
        await context.logIn(item.username, item.password)
        // handleSubmit(e)
        // console.log(item)
    }
    
    // useEffect(() => {
    //     // const token = cookie.load('auth-token')
    //     // if(token) context.validateToken(token)

    // }, [context.user])
    useEffect(() => {
        const token = cookie.load('auth-token')
        if(token) context.validateToken(token)

    }, [])

    return (
        <div>
            <IF condition={!context.loggedIn}>
            <form onSubmit={handleData}> 
                <input required name="username" placeholder="username" onChange={handleInputChange} ></input>
                <input required name="password" placeholder="password" onChange={handleInputChange} ></input>
                <Button type="submit" variant="dark">Login</Button>
            </form>
            </IF>
            <IF condition={context.loggedIn}>
                <Button onClick={context.logOut} type="submit" variant="dark">LogOut</Button>
            </IF>
        </div>
    )
}

export default Login
