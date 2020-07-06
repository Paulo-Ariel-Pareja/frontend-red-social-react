import { API_HOST, TOKEN } from '../utils/constants';
import { getTokenApi } from './auth';


export function checkFollowApi(idUser) {
    const url = `${API_HOST}/consulta-relacion?id=${idUser}`
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function followUserApi(idUser){
    const url = `${API_HOST}/alta-relacion?id=${idUser}`
    const params = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}


export function unfollowUserApi(idUser){
    const url = `${API_HOST}/baja-relacion?id=${idUser}`
    const params = {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function getFollowApi(paramsUrl) {
    const url = `${API_HOST}/lista-usuarios?${paramsUrl}`
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}