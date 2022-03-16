import React from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container-fluid px-5">
                <Link className="navbar-brand" to="/">NoteBookZ</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${location.pathname === '/' && 'active'}`} to="/">Home</Link>
                        <Link className={`nav-link ${location.pathname === '/about' && 'active'}`} to="/about">About</Link>
                    </div>
                </div>
                {!localStorage.getItem('token') ? <form className="d-flex">
                    <Link className="btn btn-info mx-1" to='/signup' style={{ width: "100px" }} role="button">Sign Up</Link>
                    <Link className="btn btn-info mx-1" to='/login' style={{ width: "100px" }} role="button">Log In</Link>
                </form>
                    : <button className="btn btn-info mx-1" onClick={handleLogout} style={{ width: "100px" }} role="button">Log Out</button>
                }

            </div>
        </nav>
    )
}

export default Navbar;
