import {useState, useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import {getGarageToModify, modifyGarage, getGarages} from "../../api/garage.js";
import AuthContext from "../../context/authContext.jsx";

const ModifyGarage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [garages, setGarages] = useState([]);
    const [garage, setGarage] = useState(null);
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [img, setImg] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        getGarageToModify({ id, setGarage, setNom, setAdresse, setImg })
    }, []);

    const handleSubmit = async () => {
        await modifyGarage({id, nom, adresse, img})
        navigate("/garages")
    };

    return (
        <Container>
            <h2 className="text-center my-4">Modify Garage</h2>
            {garage ? (
                <Form>
                    <Form.Group controlId="nom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="adresse">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
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
                        <Button variant="secondary" onClick={() => navigate('/garages')} className="mx-4 mt-4">
                            Annuler
                        </Button>
                    </div>
                </Form>
            ) : (
                <h2>Loading...</h2>
            )}
        </Container>
    );
};

export default ModifyGarage;
