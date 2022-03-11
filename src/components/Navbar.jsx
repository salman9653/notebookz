import React from 'react';
import { useLocation, Link } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid px-5">
                <Link className="navbar-brand" to="/">NoteBook X</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${location.pathname === '/' && 'active'}`} to="/">Home</Link>
                        <Link className={`nav-link ${location.pathname === '/about' && 'active'}`} to="/about">About</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
