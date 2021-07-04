import react,{useState,useContext} from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import {Container,Grid,TextField,Paper,makeStyles,Button,Card,CardContent, CardMedia,CardActions,Typography} from "@material-ui/core";
import {Link} from "react-router-dom"

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

    const useStyles=makeStyles({
        centreDivs:{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            width:"100vw",
            alignItems:"center"
        },
        crousel:{
            height:"10rem",
            backgroundColor:"lightgrey"
        },
        alignCentre:{
            justifyContent:"center"
        },
        images:{
            height: "6rem",
            backgroundSize: "contain"
        },
        centerElements: {
            display: "flex",
            flexDirection: "column",
        },
        mb:{
            marginBottom:"0.5rem"
        },
        fullWidth: {
            width: "100%"
        }
    })
    let classes=useStyles();
    return (
        <div className={classes.centreDivs}>
            <Container>
                <Grid container className={classes.alignCentre} spacing={2}>
                    <Grid items sm={4}>
                        <Paper className={classes.crousel}>Crousel</Paper>
                    </Grid>
                    <Grid items sm={4}>
                        <Card>
                            <CardMedia 
                            className={classes.images}
                            image="data:image/png;base64,https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AInstagram_logo.svg&psig=AOvVaw1f-w3SSN8N8713E4uZhnCK&ust=1625506629271000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCODx-Zv6yfECFQAAAAAdAAAAABAN">
                            </CardMedia>
                            <CardContent className={classes.centerElements}>
                                <TextField className={classes.mb} value={email} onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" label="Enter Email" type="email" variant="outlined" />
                                <TextField className={classes.mb} value={password} onChange={(e)=>{setPassword(e.target.value)}} id="outlined-basic" label="Password" type="password" variant="outlined" />
                                <LinkButton content="Forget Password?" route="/signup"></LinkButton>
                            </CardContent>
                            <CardActions>
                                <Button className={classes.fullWidth} variant="contained" onClick={handelSubmit} color="primary">Login</Button>
                            </CardActions>
                        </Card>
                        <Card variant="outlined">
                            <Typography style={{textAlign:"center"}}>
                                Don't have an account
                                <LinkButton content="Signup" route="/signup"></LinkButton>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}


function LinkButton(props) {
    return (
        <Button variant="text" style={{color:"blue"}}>
            <Link to={props.route}>{props.content}</Link>
        </Button>
    )
}


export default Login;
