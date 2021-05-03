import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import './Comic.scss';
import { format } from "date-fns";
import moment from 'moment';
import {
    useParams
} from "react-router-dom";

function Comic() {
     let { comicId } = useParams();
    const [comic, setComic] = useState([]);

    
    useEffect(() => {
        //ts = 1          
        var ts = new Date().getTime();
        //Hasheo ts=1 + private key + public key
        var hash = md5(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
        async function fetchData() {
            
            await fetch(`https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=${process.env.REACT_APP_PUBLIC_KEY}&ts=${ts}&hash=${hash}`)
                .then(response => response.json())
                .then(json => {
                    setComic(json.data.results[0]);
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, [comicId]);

    return (
        Object.keys(comic).map((obj, i) => {
            if (i === 0) {
                return (
                    <div className="comic" key={i}>
                        <div className="title">{comic.title}</div>
                        <div className="creators">Creators: {comic.creators.items.length === 0 ? 'Not Available' : comic.creators.items.map((creator, i) => {
                            return i === comic.creators.items.length - 1 ? creator.name : creator.name + ', ';
                        })}
                        </div>
                        
                        <div className="sale-date name-span">
                            <span>Date: </span>
                            {comic.dates.length > 0 && comic.dates.find((date) => date.type === "focDate")
                                && moment(comic.dates.find((date) => date.type === "focDate").date).isValid()
                                ? format(new Date(comic.dates.find((date) => date.type === "focDate").date), "dd MMMM yyyy")
                                : 'Not Available'}
                        </div>

                        <div className="price name-span">
                            <span>Print Price: </span>$
                            {comic.prices.length > 0 && comic.prices.find((price) => price.type === "printPrice")
                                && typeof (comic.prices.find((price) => price.type === "printPrice").price) === 'number'
                                ? comic.prices.find((price) => price.type === "printPrice").price.toFixed(2)
                                : 'Not Available'}
                        </div>

                        <div className="price name-span">
                            <span>Digital Price: </span>$
                            {comic.prices.length > 0 && comic.prices.find((price) => price.type === "digitalPurchasePrice")
                                && typeof (comic.prices.find((price) => price.type === "digitalPurchasePrice").price) === 'number'
                                ? comic.prices.find((price) => price.type === "digitalPurchasePrice").price.toFixed(2)
                                : 'Not Available'}
                        </div>
                        <div className="characters">
                                <h5>Characters: </h5>
                                {comic.characters.items.length === 0 ? 'Not Available' :
                                    <ul>{comic.characters.items.map((character, i) =>
                                        <li>{character.name}</li>)}
                                    </ul>}
                        </div>
                        <div className="main-info">
                            <img key="{i}" alt={comic.title} src={`${comic["thumbnail"].path}/detail.${comic["thumbnail"].extension}`} className="img-center" title={comic.title} />
                            <div className="left-info">
                                <div className="description">{comic.description ? comic.description : 'Description not available'}</div>
                            </div>
                            <div className="little-marvel">
                                <a href={comic.urls.length === 0 ? 'http://marvel.com' : 
                                    comic.urls.find((url) => url.type === 'detail') ? comic.urls.find((url) => url.type === 'detail').url : comic.urls[0].url}
                                    title="Take me to Marvel Website" target="_blank">M</a>
                            </div>
                            
                        </div>
                    </div>
                )
            }
            return null;
        })
    );
}

export default Comic
