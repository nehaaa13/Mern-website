import React, { useEffect } from 'react';
import {Link, Navigate, json, useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const navigate = useNavigate();
    const auth = localStorage.getItem('user'); 
    const logout =()=>{
        localStorage.clear();
    }
    return(
        <div>
            <img
            alt=''
            className='logo'
            src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png'/>
            { auth ? <ul className="nav-ul">
                <li className=""><Link to="/">Products</Link></li>
                <li className=""><Link to="/add">Add</Link></li>
                <li className=""><Link to="/update">Update</Link></li>
                <li className=""><Link to="/profile">Profile</Link></li>
                <li className=""><Link  onClick={logout} to="/signup">logout({JSON.parse(auth).name})</Link></li>
                
            </ul>
                :
                <ul className="nav-ul nav-right">
                <li><Link to="/signup">SignUp</Link></li>
                <li><Link to="/login">Login</Link></li> 
                </ul>
            }

        </div>
    )
}

export default Nav;