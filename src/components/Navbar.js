
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    let location = useLocation();
    React.useEffect(() => {
        //ga.send(["pageview", location.pathname]);
        //console.log(location.pathname);
    }, [location]);
    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
                    </li>

                </ul>
                {!localStorage.getItem('token')?<form className="d-flex">

                    <Link type="button" to="/Login"  role="button" className="btn btn-danger mx-2">Log-In</Link>
                    <Link type="button" to="/signup" role="button" className="btn btn-warning mx-2">Sign-Up</Link>
                </form>:<button onClick={handleLogOut} className='btn btn-secondary'>Log Out</button>}
            </div>
        </div>
    </nav>
}

export default Navbar;