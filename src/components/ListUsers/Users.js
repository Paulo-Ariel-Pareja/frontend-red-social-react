import React, {useState, useEffect} from 'react';
import {Media, Image}from 'react-bootstrap';
import{ getUserApi} from '../../api/user';
import {Link} from 'react-router-dom';
import {API_HOST} from '../../utils/constants';
import AvatarNotFound from '../../assets/png/avatar-no-fund.png';
export default function Users(props) {
    const {user}=props;
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getUserApi(user.id).then(response => {
            setUserInfo(response);
        })
    }, [user])
    return (
        <Media
            as={Link} to={`/${user.id}`} className="list-users__user"
        >
            <Image
                width={64}
                height={64}
                roundedCircle
                className="mr-3"
                src={
                    userInfo?.AvatarNotFound
                        ? `${API_HOST}/obtener-avatar?id=${user.id}`
                        : AvatarNotFound
                }
                alt={`${user.nombre} ${user.apellidos}`}
            />
            <Media.Body>
                <h5>
                    {user.nombre} 
                </h5>
                <p>{userInfo?.biografia}</p>
            </Media.Body>
        </Media>
    )
}
