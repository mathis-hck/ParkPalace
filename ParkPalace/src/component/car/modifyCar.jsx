import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import {getCarToModify, modifyCar} from "../../api/car.js";

const ModifyCar = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [img, setImg] = useState('');
    const [garage_id, setGarage_id] = useState('');

    useEffect(() => {
        getCarToModify({id, setCar, setMarque, setModele, setImg})
    }, []);

    const handleSubmit = async () => {
        await modifyCar({id, marque, modele, img})
        navigate(`/garages/${garage_id}`);
    };

    return (
        <Container>
            <h2 className="text-center my-4">Modify Car</h2>
            {car ? (
                <Form>
                    <Form.Group controlId="marque">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control
                            type="text"
                            value={marque}
                            onChange={(e) => setMarque(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="modele">
                        <Form.Label>Modèle</Form.Label>
                        <Form.Control
                            type="text"
                            value={modele}
                            onChange={(e) => setModele(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={handleSubmit} className="mx-4 mt-4">
                            Valider
                        </Button>
                        <Link to={`/garages`}>
                            <Button variant="secondary" className="mx-4 mt-4">
                                Annuler
                            </Button>
                        </Link>
                    </div>
                </Form>
            ) : (
                <h2>Loading...</h2>
            )}
        </Container>
    );
};

export default ModifyCar;
