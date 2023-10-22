"use client";

import React, { useState, useEffect } from 'react';

import Access from "../data/Access"

function Search() {
  const [data, setData] = useState([]); //list of items from JSON
  const [search, setSearch] = useState(''); //Current search term

  // useEffect(() => { //Fetching data
  //   fetch('CSCI.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       setData(data.class);
  //     });
  // }, []);

  const handleSearch = (event) => { //Filtering data
    setSearch(event.target.value);
  };

  const processedSearch = search.replace(/\s+/g, '').toLowerCase(); 

  const filteredData = Access.courses().filter(item => {
    return Access.title(item).toLowerCase().replace(/\s+/g, '').includes(processedSearch) ||
      Access.id(item).some(code => {
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
            <li key={index}> {Access.id(item)[0]} - {Access.title(item)}</li>
          ))
          :
          <li>No search results</li>
        }
      </ul>
    </div>
  );
}

export default Search;