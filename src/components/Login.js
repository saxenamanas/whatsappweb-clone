import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, provider } from "../firebase";
import Body from './Body';
import "./Login.css";

function Login() {
    const history = useHistory();


const [isLoggedIn,setIsLoggedIn] = useState(false)
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [name,setName] = useState('');

const loginUser = async ()=>{
    try{
        // let res = await auth.signInWithEmailAndPassword(email,password);
        let prov = provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        let res = await auth.signInWithPopup(prov);
        if(res.user.email){
            setEmail(res.user.email)
            setName(res.user.displayName)
            setIsLoggedIn(true)
        }
    }
    catch(e){
        console.log(e.message);
    }

}
if(isLoggedIn)
    return <Body email={email} username={name}/>
else
    return (
        <div>
            <div className="body__wrapper">
                <div className="body__sideImage">
                    {/* <div className="sideImage__greet">
                        Connecting you to the world
                    </div> */}
                </div>
                <div className="body__mainBox">
                    <div className="mainBox__loginBox">
                        <span className="loginBox__heading">Welcome back</span>
                        <input type="email" value={email} onChange={event=>{setEmail(event.target.value)}} placeholder="Email" className="login__field"></input>
                        <input type="password" value={password} onChange={event=>{setPassword(event.target.value)}} className="login__field" placeholder="Password"></input>
                        <button onClick={loginUser} className="login__button">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
