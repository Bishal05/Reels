import React,{useEffect} from 'react'
import v1 from "./pexels-anna-shvets-6047897.mp4"
import v2 from "./pexels-artem-podrez-7234468.mp4"
import v3 from "./pexels-roman-odintsov-7311577.mp4"
import v4 from "./production ID_3755425.mp4"
import "./Intersection.css"
function Intercetion() {

    const callback=(entries)=>{
        console.log(entries);
        entries.forEach((entry)=>{
            let child=entry.target.children[0];
            console.log(child.id);
        })
    }

    useEffect(() => {
        
        let conditionObject={ // conditons to be fullfilled to run callback
            root:null, // whole ui
            threshold:"0.9" // when 90% of video is on the ui
        }

        let observer=new IntersectionObserver(callback,conditionObject); // making intersectionobserver Api object 
        let elements=document.querySelectorAll(".video-container");
        elements.forEach((el)=>{
            observer.observe(el); // observing the videos(whether they fullfill condition or not)
        })
    }, [])
    return (
        <div>
            <div className="video-container">
                <Video src={v1} id="a"></Video>
            </div>
            <div className="video-container">
                <Video src={v2} id="b"></Video>
            </div>
            <div className="video-container">
                <Video src={v3} id="c"></Video>
            </div>
            <div className="video-container">
                <Video src={v4} id="d"></Video>
            </div>
        </div>
    )
}

export default Intercetion


function Video(props) {
    return (
        <video className="video-styles" controls muted="true" id={props.id}>
            <source src={props.src} type="video/mp4"></source>
        </video>
    )
}


