import React, {useState} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';
import {isEmailValid} from '../../utils/validations';
import {values, size} from 'lodash';
import { toast } from 'react-toastify';
import {signInApi, setTokenApi} from '../../api/auth'

import "./SignInForm.scss";

export default function SignInForm(props) {
    const { setrefreshCheckLogin } = props;
    const [formData, setformData] = useState(initialFormValue())
    const [signIpLoading, setsignIpLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault();
        
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        })
        if(size(formData) !== validCount) {
            toast.warning("Todos los campos son requeridos")
        } else {
            if (!isEmailValid(formData.email)){
            toast.warning("Correo electronico invalido")
            } else {
                setsignIpLoading(true)
                signInApi(formData).then(resp => {
                    if (resp.message) {
                        toast.warning(resp.message);
                    }else{
                        toast.success("Bienvenido otra vez!");
                        setTokenApi(resp.token);
                        setrefreshCheckLogin(true)
                    }
                }).catch(() => {
                    toast.error("Ocurrio un error, intente mas tarde")
                }).finally(()=> {
                    setsignIpLoading(false)
                })
            }
        }
    }

    const onChange = e => {
        setformData({...formData, [e.target.name]: e.target.value})
    }
    return (
        <div className="sign-in-form">
            <h2>Ingresar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo electronico"
                        name="email"
                        defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        name="password"
                        defaultValue={formData.password}
                    />
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        {!signIpLoading ? "Iniciar sesion": <Spinner animation="border"/>}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

function initialFormValue(){
    return {
        email: "",
        password: ""
    }
}