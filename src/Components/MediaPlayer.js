import { Grid, Typography, Card, LinearProgress, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

function MediaPlayer(props){
    const songProgress = (props.time / props.duration) * 100;

    function pauseSong(){
        console.log("inside pause song")
        const requestOptions = {
            method : "PUT",
            credentials : 'include',
            headers : {'Content-Type' : 'application/json'}
        };
        fetch("http://localhost:8000/spotify/pause-song", requestOptions);
    }

    function playSong(){
        console.log("inside play song")
        const requestOptions = {
            method : "PUT",
            credentials : 'include',
            headers : {'Content-Type' : 'application/json'}
        };
        fetch("http://localhost:8000/spotify/play-song", requestOptions);
    }

    function skipSong(){
        const requestOptions = {
            method : "POST",
            credentials : 'include',
            headers : {'Content-Type' : 'application/json'}
        };
        fetch("http://localhost:8000/spotify/skip-song", requestOptions);
    }

    return(
        <Card>
            <Grid container alignItems='center'>
                <Grid item align ='center'xs ={4}>
                <img src={props.image_url} alt="No Song Playing" height="100%" width="100%" />    
                </Grid>
                <Grid item align ='center'xs ={8}>
                    <Typography component='h5' variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color='textSecondary' variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton 
                        onClick={() => {
                            props.is_playing ? pauseSong() : playSong()}}>
                            {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton onClick={ () => skipSong()}>
                            <SkipNextIcon /><br />
                        </IconButton>
                        <br />
                        <span style={{ fontSize: '13px' ,fontFamily: 'Arial, sans-serif'}}>
                            Count of Votes to Skip: {props.votes} / {props.votes_required}
                            </span>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
    </Card>
    );

}

export default MediaPlayer;












