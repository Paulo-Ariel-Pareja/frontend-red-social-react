import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import "./BannerAvatar.scss";
import { API_HOST } from '../../../utils/constants'
import AvatarNotFund from '../../../assets/png/avatar-no-fund.png';
import ConfigModal from '../../Modal/ConfigModal';
import EditUserForm from '../EditUserForm';
import { checkFollowApi, followUserApi, unfollowUserApi } from '../../../api/follow';

export default function BannerAvatar(props) {
    const { user, loggedUser } = props;
    const [showModal, setShowModal] = useState(false)
    const [following, setFollowing] = useState(null)
    const [reloadFollow, setReloadFollow] = useState(false)
    const bannerUrl = user?.banner ? `${API_HOST}/obtener-banner?id=${user.id}` : null;
    const avatarUrl = user?.avatar ? `${API_HOST}/obtener-avatar?id=${user.id}` : AvatarNotFund;

    useEffect(() => {
        if(user){
            checkFollowApi(user.id).then(response => {
                if (response?.status) {
                    setFollowing(true);
                } else {
                    setFollowing(false);
                }
            })
        }
        setReloadFollow(false)
    }, [user, reloadFollow])

    const onFollow = () => {
        followUserApi(user.id).then(()=> {
            setReloadFollow(true)
        })
    }

    const onUnfollow = () => {
        unfollowUserApi(user.id).then(()=> {
            setReloadFollow(true)
        })
    }

    return (
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }} />
            {user && (
                <div className="options">
                    {loggedUser._id === user.id && (
                        <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
                    )}
                    {loggedUser._id !== user.id && (
                        following !== null && (
                            (following ? (
                                <Button onClick={onUnfollow} className="unfollow"><span>Siguiendo</span></Button>
                            ) : (
                                    <Button onClick={onFollow}>Seguir</Button>
                                ))
                        )

                    )}
                </div>
            )}
            <ConfigModal
                show={showModal}
                setShow={setShowModal}
                title="Editar"
            >
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    )
}
