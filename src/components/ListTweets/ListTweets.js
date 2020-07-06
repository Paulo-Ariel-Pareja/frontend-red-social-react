import React, { useState, useEffect } from 'react'
import { Image } from "react-bootstrap";
import moment from 'moment';
import { map } from "lodash";
import { getUserApi } from '../../api/user';
import AvatarNotFound from '../../assets/png/avatar-no-fund.png';
import { API_HOST } from '../../utils/constants';
import { replaceURLWithHTMLLinks } from '../../utils/functions';
import "./ListTweets.scss";

export default function ListTweets(props) {
    const { tweets } = props;
    return (
        <div className="list-tweets">
            {map(tweets, (tweet, index) => (
                <Tweet key={index} tweet={tweet} />
            ))}
        </div>
    )
}

function Tweet(props) {
    const { tweet } = props;
    const [userInfo, setUserInfo] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        getUserApi(tweet.userId).then(response => {
            setUserInfo(response)
            setAvatar(
                response?.avatar ? `${API_HOST}/obtener-avatar?id=${response.id}` : AvatarNotFound
            )
        })
    }, [tweet])
    return (
        <div className="tweet">
            <Image className="avatar" src={avatar} roundedCircle />
            <div>
                <div className="name">
                    {userInfo?.nombre} {userInfo?.apellidos}
                    <span>{moment(tweet.fecha).calendar()}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(tweet.mensaje)}}
                />
            </div>
        </div>
    )
}