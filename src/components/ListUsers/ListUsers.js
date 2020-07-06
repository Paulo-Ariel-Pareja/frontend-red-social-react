import React from 'react';
import {map, isEmpty} from 'lodash';
import Users from './Users';

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {users}= props;
    if(isEmpty(users)){
        return <h2>No se encontraron usuarios</h2>
    }
    return (
        <div>
            <ul className="list-users">
                {map(users, user => (
                    <h2 key={user.id}>
                        <Users key={user.id} user={user}/>
                    </h2>
                ))}
            </ul>
        </div>
    )
}

