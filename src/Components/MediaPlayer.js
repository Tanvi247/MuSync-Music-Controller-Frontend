import { Grid, Typography, Card, LinearProgress, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

function MediaPlayer(props){
    const songProgress = (props.time / props.duration) * 100;
    console.log(props.image_url)
    return(
        <Card>
            <Grid container alignItems='center'>
                <Grid item align ='center'xs ={4}>
                <img src={props.image_url} alt="Album Cover" height="100%" width="100%" />    
                </Grid>
                <Grid item align ='center'xs ={8}>
                    <Typography component='h5' variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color='textSecondary' variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton>
                            {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
    </Card>
    );

}

export default MediaPlayer;












