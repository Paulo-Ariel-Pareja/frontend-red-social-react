import React, { useState, useEffect } from 'react';
import './User.scss';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import BasicLayout from '../../layout/BasicLayout';
import { getUserApi } from '../../api/user';
import { leerMensaje } from '../../api/tweet';
import { toast } from 'react-toastify';
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import useAuth from '../../hooks/useAuth';
import ListTweets from '../../components/ListTweets';

function User(props) {
    const { match, setrefreshCheckLogin } = props;
    const { params } = match;
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweet, setLoadingTweet] = useState(false)
    const loggedUser = useAuth();

    useEffect(() => {
        getUserApi(params.id).then(
            response => {
                if (response === null) toast.error("Usuario no encontrado")
                setUser(response)
            }
        ).catch(() => {
            toast.error("Usuario no encontrado")
        })
    }, [params]);

    useEffect(() => {
        leerMensaje(params.id, 1).then(
            response => {
                setTweets(response)
            }
        ).catch(() => {
            setTweets([])
            toast.error("Error al recuperar los mensajes del usuario")
        })
    }, [params])

    const moreData = () => {
        const pageTemp = page + 1;
        setLoadingTweet(true);
        leerMensaje(params.id, pageTemp).then(response=>{
            if (!response) {
                setLoadingTweet(0);
            } else {
                setTweets([...tweets, ...response])
                setPage(pageTemp);
                setLoadingTweet(false);
            }
        })
    }
    return (
        <BasicLayout className="user" setrefreshCheckLogin={setrefreshCheckLogin}>
            <div className="user__title">
                <h2>{user ? `${user.nombre} ${user.apellidos}` : "Usuario no exite"}</h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className="user__tweets">
                <h3>Mensajesss</h3>
                {tweets && <ListTweets tweets={tweets} />}
                <Button onClick={moreData}>
                    {!loadingTweet ? (
                        loadingTweet !== 0 && 'Mostrar mas mensajes'
                    ) : (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                arian-hidden="true"
                            />
                        )}
                </Button>
            </div>
        </BasicLayout>
    )
}


export default withRouter(User)