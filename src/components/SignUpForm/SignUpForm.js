import React, {useState} from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import "./SignUpForm.scss"
import {values, size} from 'lodash';
import { toast } from 'react-toastify';
import {isEmailValid} from '../../utils/validations';
import {signUpApi} from "../../api/auth";

export default function SignUpForm(props) {
    const { setShowMolal } = props;
    const [formData, setformData] = useState(initialFormValue())
    const [signUpLoading, setsignUpLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        })

        if (validCount !== size(formData)) {
            toast.warning("Todos los campos son requeridos")
        }else{
            if(!isEmailValid(formData.email)){
                toast.warning("Email invalido")
            } else if (formData.password !== formData.repeatPassword) {
                toast.warning("Las contraseñas no son iguales")
            } else if (size(formData.password) <6 ) {
                toast.warning("La contraseña debe ser de al menos 6 caracteres")
            } else {
                setsignUpLoading(true);
                signUpApi(formData).then(resp => {
                    if (resp.code) {
                        toast.warning(resp.message);
                    }else{
                        toast.success("Usuario registrado");
                        setShowMolal(false)
                        setformData(initialFormValue())
                    }
                }).catch(() => {
                    toast.error("Ocurrio un error, intente en unos momentos")
                }).finally(()=> {
                    setsignUpLoading(false)
                })
            }
        }
    }

    const onChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }
    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="nombre"
                                defaultValue={formData.nombre}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                name="apellidos"
                                defaultValue={formData.apellidos}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Correo electronico"
                        name="email"
                        defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                defaultValue={formData.password}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Repetir contraseña"
                                name="repeatPassword"
                                defaultValue={formData.repeatPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signUpLoading ? "Registrarse": <Spinner animation="border" />}
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue() {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword :""
    }
}