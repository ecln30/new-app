













import './nav.css'
import {auth} from '../firebase'
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar({handleShow,SaveText,handlefile,file,onclick}) {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/dashboard");
    }, [user, loading]);
  return (
   <>
      <div className='nav'>
        <h2 onClick={handlefile} >
           File
        </h2>  
        <h2
         onClick={SaveText}
        >Save</h2>  
        <h2 onClick={handleShow}>
        { !user && <Link to='login' className='logLink'>   
          Login
         </Link>}
        </h2>
      </div>
   { onclick && <h1 className='txtfile'>{file}</h1> }
   </> 
)}

export default Navbar

































































