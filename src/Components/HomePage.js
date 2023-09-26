import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';
// import {Link} from 'react-router-dom';
// import {Redirect} from 'react-router-dom';

function HomePage(props){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<p>This is the home page</p>} />
                <Route path='/join' element = {<JoinRoomPage />} />
                <Route path='/create-room' element = {<CreateRoomPage />} />
            </Routes>
        </Router>
    )
}

export default HomePage;