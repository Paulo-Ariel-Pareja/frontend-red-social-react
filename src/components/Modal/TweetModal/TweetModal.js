import React, { useState } from 'react'
import { Modal, Form, Button } from "react-bootstrap";
import{toast} from 'react-toastify';
import { Close } from '../../../utils/icons';
import classNames from 'classnames';
import "./TweetModal.scss";
import { agregarMensaje } from '../../../api/tweet';

export default function TweetModal(props) {
    const { show, setShow } = props;
    const [message, setMessage] = useState("");
    const maxLength = 280;
    const onSubmit = e => {
        e.preventDefault();
        if (message.length > 0 && message.length <= maxLength) {
            agregarMensaje(message).then(resp => {
                if (resp?.code >= 200 & resp?.code < 300){
                    setShow(false);
                    window.location.reload();
                }
            }).catch(()=>{
                toast.warning("Error al enviar el mensaje");
            })
        }
    }
    return (
        <Modal
            className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShow(false)} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control
                        as="textarea"
                        rows="10"
                        placeholder="Cuenta algo interesante..."
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <span
                        className={classNames("count", { error: message.length > maxLength })}>
                        {message.length}
                    </span>
                    <Button
                        type="submit"
                        disabled={message.length > maxLength || message.length <= 0}
                    >Publicar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
