import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save Auth-token & redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Your New Account Creatred Successfully", "success")

        } else {
            props.showAlert("invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className='container text-center py-2 my-2 col-lg-5 mt-5'>
                <h4> <span style={{ fontSize: "30px" }}>S</span>IGN <span style={{ fontSize: "30px" }}>U</span>P </h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='email'
                            id="email"
                            onChange={onChange}
                            required
                            placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            id="name"
                            onChange={onChange}
                            required minLength={3}
                            placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            id="password"
                            onChange={onChange}
                            required minLength={4}
                            placeholder="Password" />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='cpassword'
                            id="cpassword"
                            onChange={onChange}
                            minLength={4} required
                            placeholder="Confirm Password" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm btn-success col-12"
                    >Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
