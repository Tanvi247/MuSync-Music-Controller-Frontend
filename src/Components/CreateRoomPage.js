import { Button, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material'
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function CreateRoomPage(props) {
    const navigate = useNavigate();

    const [votes_to_skip, setVotesToSkip] = useState(props.votes_to_skip);
    const [guest_can_pause, setGuestCanPause] = useState(props.guest_can_pause);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { roomCode } = useParams();
    
    const title = props.update ? "Update Room" : "Create Room";
    

    function votesChangeHandler(e) {
        setVotesToSkip(e.target.value);
    }

    function guestCanPauseChangeHandler(e) {
        setGuestCanPause(e.target.value);
    }

    function roomButtonHandler() {
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: votes_to_skip,
                guest_can_pause: guest_can_pause
            }),
        };
        fetch('http://localhost:8000/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                navigate(`/room/${data.code}`);
            });
        }
    
    function renderCreateButton() {
        return (
            <Grid container spacing={1}>            
            <Grid item xs={12} align="center">
                <Button color='secondary' variant='contained' onClick={roomButtonHandler}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
            <Button color='primary' variant='contained' to='/' component={Link}>
                Back
            </Button>
        </Grid>
        </Grid>
        );
    }

    function renderUpdateButton() {
        return (
            <Grid item xs={12} align="center">
                <Button
                    color='primary'
                    variant='contained'
                    onClick={updateButtonHandler}
                >
                    Update Room
                </Button>
            </Grid>
        );
    }

    function updateButtonHandler(props) {
    console.log('guest_can_pause:', guest_can_pause);
    console.log('votes_to_skip:', votes_to_skip);
    console.log('roomCode:', roomCode);

    const requestOptions = {
        method: "PATCH",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            votes_to_skip: votes_to_skip,
            guest_can_pause: guest_can_pause,
            code: roomCode
        }),
    };

    fetch('http://localhost:8000/api/update-room', requestOptions)
        .then((response) => {
            if (response.ok) {
                setSuccessMsg("Room updated successfully!")
            } else {
                setErrorMsg('Error Updating Room...')
            }
        })
        .catch((error) => {
            setErrorMsg('Error Updating Room: ' + error.message);
        });
}


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={errorMsg !== "" || successMsg !== ""}>
                    {successMsg !== "" ? 
                    (<Alert severity='success' onClose={() => {setSuccessMsg("")}} >{successMsg}</Alert>) 
                    : (<Alert severity='error' onClose={() => {setErrorMsg("")}}>{errorMsg}</Alert>)}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row defaultValue={props.guest_can_pause.toString()} onChange={guestCanPauseChangeHandler}>
                        <FormControlLabel
                            value="true"
                            control={<Radio color='primary' />}
                            label="Play/Pause"
                            labelPlacement='bottom'
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color='secondary' />}
                            label="No Control"
                            labelPlacement='bottom'
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type='number'
                        defaultValue={votes_to_skip}
                        onChange={votesChangeHandler}
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                    />
                    <FormHelperText>
                        Votes required to skip song
                    </FormHelperText>
                </FormControl>
            </Grid>
            {props.update ? renderUpdateButton() : renderCreateButton()}
            
        </Grid>
    );
}

CreateRoomPage.defaultProps = {
    votes_to_skip: 2,
    guest_can_pause: true,
    update: false,
    roomCode: null,
};

export default CreateRoomPage;
