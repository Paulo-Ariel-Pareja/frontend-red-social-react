import { API_HOST, TOKEN } from '../utils/constants';
import { getTokenApi } from './auth';

export function agregarMensaje(mensaje){
    const url = `${API_HOST}/guardar-tweet`
    const data ={
        mensaje
    };
    const params = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params).then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
            return {code: resp.status, message: resp.json()};
        }
        return { code: 404, message: "Usuario y/o contraseña incorrectos" }
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function leerMensaje(idUsuario, pagina){
    const url = `${API_HOST}/leet-tweet?id=${idUsuario}&pagina=${pagina}`
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    })
}

export function getTweetFollowersApi(pagina= 1){
    const url = `${API_HOST}/lista-tweet?page=${pagina}`
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        console.log(response)
        return response.json();
    }).catch(err => {
        return err;
    })
}