import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PencilSquare, Plus, Trash, ArrowUpRightSquare} from "react-bootstrap-icons";
import {deleteCar, getCars} from "../../api/car.js";
import {getGaragesDetails} from "../../api/garage.js";
import AuthContext from "../../context/authContext.jsx";

const GarageDetails = () => {
    const { id } = useParams();
    const [garage, setGarage] = useState(null);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        getGaragesDetails({id, setGarage})
        getCars({id, setCars})
    }, []);

    const handleDelete = async (garage_id, id) => {
        console.log(id);
        console.log(garage_id);
        await deleteCar({ garage_id, id})
        await getCars({garage_id, setCars})
    }

    const handleCreate = (garage_id) => {
        navigate(`/createcar/${garage_id}`);
    };

    const handleModify = (id) => {
        navigate(`/modifycar/${id}`);
    };

    const handleRedirect = () => {
        navigate(`/garages`);
    };


    return (
        <Container className="mt-4">
            {garage ? (
                <div>
                    <Row className="mb-3 justify-content-center">
                        <Col xs={6} className="text-center">
                            <h2 className="mb-3">{garage.nom}</h2>
                            <p>Adresse: {garage.adresse}</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Col className="text-center">
                            <Image src={garage.img} alt="Garage" fluid style={{ maxWidth: '300px' }}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {auth?.role !== "visitor" &&
                            <Button variant="primary" onClick={() => handleCreate(garage.id)} className="mb-4 mt-4 px-4" style={{ marginRight: '10px' }}>
                                <Plus size={24} style={{ marginRight: '5px' }} /> Créer
                            </Button>}
                        </Col>
                        <Col xs="auto" className="text-end">
                            <Button variant="primary" onClick={handleRedirect} className="mb-4 mt-4 px-4">
                                <ArrowUpRightSquare size={24} style={{ marginRight: '5px' }} /> Retour aux garages
                            </Button>
                        </Col>
                    </Row>

                    <h3 className="mb-4 mt-3">Voitures dans ce garage :</h3>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {cars.map((car) => (
                            <Col key={car.id}>
                                <Card>
                                    <Card.Body className="text-center">
                                        <Card.Title className="mb-3">{car.marque} {car.modele}</Card.Title>
                                        <Image src={car.img} alt="Car" fluid style={{ maxWidth: '250px' }} className="mx-auto"></Image>
                                        {!auth || auth.role !== "visitor" &&
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button variant="primary" className="mt-3" onClick={() => handleModify(car.id)} >
                                                <PencilSquare /> Modifier
                                            </Button>
                                            <Button variant="danger" className="mt-3" onClick={() => handleDelete(garage.id, car.id)}>
                                                <Trash /> Supprimer
                                            </Button>
                                        </div>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </Container>
    );
};

export default GarageDetails;
