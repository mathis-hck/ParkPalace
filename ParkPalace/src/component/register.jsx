import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'visitor' // default role
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        axios.post('http://localhost:3000/register', {
            email: formData.email,
            password: formData.password,
            role: formData.role
        })
            .then(response => {
                console.log('Registration successful');
                navigate('/login');
            })
            .catch(error => {
                console.error('Error registering user:', error);
            });
    };

    return (
        <Container>
            <h1 className="text-center mb-4 mt-4">Inscription</h1>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Entrez votre adresse email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Entrez votre mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmez votre mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="role">
                    <Form.Label>Choisir un rôle</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="visitor">Visiteur</option>
                        <option value="mecanic">Mécanicien</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    S'inscrire
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
