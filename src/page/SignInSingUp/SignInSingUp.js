import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/png/logo.png'
import LogoWhite from '../../assets/png/logo-white.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faUser, faComment } from "@fortawesome/free-solid-svg-icons"
import "./SignInSingUp.scss";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";

export default function SignInSingUp(props) {
    const [showMolal, setShowMolal] = useState(false)
    const [contentModal, setContentModal] = useState(null)
    const {setrefreshCheckLogin}=props;

    const openModal = content => {
        setShowMolal(true)
        setContentModal(content)
    }
    return (
        <>
            <Container className="signin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent
                        openModal={openModal}
                        setShowMolal={setShowMolal}
                        setrefreshCheckLogin={setrefreshCheckLogin}
                    />
                </Row>
            </Container>
            <BasicModal show={showMolal} setShow={setShowMolal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

function LeftComponent() {
    return (
        <Col className="signin-signup__left" xs={6}>
            <img src={Logo} alt="logo"></img>
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUser} />
                    Enterate de lo que habla la gente.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                    Unete y conversa con otros usuarios.
                </h2>
            </div>
        </Col>
    )
}

function RightComponent(props) {
    const {openModal, setShowMolal, setrefreshCheckLogin} = props
    return (
        <Col className="signin-signup__right" xs={6}>
            <div>
                <img src={LogoWhite} alt="red" />
                <h2>Mira lo que hablan tus compañeros</h2>
                <h3>Unete ahora...</h3>
                <Button
                    variant="primary"
                    onClick={() => openModal(<SignUpForm setShowMolal={setShowMolal}/>)}
                >
                    Registrate ahora
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => openModal(<SignInForm setrefreshCheckLogin={setrefreshCheckLogin}/>)}
                >
                    Iniciar sesion
                </Button>
            </div>
        </Col>
    )
}