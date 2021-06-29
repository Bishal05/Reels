import React,{useState,useEffect} from 'react'
import auth from '../firebase'

export const AuthContext=React.createContext();
export function AuthProvider({children}){
    const [currentUser,setUser]=useState();
    const [loader,setLoader]=useState(true);

    async function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    async function signOut(){
        return auth.signOut();
    }

    async function signup(email,password){
        console.log(auth);
        return await auth.createUserWithEmailAndPassword(email,password);
    }

    useEffect(() => {
        
        const unsubscribe=auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoader(false);
        })

        return unsubscribe;
    }, [])

    const value={
        login,
        signOut,
        currentUser,
        signup
    }

    return(
        <AuthContext.Provider value={value}>
            {!loader && children}
        </AuthContext.Provider>
    )
}