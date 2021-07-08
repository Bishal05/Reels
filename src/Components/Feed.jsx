import React,{useContext,useState,useEffect} from 'react'
import {AuthContext} from "../Contexts/AuthContext"
import {makeStyles,Button} from "@material-ui/core"
import MovieIcon from '@material-ui/icons/Movie';
import { Avatar } from '@material-ui/core';
import { database, storage } from '../firebase';
import uuid from 'react-uuid';


function Feed() {
    
    //styles
    const useStyles=makeStyles((theme)=>({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        }
    }))

    // contexts from AuthContext 
    const {signout,currentUser} =useContext(AuthContext);

    const [pageloading,setPageLoader]=useState(true);
    const [user,setUser]=useState();
    const [isLiked,setLiked]=useState(false);
    const [videos,setVideos]=useState([]);


    // useEffect to get user data from database with the help of currentUser
    useEffect(async() => {
        const userRef=database.users;
        const userPromise=await userRef.doc(currentUser.uid).get();
        const userData=userPromise.data();
        setUser(userData);
        setPageLoader(false);
    }, [])

    //useEffect to get videos
    useEffect(async()=>{
        let unsubscribed=await database.posts.orderBy("createdAt","desc").onSnapshot(async(snapshot)=>{
            // console.log(snapshot);
            let videos=snapshot.docs.map((doc)=>doc.data())
            // console.log(videos);

            let videoArr=[];
            for(let i=0;i<videos.length;i++){
                let videoUrl=videos[i].url;
                // console.log(videoUrl);
                let auid=videos[i].auid;
                let id=snapshot.docs[i].id;
                let userObj=await database.users.doc(auid).get();
                let userProfileUrl=userObj.profileUrl;
                let userName=userObj.username;
                videoArr.push({
                    videoUrl,
                    userProfileUrl,
                    userName,
                    puid:id
                });
            }
            setVideos(videoArr);
        })
        return unsubscribed
    },[])

    // Logout function
    const handelLogout=async()=>{
        try {
            setPageLoader(true);
            await signout();
            setPageLoader(false);    
        } catch (error) {
            console.log(error);
            setPageLoader(false);
        }   
    }

    // handels input
    const handelInputFile=(e)=>{
        e.preventDefault();
        let file=e?.target?.files[0];
        if(file!=null){
            console.log(e.target.files[0]);
        }

        if(file.size/(1024*1024)>20){
            alert("The selcted File is very large");
            return;
        }

        // saving post to the storage and then making post in db and updating user db
        setPageLoader(true);
        
        
        //progess
        const f1=(snapshot)=>{
            const progess=snapshot.bytesTransferred / snapshot.totalBytes;
            console.log(progess);
        }
        
        //error
        const f2=()=>{
            alert("There was an error uploading the files")
            return;
        }
        
        //success
        const f3=()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(async(url)=>{
                
                // post document to be put in post collection
                let obj={
                    comments:[],
                    likes:[],
                    url,
                    auid:currentUser.uid,
                    createdAt:database.getUserTimeStamp()
                }
                // putting the post obj in post Collection
                let postObj=await database.posts.add(obj);
                console.log(postObj);
                
                // updating the user postid with the new post ids
                await database.users.doc(currentUser.uid).update({
                        postIds:[...user.postIds,postObj.id]
                    })
                    setPageLoader(false);
                })
            }
            
            const uploadTask=storage.ref(`/posts/${uuid()}`).put(file);
            uploadTask.on('state_changed',f1,f2,f3);
    }
    
    // const handelLike=async(puid)=>{
        //     let postRef=await database.post.doc(puid).get();
        //     let post=postRef.data();
        //     let likes=post.likes;
        
    //     if(isLiked==false){
        //         database.post.doc(puid).update({
            //             "likes":[...likes,currentUser.uid]
            //         })
            //     }else{
    //         let likes=post.likes.filter((likeUid)=>{
    //             return likeUid!=currentUser.uid;
    //         })
    //         database.post.docs(puid).update({
    //             "likes":likes
    //         })
    //     }
    //     setLiked(!isLiked);
    // }

    // to use styles 
    const classes=useStyles();
    
    return (
        pageloading==true?<div>Loading.....</div>:
        <div>
            <div className="navbar">
                <Avatar alt="Remy Sharp" src={user.profileUrl} />
                <Button type="submit" variant="contained" color="primary" onClick={handelLogout}>Logout</Button>
            </div>

            <div className="uploadImage">
                <div className={classes.root}>
                    <input accept="file" onChange={handelInputFile} className={classes.input} id="icon-button-file" type="file"/>
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="primary" component="span" disabled={pageloading} startIcon={<MovieIcon></MovieIcon>}>
                            Upload
                        </Button>
                    </label>
                </div>
            </div>
            <div className="feed">
                {videos.map((videoObj)=>{
                    console.log(videoObj)
                    return(
                        <div className="video-container">
                            <Video
                                src={videoObj.videoUrl}
                                id={videoObj.puid}
                                userName={videoObj.userName}
                            ></Video>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Video(props) {
    console.log(props.userName);
    return (
        <>
            <video style={{
                height: "86vh",
                marginBottom: "5rem",
                marginTop:" 2rem",
                border: "1px solid red"
            }} autoPlay muted="true" id={props.id} >
                <source src={
                    props.src
                } type="video/mp4"

                >
                </source>
            </video >
            {props.userName}
        </>
    )
}

export default Feed
