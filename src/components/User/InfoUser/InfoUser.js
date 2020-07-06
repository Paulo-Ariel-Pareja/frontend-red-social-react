import React from 'react'
import "./InfoUser.scss";
import {Location, Link, DateBirth} from '../../../utils/icons';
import moment from 'moment';
import localization from 'moment/locale/es';

export default function InfoUser(props) {
    const {user} = props;
    return (
        <div className="info-user">
            <h2 className="name">
                {user?.nombre} {user?.apellidos}
            </h2>
            <p className="email">
            {user?.email}
            </p>
            {user?.biografia && (
                <div className="description">
                    {user.biografia}
                </div>
            )}
            <div className="more-info">
                {user?.ubication && (
                    <p>
                        <Location />
                        {user.ubication}
                    </p>
                )}
                {user?.sitioWeb && (
                    <p>
                        <a
                            href={user.sitioWeb}
                            alt={user.sitioWeb}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Link /> {user.sitioWeb}
                        </a>
                        
                    </p>
                )}
                {user?.fechaNacimiento && (
                    <p>
                        <DateBirth />
                        {moment(user.fechaNacimiento).locale("es", localization).format("LL")}
                        
                    </p>
                )}
            </div>
        </div>
    )
}
