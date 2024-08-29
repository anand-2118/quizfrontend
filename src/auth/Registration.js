import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthServices';

function Registration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        try{
            console.log("before prevent default")
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        console.log({name, email, password, confirmPassword} )
        
        if (password !== confirmPassword) {
            console.log("password !== confirmPassword")
            setError("Passwords do not match");
            return;
        }
       const data = await registerUser({name,email,password,confirmPassword})
        // Simulate registration (You can replace this with API call)
        console.log('User Registered:', data);
        console.log(formData)

        // Redirect to the login page after registration
        navigate('/login');
        }
        catch(e){
            console.log(e);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
        </div>
    );
}

export default Registration;
