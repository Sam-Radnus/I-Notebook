import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import { NoteState } from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="You Have a Alert"/>
          <div className="container">
            <Routes>
              <Route exact path="/"       element={<Home />} ></Route>
              <Route exact path="/About"  element={<About />} ></Route>
              <Route exact path="/Login"  element={<Login />} ></Route>
              <Route exact path="/signup" element={<SignUp />} ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
