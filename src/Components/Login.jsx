import react,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import auth from '../firebase';

function Login(props) {
    let {login}=useContext(AuthContext);
    const [email,setEmail]=useState(""); //state in functional componenet 
    const [password,setPassword]=useState(""); 
    const [loader,setLoader]=useState(false)

    const handelSubmit=async(e)=>{
        e.preventDefault()
        try {
            setLoader(true);
            await login(email,password);
            // console.log(resp.user);
            setLoader(false);
            props.history.push("/");
        } catch (error) {
            setLoader(false);
            setEmail("");
            setPassword("");
        }
    }


    return (
        
        <>
            <h1>FireBase Login</h1>
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handelSubmit} disabled={loader}>Submit</button>
        </>
    )
}

export default Login;
