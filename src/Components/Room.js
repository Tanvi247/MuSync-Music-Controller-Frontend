import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import MediaPlayer from "./MediaPlayer";

function Room(props){
    const navigate = useNavigate();

    const [votes_to_skip, setVotesToSkip] = useState(2);
    const [guest_can_pause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [song, setSong] = useState({});

    const { roomCode } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/api/get-room?code=${roomCode}`, { credentials: 'include' })
          .then((response) => {
            if (!response.ok) {
              props.leaveRoomCallback();
              navigate('/');
            }
            return response.json();
          })
          .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
            console.log(isHost);
            if (isHost){
                console.log("inside loop")
                authenticateSpotify();
              }
          });          
      }, [roomCode, props, navigate, isHost]);

      useEffect(() => {    
        const interval = setInterval(() => {
          getCurrentSong();
        }, 1000);

        return () => {
          clearInterval(interval);
        };
      }, []);

    function leaveButtonHandler(){
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            };            
        fetch ('http://localhost:8000/api/leave-room',  requestOptions)
        .then((_response) =>{
            props.leaveRoomCallback();
            navigate('/');
        });
    }

    function updateShowSettings(value) {
        setShowSettings(value);
    }

    function renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    function renderSettings(){
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        votes_to_skip={votes_to_skip} 
                        update={true}                         
                        guest_can_pause={guest_can_pause} 
                        roomCode={roomCode}
                        //updateCallback={ }
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color='secondary' onClick={() => updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    function getCurrentSong(){
            fetch("http://localhost:8000/spotify/current-song", { credentials: 'include' })
            .then((response) => {
                if (!response.ok){
                    return {}
                }else{
                    return response.json();
                }
            })
            .then((data) => {
                setSong(data);
                console.log(data);
            });
        }

    function authenticateSpotify(){
        fetch('http://localhost:8000/spotify/is-authenticated',{ credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
            setSpotifyAuthenticated(data.status);
            console.log(data.status)
            if (!data.status){
                console.log("get auth url executed");
                fetch('http://localhost:8000/spotify/get-auth-url',{ credentials: 'include' })
                .then((response) => response.json())
                .then((data) =>{
                    console.log(data.url)
                    window.location.replace(data.url);
                });
            }
        });
    }

    if (showSettings) {
        return renderSettings();
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <MediaPlayer {...song} />
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveButtonHandler}
                >
                    Leave Room
                </Button>
            </Grid>
            {showSettings ? renderSettings() : null}
        </Grid>
    );
}

export default Room;


// import { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import { Button } from "@mui/material";
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router-dom';
// import CreateRoomPage from './CreateRoomPage';

// function Room(props){
//     const navigate = useNavigate();

//     const [votes_to_skip, setVotesToSkip] = useState(2);
//     const [guest_can_pause, setGuestCanPause] = useState(false);
//     const [isHost, setIsHost] = useState(false);
//     const [showSettings, setShowSettings] = useState(false);
//     const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
//     const [song, setSong] = useState({});

//     const { roomCode } = useParams();

//     useEffect(() => {
//         fetch(`http://localhost:8000/api/get-room?code=${roomCode}`, { credentials: 'include' })
//           .then((response) => {
//             if (!response.ok) {
//               props.leaveRoomCallback();
//               navigate('/');
//             }
//             return response.json();
//           })
//           .then((data) => {
//             setVotesToSkip(data.votes_to_skip);
//             setGuestCanPause(data.guest_can_pause);
//             setIsHost(data.is_host);
//             console.log(isHost);
//             if (isHost){
//                 console.log("inside loop")
//                 authenticateSpotify();
//               }
//           });          
//       }, [roomCode, props, navigate, isHost, authenticateSpotify]);

//     function leaveButtonHandler(){
//         const requestOptions = {
//             method: "POST",
//             credentials: 'include',
//             headers: {'Content-Type': 'application/json'},
//             };            
//         fetch ('http://localhost:8000/api/leave-room',  requestOptions)
//         .then((_response) =>{
//             props.leaveRoomCallback();
//             navigate('/');
//         });
//     }

//     function updateShowSettings(value) {
//         setShowSettings(value);
//     }

//     function getCurrentSong(){
//         fetch("http://localhost:8000/spotify/current-song", { credentials: 'include' })
//         .then((response) => {
//             if (!response.ok){
//                 return {}
//             }else{
//                 return response.json();
//             }
//         })
//         .then((data) => {
//             setSong(data);
//             console.log(data);
//         });
//     }

//     function renderSettingsButton() {
//         return (
//             <Grid item xs={12} align="center">
//                 <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
//                     Settings
//                 </Button>
//             </Grid>
//         );
//     }

//     function renderSettings(){
//         return(
//             <Grid container spacing={1}>
//                 <Grid item xs={12} align="center">
//                     <CreateRoomPage
//                         votes_to_skip={votes_to_skip} 
//                         update={true}                         
//                         guest_can_pause={guest_can_pause} 
//                         roomCode={roomCode}
//                         //updateCallback={ }
//                     />
//                 </Grid>
//                 <Grid item xs={12} align="center">
//                     <Button variant="contained" color='secondary' onClick={() => updateShowSettings(false)}>
//                         Close
//                     </Button>
//                 </Grid>
//             </Grid>
//         );
//     }

//     function authenticateSpotify(){
//         fetch('http://localhost:8000/spotify/is-authenticated',{ credentials: 'include' })
//         .then((response) => response.json())
//         .then((data) => {
//             setSpotifyAuthenticated(data.status);
//             console.log(data.status)
//             if (!data.status){
//                 console.log("get auth url executed");
//                 fetch('http://localhost:8000/spotify/get-auth-url',{ credentials: 'include' })
//                 .then((response) => response.json())
//                 .then((data) =>{
//                     console.log(data.url)
//                     window.location.replace(data.url);
//                 });
//             }
//         });
//         getCurrentSong();
//     }

//     if (showSettings) {
//         return renderSettings();
//     }
//     return (
//         <Grid container spacing={1}>
//             <Grid item xs={12} align="center">
//                 <Typography variant="h4" component="h4">
//                     Code: {roomCode}
//                 </Typography>
//             </Grid>
            
//             {isHost ? renderSettingsButton() : null}
//             <Grid item xs={12} align="center">
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={leaveButtonHandler}
//                 >
//                     Leave Room
//                 </Button>
//             </Grid>
//             {showSettings ? renderSettings() : null}
//         </Grid>
//     );
// }

// export default Room;



  