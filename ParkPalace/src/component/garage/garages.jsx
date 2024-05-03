import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext.jsx";
import {deleteGarage, getGarages} from "../../api/garage.js";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Trash, Plus, PencilSquare } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Garages() {
    const [garages, setGarages] = useState([]);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        getGarages({auth, setGarages})
    }, []);

    const handleCreate = () => {
        navigate("/creategarage");
    };

    const handleModify = (id) => {
        navigate(`/modifygarage/${id}`);
    };

    const handleDelete = async (id) => {
        await deleteGarage({ id, setGarages })
        await getGarages({auth, setGarages})
    }

    return (
        <Container>
            <h1 className="text-center mx-auto mb-4 mt-4">Liste des garages</h1>
            {auth?.role !== "visitor" &&
                <Button variant="primary" className="mb-4 px-4" onClick={handleCreate} style={{ marginRight: '10px' }}>
                    <Plus size={24} style={{ marginRight: '5px' }} /> Créer
                </Button>}
            <Row xs={1} md={4} className="g-4">
                {garages.map((garage) => (
                    <Col key={garage.id}>
                        <Card style={{ border: "1px solid #ced4da", borderRadius: "10px" }} className="text-center">
                            <Link to={`/garages/${garage.id}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={garage.img} style={{ height: "200px", objectFit: "contain" }} className="mx-auto" />
                            </Link>
                            <Card.Body className="d-flex justify-content-center flex-column">
                                <Card.Title>{garage.nom}</Card.Title>
                                <Card.Text>{garage.adresse}</Card.Text>
                                {!auth || auth.role !== "visitor" &&
                                    <>
                                        <Button variant="primary" className="mt-2" onClick={() => handleModify(garage.id)}>
                                            <PencilSquare /> Modifier
                                        </Button>
                                        <Button variant="danger" className="mt-2" onClick={() => handleDelete(garage.id)}>
                                            <Trash /> Supprimer
                                        </Button>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
