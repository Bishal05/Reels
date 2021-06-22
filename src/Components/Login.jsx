import react,{useState,useEffect} from 'react'
import auth from '../firebase';

function Login() {

    const [email,setEmail]=useState(""); //state in functional componenet 
    const [password,setPassword]=useState(""); 
    const[user,setUser]=useState(null);
    const [error,setError]=useState(false)
    const [loader,setLoader]=useState(false)
    const [mainLoader,setMainLoader]=useState(true)

    const handelSubmit=async()=>{
        try {
            setLoader(true);
            const resp=await auth.signInWithEmailAndPassword(email,password);
            console.log(resp.user);
            setUser(resp.user);
            setLoader(false);
        } catch (error) {
            setError(true);
            setLoader(false);
        }
        setEmail("");
        setPassword("");
    }

    const handelInputEmail=(e)=>{
        setEmail(e.target.value); //setting state 
    }

    const handelInputPassword=(e)=>{
        setPassword(e.target.value);
    }

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user);
            setMainLoader(false);
        })
    },[])
    return (
        <>
        {mainLoader==true?<h1>Wait for a second</h1>:
        loader==true?<h1>Loading....</h1>:
        user!=null?<h1>user logedin {user.uid}</h1>:
        <>
            <h1>FireBase Login</h1>
            <input type="email" value={email} onChange={handelInputEmail}/>
            <input type="password" value={password} onChange={handelInputPassword}/>
            <button onClick={handelSubmit}>Submit</button>
        </>
        }
        </>
    )
}

export default Login;
