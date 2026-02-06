import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style/signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Update specific field based on name attribute
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
            const response = await fetch(`${BASE_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup Successful! Redirecting to login...");
                navigate('/login');
            } else {
                alert(`Signup Failed: ${data.error || "Unknown error"}`);
            }
        } catch (error) {

            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="signup-page">
                <div className='container-signup'>
                    <p>Sign up page</p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>

                            <Form.Control
                                type="text"
                                name="fullName"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Set Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter new username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Set Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Set Password here"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            SignUp
                        </Button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default Signup;