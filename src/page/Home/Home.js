import React, {useState, useEffect} from 'react';
import {Button, Spinner} from 'react-bootstrap';
import BasicLayout from '../../layout/BasicLayout';
import { getTweetFollowersApi } from '../../api/tweet';
import ListTweets from '../../components/ListTweets';
import "./Home.scss";


export default function Home(props) {
    const { setrefreshCheckLogin } = props;
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1)
    const [loadingTweet, setLoadingTweet] = useState(false)

    useEffect(() => {
        getTweetFollowersApi(page).then(response=>{
            if(!tweets && response){
                setTweets(formatModel(response));
            } else {
                if(!response){
                    setLoadingTweet(0)
                } else {
                    const data = formatModel(response);
                    setTweets([...tweets, ...data]);
                    setLoadingTweet(false);
                }
            }
            
        }).catch(() => {});
    }, [page]);

    const moreData = () => {
        setLoadingTweet(true);
        setPage(page + 1);
    }
    return (
        <BasicLayout className="home" setrefreshCheckLogin={setrefreshCheckLogin}>
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
                {tweets && <ListTweets tweets={tweets}/>}
                <Button
                        onClick={moreData}
                        className="load-more"
                    >
                       {!loadingTweet ? (
                            loadingTweet!==0 ? "Ver mas mensajes" : "No hay mensajes para mostrar"
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
        </BasicLayout>
    )
}

function formatModel(tweets){
    const temp = [];
    tweets.forEach(tweet => {
        temp.push({
            _id: tweet._id,
            userId:tweet.userRelationId,
            mensaje: tweet.Tweet.mensaje,
            fecha: tweet.Tweet.fecha
        })
    });
    return temp;
}