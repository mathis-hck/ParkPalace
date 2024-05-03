import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createGarage } from "../../api/garage.js";
import { Form, Button, Container } from 'react-bootstrap';
import useAuth from "../../hooks/useAuth.jsx";

function CreateGarage(props) {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [img, setImg] = useState('');
    const {auth} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await createGarage({ nom, adresse, img, id_owner: auth.id })
        setNom('');
        setAdresse('');
        setImg('');
        navigate("/garages");
    };

    return (
        <Container>
            <h2 className="text-center my-4">Create Garage</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nom du garage"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="adresse">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Adresse du garage"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Lien de l'image du garage"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className="mt-4 mx-4">
                        Valider
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/garages")} className="mt-4 mx-4">
                        Annuler
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default CreateGarage;
