"use client"
import React, { useState, useEffect } from 'react';

function Search() {
  const [data, setData] = useState([]); //list of items from JSON
  const [search, setSearch] = useState(''); //Current search term

  useEffect(() => { //Fetching data
    fetch('CSCI.json')
      .then(response => response.json())
      .then(data => {
        setData(data.class);
      });
  }, []);

  const handleSearch = (event) => { //Filtering data
    setSearch(event.target.value);
  };

  const processedSearch = search.replace(/\s+/g, '').toLowerCase(); 
  
  const filteredData = data.filter(item => {
    return item.name.toLowerCase().replace(/\s+/g, '').includes(processedSearch) ||
      item.end.some(code => {
        const processedCode = code.replace(/\s+/g, '').toLowerCase();
        return processedCode.includes(processedSearch);
      });
  });

  return ( //Display 
    <div className="Search">
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <ul>
        {filteredData.length > 0 ? 
          filteredData.map((item, index) => (
            <li key={index}> {item.end[0]} - {item.name}</li>
          ))
          :
          <li>No search results</li>
        }
      </ul>
    </div>
  );
}

export default Search;
