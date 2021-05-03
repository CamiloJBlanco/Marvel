import React, { useState } from "react";
import "./Comics.scss";
import Pagination from './Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router } from "react-router-dom";

//perPage
const Comics = (props) => {
    const [Page, setPage] = useState(1);
    //cantidad de resultados por pagina
    //por default la API devuelve 20 resultados
    const [perPage] = useState(20);
    const indexOfLastComic = Page * perPage;
    const indexOfFirstComic = indexOfLastComic - perPage;
    const currentComics = props.filteredC.slice(indexOfFirstComic, indexOfLastComic);

    const paginate = (pageNumber) => {
        setPage(pageNumber);
    }

    const executeSearch = (event) => {
        setPage(1);
        props.onSearchHero(event);
    }


    //window.location.reload(false) hace un reload en la pagin para evitar que el usuario tenga que borrar manualmente la busqueda
    return (
        
        <div>
            <div data-testid="search" className="search">
                <button className="btn btn-danger"  onClick={e => window.location.reload(false)}>
                    X
                </button>
                <button type="button" title="Search comic by character" className="btn btn-danger" onClick={props.toggleInputClass}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                <input
                    className={`form-control ${props.inputHidden ? "hide-el" : "show-el"}`}
                    type="text"
                    value={props.inputValue}
                    onChange={executeSearch}
                    placeholder="Search your comic by your favorite character"
                />
            </div>

            <div className="grid" data-testid="grid">
                {currentComics.map((comic, i) => (
                    <div className="grid-item" key={`comic-${i}`}>
                        <div>
                                <Router>
                                    <a href={`/comic/${comic.id}`} target="_blank" rel="noopener noreferrer" title="Take me to Comic Details">
                                    <img key="{i}" alt={comic.title} src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} className="img-center" title={comic.title} />
                                    </a>
                                </Router>
                            
                            <div className="title">{comic.title}</div>
                            <div className="creators">
                                Creators:{" "}
                                {comic.creators.items.length === 0 ? "Not Available"
                                    : comic.creators.items.map((creator, i) => {
                                        return i === comic.creators.items.length - 1 ? creator.name : creator.name + ", ";
                                    })}
                            </div>
                            <div className="price">
                            <span>Print Price: </span>$
                            {comic.prices.length > 0 && comic.prices.find((price) => price.type === "printPrice")
                                && typeof (comic.prices.find((price) => price.type === "printPrice").price) === 'number'
                                ? comic.prices.find((price) => price.type === "printPrice").price.toFixed(2)
                                : 'Not Available'}
                        </div>
                        </div>

                        <div className="bottom">
                            <div className="details">
                                <Router>
                                    <a href={`/comic/${comic.id}`} target="_blank" rel="noopener noreferrer" title="Take me to Comic Details">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </a>
                                </Router>
                            </div>
                            <div className="little-marvel">
                                <a href={comic.urls.length === 0 ? 'http://marvel.com' : 
                                    comic.urls.find((url) => url.type === 'detail') ? comic.urls.find((url) => url.type === 'detail').url : comic.urls[0].url}
                                    title="Take me to Marvel Website" target="_blank">M</a>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
            <Pagination itemsPerPage={perPage} totalItems={props.filteredC.length} paginate={paginate} Page={Page}></Pagination>
        </div>
    );
};

export default Comics;
