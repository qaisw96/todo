import React, {useEffect} from 'react';
import base64 from 'base-64'
import jwt from 'jsonwebtoken'
import cookie from 'react-cookies'
import useFetch from '../components/Hooks/use-fetch';
import axios from 'axios'
 
export const authContext = React.createContext();

const API = 'https://api-js401.herokuapp.com'
class AuthProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            signedUp: false,
            logIn: this.logIn,
            signUp: this.signUp,
            logOut: this.logOut,
            validateToken: this.validateToken,
            error: '',
            user: {},
            access: this.accessUser
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
        console.log(data.token);
        // if(!data.token) alert('Invalid LogIn') 
    }

    validateToken = (token) => {
        const user = jwt.decode(token)
        if(user) {
            this.setAuthState( true ,user, token)
            this.setState({user:user })
        } else {
            this.setState({error: 'Invalid LogIn'})
        }
        
        console.log(user);
    }

    setAuthState = (loggedIn, user, token) => {
        this.setState({loggedIn})
        cookie.save('auth-token', token)
    }

    signUp = async (item) => {
        let check = true;

        let toDo= await axios({
            method: "post",
            url: `${API}/signup`,
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            data: item,
        }).catch(e => check = check= false )
        
        console.log(toDo.data);
        console.log(toDo.data);
        if(toDo.data && check) {
            this.setState({signedUp: true})
            alert('Successful SingUp, Now Login by the form above ')
            
        } else {
            this.setState({signedUp: false})
            alert('UnSuccessful SingUp, try again with new username')
        }
        
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
