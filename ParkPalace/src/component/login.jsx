import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import {Form, Button, Alert, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from "../hooks/useAuth.jsx";

const loginUrl = 'http://localhost:3000/login';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reqOk, setReqOk] = useState(true);
    const {setAuth, auth} = useAuth()

    console.log(auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(loginUrl, {
            email,
            password
        })
            .then(response => {
                setAuth(response.data);
                Cookies.set('jwt', response.data.jwt);
                navigate('/garages');
            })
            .catch(error => {
                console.error(error);
                setReqOk(false);
            });
        setEmail('');
        setPassword('');
    };

    return (
        <Container>
            <h2 className="text-center mb-4 mt-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
            {!reqOk && <Alert variant="danger" className="mt-3">Error in Login</Alert>}
            <div className="text-center mt-3">
                Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous ici</Link>
            </div>
        </Container>
    );
}

export default LoginForm;
