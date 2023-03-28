import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const {
    VITE_API_URL
} = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: Interceptores
// Permiten interceptar un peticion antes o despues de realizarla
// Para agregar/modificar la respuesto o agregar/modificar la informacion de la peticion

calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        "x-token": sessionStorage.getItem('token')
    }

    return config;
})

export default calendarApi;
