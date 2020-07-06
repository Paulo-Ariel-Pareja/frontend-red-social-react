import { API_HOST, TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

export function signUpApi(user) {
    const url = `${API_HOST}/registro`
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        fechaNacimiento: new Date()
    }
    delete userTemp.repeatPassword;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    };

    return fetch(url, params).then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
            return resp.json();
        }
        return { code: 404, message: "Email no disponible" }
    }).then(result => {
        return result;
    }).catch(err => {
        return err
    })
}

export function signInApi(user) {
    const url = `${API_HOST}/login`
    const userTemp = {
        ...user,
        email: user.email.toLowerCase()
    }
    delete userTemp.repeatPassword;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    };

    return fetch(url, params).then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
            return resp.json();
        }
        return { code: 404, message: "Usuario y/o contraseña incorrectos" }
    }).then(result => {
        return result;
    }).catch(err => {
        return err
    })
}

export function setTokenApi(token) {
    localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
    return localStorage.getItem(TOKEN);
}

export function logoutApi(){
    localStorage.removeItem(TOKEN);
}

function isExp(token) {
    const {exp} = jwtDecode(token)
    const expire = exp * 1000
    const timeout = expire - Date.now()
    if (timeout < 0) return true;
    return false;
}

export function isUserLogedApi() {
    const token = getTokenApi();
    if (!token) return null;
    if(isExp(token)) logoutApi();
    return jwtDecode(token)
}