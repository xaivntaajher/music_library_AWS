import React from 'react';

const SearchBar = (props) => {

    return (
        <div>
        <input
            type="text"
            placeholder="Search"
            onChange={(event) => props.filterSongs(event)}
        />
        </div>
    );
}

export default SearchBar;