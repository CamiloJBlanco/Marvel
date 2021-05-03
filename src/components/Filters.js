import React, { useState } from "react";
import './Filters.scss';


const Filters = (props) => {
    const executeSearch = (event) => {
        props.onSearchHero(event);
    }

    //Los filtros setean el valor value de "onSearchHero" al character seleccionado y aplica el filtro/busqueda

    return (
        <div >
            <div className="filtersTitle">
                Most famous characters
            </div>
            <div className="filters">
            <button type="button" title="Search comic by character" className="btn btn-danger" value="Hulk"
                    onClick={executeSearch}>
                    Hulk
                </button>
                <button type="button" title="Search comic by character" className="btn btn-danger" value="Spider-man"
                    onClick={executeSearch}>
                    Spider-man
                </button>
                <button type="button" title="Search comic by character" className="btn btn-danger" value="Captain America"
                    onClick={executeSearch}>
                    Captain America
                </button>
                <button type="button" title="Search comic by character" className="btn btn-danger" value="X-men"
                    onClick={executeSearch}>
                    X-men
                </button>
            </div>
            </div>
    )
}

export default Filters;