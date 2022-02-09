import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import {Home} from './components/Home';
import About  from './components/About';
import {NoteState } from './context/notes/NoteState';
function App() {
  return (
    <div>
     <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/About" element={<About />} ></Route>
        </Routes>
 
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
