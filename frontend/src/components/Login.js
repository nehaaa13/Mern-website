import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const handleLogin = async() => {
        let result = await fetch('http://localhost:5000/login',{  // This line sends an HTTP POST request to the URL 
            method:'post',
            body: JSON.stringify({email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json()
        console.log(result);
        if(result.name){
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        }
        else{
            alert("Credentials Invalid");
        }
        
    }

    return (
        <div className='login'>
            <h1>Login</h1><hr className="horizontal" />
            <input className="input-box" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />

            <input className="input-box" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin} className="signUpButton" type="button ">Login</button>
        </div>
    )
}
export default Login;