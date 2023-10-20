import { Button, TextField } from "@mui/material"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function JoinRoomPage(props){

    const navigate = useNavigate();

    const [roomDetails, setRoomDetails] = useState({
        roomCode: "",
        error: "",
      });

    function textFieldChangeHandler(e){
        setRoomDetails({
            roomCode: e.target.value
        })

    }

    function clickHandler(){
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code : roomDetails.roomCode,
            }),
        };
        fetch('http://localhost:8000/api/join-room', requestOptions)
        .then((response) =>{
            if (response.ok){
                navigate(`/room/${roomDetails.roomCode}`)
            } else{
                setRoomDetails({
                    error:"Room not found."});
            }
        });
    }

    return(
        <Grid container spacing = {1} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='h4' component='h4'>
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    error={roomDetails.error}
                    label='Code'
                    placeholder='Enter a Room Code'
                    value={roomDetails.roomCode}
                    helperText={roomDetails.error}
                    variant="outlined"
                    onChange={textFieldChangeHandler}
                / >
            </Grid>
            
            <Grid item xs={12}>
            <Button variant="contained" color='primary' onClick={clickHandler}>
                    Enter Room
                </Button>

            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color='secondary' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default JoinRoomPage;