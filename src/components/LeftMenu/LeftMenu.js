import React, {useState} from 'react';
import './LeftMenu.scss';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/png/logo-white.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import {logoutApi} from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import TweetModal from '../Modal/TweetModal';

export default function LeftMenu(props) {
    const {setrefreshCheckLogin}=props
    const user = useAuth();

    const [showModal, setShowModal] = useState(false)

    const logout = () => {
        logoutApi();
        setrefreshCheckLogin(true);
    }
    return (
        <div className="left-menu">
            <img src={LogoWhite} className="logo" alt="logo" />
            
            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Usuarios
            </Link>            
            <Link to={`/${user?._id}`}>
                <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>            
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Salir
            </Link>

            <Button onClick={() =>{
                setShowModal(true)
            }}>Nuevo mensaje</Button>

            <TweetModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
