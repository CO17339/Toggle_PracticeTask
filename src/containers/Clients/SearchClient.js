import React from 'react';
import '../../styling/head.scss';

const SearchClient = (props) => {
    return (
        <input className = "search" type = "text" placeholder="Find Client..."
        value={props.inputValue} onChange={props.filterClientsOnChange}>
        </input>
    );
}

export default SearchClient;