import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    // State to hold login form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
            const response = await fetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userInfo', JSON.stringify(data.user));

                alert("Login Successful!");
                navigate('/posts');
            } else {

                alert(`Login Failed: ${data.message || data}`);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className='container-login'>
                <p>Login page</p>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        {/* Add name, value, and onChange props */}
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>

            </div>
        </div>
    )
}
export default Login;