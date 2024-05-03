import axiosInstance from "./axiosconfig.js";

export async function getGarages({auth, setGarages}){
    const garagesUrl = `/garages`
    let updatedGarageurl = garagesUrl;
    if (auth.role === "mecanic"){
        updatedGarageurl = `${garagesUrl}?id_owner=${auth.id}`;
    }
    const response = await axiosInstance.get(updatedGarageurl)
    setGarages(response.data);
}

export async function getGaragesDetails({id, setGarage}){

    const response = await axiosInstance.get(`/garages/${id}`)
    setGarage(response.data);
}

export async function getGarageToModify({id, setGarage, setNom, setAdresse, setImg}){

    const response = await axiosInstance.get(`/garages/${id}`)
    setGarage(response.data);
    setNom(response.data.nom);
    setAdresse(response.data.adresse);
    setImg(response.data.img);
}

export async function modifyGarage({id, nom, adresse, img}){

    const response = await axiosInstance.put(
        `/garages/${id}`,{
            nom, adresse, img
        })
}

export async function createGarage({nom, adresse, img, id_owner}){

    const response= await axiosInstance.post(
        `/garages`, {
            nom, adresse, img, id_owner
        })
}

export async function deleteGarage({id}){

    await axiosInstance.delete(`/garages/${id}`)
}

