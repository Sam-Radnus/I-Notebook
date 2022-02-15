import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import { NoteState } from './context/notes/NoteState';
import  Alert  from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },5000);
  }
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/"       element={<Home showAlert={showAlert} />} ></Route>
              <Route exact path="/About"  element={<About showAlert={showAlert} />} ></Route>
              <Route exact path="/Login"  element={<Login showAlert={showAlert} />} ></Route>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} ></Route>
            </Routes>          
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;