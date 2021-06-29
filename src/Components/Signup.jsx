import React,{useState,useContext} from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { database, storage } from '../firebase';

function Signup(props) {

    const [userName,setUserName]=useState(""); //state in functional componenet 
    const [email,setEmail]=useState("");  
    const [password,setPassword]=useState(""); 
    const [file,setFile]=useState(null); 
    const [error,setError]=useState(null); 
    const [loader,setLoader]=useState(false)
    const {signup}= useContext(AuthContext)
    
    
    const handelSubmit=async (e)=>{
        e.preventDefault();

        try {

            setLoader(false);
            console.log("hello")
            console.log(signup);
            let res=await signup(email,password);
            console.log(res);
            let uid=res.user.uid;
            console.log("hello3")
            const uploadFileListner=storage.ref(`/users/${uid}/profile`).put(file);
            
            console.log("hello1")
            //fn1->progress
            //fn2->error
            //fn3->success
            
            uploadFileListner.on('state_changed',fn1,fn2,fn3);
            console.log("hello2")

            function fn1(snapshot){
                let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
                console.log(progress);
            }

            function fn2(error){
                setError(error);
                setLoader(true);
            }

            async function fn3(snapshot){
                let downloadUrl=await uploadFileListner.snapshot.ref.getDownloadURL();

                database.users.doc(uid).set({
                    email:email,
                    userId:uid,
                    userName,
                    createdAt:database.getUserTimeStamp(),
                    profileUrl:downloadUrl
                })
                setLoader(false);
                props.history.push("/")
            }
            
        } catch (error) {
            setError(error);
            setLoader(true);
        }
    }

    const handelFileSubmit=(e)=>{
        let file=e?.target?.files[0];

        if(file!=null){
            console.log(e.target.files[0]);
            setFile(file);
        }
    }

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div>
                    <label htmlFor="">UserName</label>
                    <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>

                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>

                <div>
                    <label htmlFor="">Profile Image</label>
                    <input type="file" accept="image/*" onChange={(e)=>{handelFileSubmit(e)}} />
                </div>
                <button type="submit" disabled={loader}>Signin</button>
            </form>
        </div>
    )
}

export default Signup
