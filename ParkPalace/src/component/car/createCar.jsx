import React, { useState } from 'react';
import { useNavigate, useParams  } from "react-router-dom";
import { createCar } from "../../api/car.js";
import { Form, Button, Container } from 'react-bootstrap';

function CreateGarage(props) {
    const { garage_id } = useParams(); // Récupérer le garage_id depuis l'URL
    const navigate = useNavigate();
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createCar({ garage_id, marque, modele, img })
        setMarque('');
        setModele('');
        setImg('');
        navigate(`/garages/${garage_id}`);
    };

    return (
        <Container>
            <h2 className="text-center my-4">Create Car</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="marque">
                    <Form.Label>Marque</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Marque de la voiture"
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="modele">
                    <Form.Label>Modèle</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Modèle de la voiture"
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Lien de l'image de la voiture"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className="mt-4 mx-4">
                        Valider
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(`/garages`)} className="mt-4 mx-4">
                        Annuler
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default CreateGarage;
