import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: '20px 0', padding: '10px', width: '100%', maxWidth: '600px' }}
        />
    );
};

export default SearchBar;