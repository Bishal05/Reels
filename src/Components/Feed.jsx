import React,{useContext,useState} from 'react'
import {AuthContext} from "../Contexts/AuthContext"

function Feed() {
    const [loading,setLoader]=useState(false);
    
    const {signout} =useContext(AuthContext);

    const handelLogout=async()=>{
        try {
            setLoader(true);
            await signout();
            setLoader(false);    
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
        
    }
    return (
        <div>
            <h1>Feed</h1>
            <button type="submit" onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default Feed
