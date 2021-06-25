import React, {useEffect} from 'react';
import base64 from 'base-64'
import jwt from 'jsonwebtoken'
import cookie from 'react-cookies'
 
export const authContext = React.createContext();
const API = 'https://api-js401.herokuapp.com'

class AuthProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            logIn: this.logIn,
            logOut: this.logOut,
            validateToken: this.validateToken,
            error: '',
            user: {}
        }
    }

    logIn = async (username, password) => {
        // send username:password encoded ==> then add them to Authorization ==> then prefixed as Basic xxxx
        const encoded =  base64.encode(`${username}:${password}`)
        const results = await fetch(`${API}/signin`, {
            method: 'post',
            headers: {Authorization: `Basic ${encoded}`}
        })
        let data = await results.json()
        this.validateToken(data.token)
        
    }

    validateToken = (token) => {
        const user = jwt.decode(token)
        if(user) {
            this.setAuthState( true ,user, token)
        } else {
            this.setState({error: 'Invalid LogIn'})
        }
        console.log(user);
    }

    setAuthState = (loggedIn, user, token) => {
        this.setState({loggedIn, user})
        cookie.save('auth-token', token)
    }

    logOut = () => {
        this.setAuthState(false, {}, null)

    }

    render() {
        return (
            <authContext.Provider value={this.state}>
                {this.props.children}
            </authContext.Provider>
        )
    }

}

export default AuthProvider
