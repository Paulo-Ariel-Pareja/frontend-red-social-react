import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import qs from 'query-string';
import {useDebouncedCallback} from 'use-debounce';
import {isEmpty} from 'lodash';
import {Spinner, ButtonGroup, Button} from 'react-bootstrap';
import {getFollowApi} from '../../api/follow';
import BasicLayout from '../../layout/BasicLayout';
import ListUsers from '../../components/ListUsers';
import "./Users.scss";

function Users(props) {
    const { setrefreshCheckLogin, location, history } = props;
    const [users, setUsers] = useState(null)
    const params = useUserQuery(location);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [btnLoading, setBtnLoading] = useState(false)
    const [onSearch] = useDebouncedCallback((value)=> {
        setUsers(null);
        history.push({
            search: qs.stringify({...params, search: value, page: 1})
        })
    }, 200);

    useEffect(() => {
        getFollowApi(qs.stringify(params)).then(
            response => {
                if(params.page == 1){
                    if(isEmpty(response)){
                        setUsers([])
                    }else {
                        setUsers(response);
                    }
                } else {
                    if(!response){
                        setBtnLoading(0)
                    } else {
                        setUsers([...users, ...response]);
                        setBtnLoading(false);
                    }
                };

                
            }
        ).catch(()=> {
            setUsers([])
        })
    }, [location]);

    const onChangeType = (type) => {
        setUsers(null);
        if(type === "new"){
            setTypeUser("new");
        } else {
            setTypeUser("follow");
        }
        history.push({
            search: qs.stringify({type: type, page: 1, search: ''})
        })
    };

    const moreData = () => {
        setBtnLoading(true);
        const newPage = parseInt(params.page)+1;
        history.push({
            search: qs.stringify({...params, page: newPage})
        })
    }
    return (
        <BasicLayout className="users" title="Usuarios"
            setrefreshCheckLogin={setrefreshCheckLogin}
        >
            <div className="users__title">
                <h2>Usuarios</h2>
                <input 
                    type="text"
                    placeholder="Buscar a alguien"
                    onChange={e => onSearch(e.target.value)}
                />
            </div>
            <ButtonGroup className="users__options">
                <Button 
                    className={typeUser === "follow" && "active"}
                    onClick={()=> onChangeType('follow')}>
                    Siguiendo
                </Button>
                <Button
                    className={typeUser === "new" && "active"}
                    onClick={()=> onChangeType('new')}>
                    Nuevos
                </Button>
            </ButtonGroup>
            {!users ? (
                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
                    Buscando usuarios
                </div>
            ):(
                <>
                   <ListUsers users={users} />
                   <Button
                        onClick={moreData}
                        className="load-more"
                    >
                       {!btnLoading ? (
                            btnLoading!==0 && "Ver mas usuarios"   
                       ):(
                           <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                           />
                       )
                    }
                   </Button>
                </>

            )}
        </BasicLayout>
    )
}

function useUserQuery(location) {
    const {page = 1, type="follow", search = ""} = qs.parse(location.search);
    return {page, type, search};
}

export default withRouter(Users);