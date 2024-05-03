import {Route, Routes} from "react-router-dom";
import Garages from "./component/garage/garages.jsx";
import Login from "./component/login";
import CreateGarage from "./component/garage/createGarage.jsx";
import ModifyGarage from "./component/garage/modifyGarage.jsx";
import CreateCar from "./component/car/createCar.jsx";
import GarageDetails from "./component/garage/garageDetails.jsx";
import LoginForm from "./component/login";
import RequireAuth from "./component/RequireAuth.jsx";
import Register from "./component/register.jsx";
import ModifyCar from "./component/car/modifyCar.jsx";

function App() {

    return (
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

            <Route path="/garages" element={<Garages/>} />
            <Route path="/creategarage" element={<CreateGarage/>} />
            <Route path="/modifygarage/:id" element={<ModifyGarage/>} />
            <Route path="/createcar/:garage_id" element={<CreateCar/>} />
            <Route path="/modifycar/:id" element={<ModifyCar/>} />
            <Route path="/garages/:id" element={<GarageDetails />} />

        <Route element={<RequireAuth/>} >
        </Route>
    </Routes>
    )
}

export default App
