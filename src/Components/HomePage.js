import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Button, ButtonGroup } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/api/user-in-room', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setRoomCode(data.code);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  function clearRoomCode() {
    setRoomCode(null);
  }

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align='center'>
          <Typography variant='h3' component='h3'>
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <ButtonGroup disableElevation variant='contained' color='primary'>
            <Button color='primary' to='/join' component={Link}>
              Join a Room
            </Button>
            <Button color='secondary' to='/create-room' component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()} />
        <Route path='/join' element={<JoinRoomPage />} />
        <Route path='/create-room' element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
      </Routes>
    </Router>
  );
}

export default HomePage;
