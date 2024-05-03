import axiosInstance from "./axiosconfig.js";

export async function createCar({garage_id, marque, modele, img}){

    const response= await axiosInstance.post(
        `/garages/${garage_id}/cars`, {
            marque, modele, img
        })
}

export async function getCars({id, setCars}){

    const response = await axiosInstance.get(`/garages/${id}/cars`)
    setCars(response.data);
}

export async function getCarToModify({id, setCar, setMarque, setModele, setImg}){

    const response = await axiosInstance.get(`/cars/${id}`)
    setCar(response.data);
    setMarque(response.data.marque);
    setModele(response.data.modele);
    setImg(response.data.img);
}

export async function modifyCar({id, marque, modele, img}){

    const response = await axiosInstance.put(
        `/cars/${id}`,{
            marque, modele, img
        })
}

export async function deleteCar({garage_id, id}){

    await axiosInstance.delete(`/garages/${garage_id}/cars/${id}`)
}