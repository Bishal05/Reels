import React from 'react'
import {Container,Paper,makeStyles} from "@material-ui/core"
function Grid() {

    let useStyles=makeStyles({
        size:{
            height:"12vh",
            backgroundColor:"lightgrey"
        },
        color:{
            color:"green"
        }
    })

    let classes=useStyles();
    return (
        <div>
            <Container>
                <Grid container>
                    <Grid item xs={5} sm={3} md={5} lg={10}>
                        <Paper className={classes.size}>Hello</Paper>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={5} sm={3} md={5} lg={2}>
                        <Paper className={classes.size}>Hello</Paper>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={5} sm={6} md={2}>
                        <Paper className={classes.size}>Hello</Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Grid
