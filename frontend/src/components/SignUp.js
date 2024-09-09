import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Restrict navigation to Signup page when logged in
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const collectData= async()=>{
        // console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register',{  // This line sends an HTTP POST request to the URL 
            method:'post',
            body: JSON.stringify({name, email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result))
            navigate('/');
        
    }
    return(
        <div className="signup">
            <h1>Register</h1><hr className="horizontal"/>
            <input className="input-box" type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
            <input className="input-box" type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
            <input className="input-box" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button onClick={collectData} className="signUpButton" type="button ">Sign Up</button>
        </div>
    )
}

export default SignUp;