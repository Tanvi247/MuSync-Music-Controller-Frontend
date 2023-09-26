import { Button, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import {useCookies} from 'react-cookie'

function CreateRoomPage(props){
    const defaultVotes = 2;
    const [votes_to_skip, setVotesToSkip] = useState(2);
    const [guest_can_pause, setGuestCanPause] = useState('true');    

    function votesChangeHandler(e){
        setVotesToSkip(e.target.value);
    }

    function guestCanPauseChangeHandler(e){
        setGuestCanPause(e.target.value);
    }
    const [cookies, setCookie] = useCookies(['sessionid']);

    function roomButtonHandler(){
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip : votes_to_skip,
                guest_can_pause : guest_can_pause
            }),
        };
        fetch('http://localhost:8000/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data)=>console.log(data));
    }

    


    return(
        <Grid container spacing = {1}>
            <Grid item xs={12} aligncontent={"center"}>
                <Typography component='h4' variant='h4'>
                    Create A Room.
                </Typography>
            </Grid>
            <Grid item xs={12} aligncontent={"center"}>
                <FormControl component={"fieldset"}>
                    <FormHelperText>
                        <div aligncontent={"center"}>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={"true"} onChange={guestCanPauseChangeHandler}>
                        <FormControlLabel
                            value={"true"} 
                            control={< Radio color='primary' />}
                            label = "Play/Pause"
                            labelPlacement='bottom'
                        />
                        <FormControlLabel
                            value={"false"} 
                            control={< Radio color='secondary' />}
                            label = "No Control"
                            labelPlacement='bottom'
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} aligncontent={"center"}>
                <FormControl>
                    <TextField 
                    required={true} 
                    type='number' 
                    defaultValue={defaultVotes} 
                    onChange={votesChangeHandler}
                    inputProps={{min:1, style: {textAlign:"center"}}} />
                    <FormHelperText>
                        <div align="center">
                            Votes required to skip song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} aligncontent={"center"}>
                <Button color='secondary' variant='contained' onClick={roomButtonHandler}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} aligncontent={"center"}>
                <Button color='primary' variant='contained' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage;