import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //save Auth-token & redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');

        } else {
            alert("Invalid credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container text-center py-2 my-2 col-lg-5 mt-5'>
                <h4> <span style={{ fontSize: "30px" }}>L</span>OG <span style={{ fontSize: "30px" }}>I</span>N </h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='email'
                            id="email"
                            onChange={onChange}
                            value={credentials.email}
                            placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            id="password"
                            onChange={onChange}
                            value={credentials.password}
                            placeholder="Password" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm btn-success col-12"
                    >Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
