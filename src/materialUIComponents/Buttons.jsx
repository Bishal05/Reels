import React from 'react'
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core"
function Buttons() {
    return (
        <div>
            <h2>Material UI Buttons</h2>
            <Button variant="contained">Hello</Button>
            <Button variant="outlined">Hello</Button>
            <Button variant="text">Hello</Button>

            <h2>Material UI buttons with colors</h2>
            <Button variant="contained" color="primary">Hello</Button>
            <Button variant="outlined" color="secondary">Hello</Button>
            <Button variant="outlined" style={{backgroundColor:"lightgreen",marginRight:'8px'}}>Hello</Button>

            <h2>MAterial UI icons inside butto</h2>
            <Button variant="contained" color="primary" startIcon={<SendIcon></SendIcon>}>Send</Button>
            <Button variant="contained" color="primary" endIcon={<DeleteIcon></DeleteIcon>}>Delete</Button>

            <h2>Icons without button</h2>
            <IconButton>
                <DeleteIcon></DeleteIcon>
            </IconButton>
            <IconButton>
                <SendIcon></SendIcon>
            </IconButton>
        </div>
    )
}

export default Buttons
