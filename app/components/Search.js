"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Access from "../data/Old/Access"

function Search({ sendResults }) {
  const [data, setData] = useState([]); //list of items from JSON
  const [search, setSearch] = useState(''); //Current search term

  // useEffect(() => { //Fetching data
  //   fetch('CSCI.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       setData(data.class);
  //     });
  // }, []);

  const processedSearch = search.replace(/\s+/g, '').toLowerCase(); 

  const filteredData = Access.courses().filter(item => {
    return Access.title(item).toLowerCase().replace(/\s+/g, '').includes(processedSearch) ||
      Access.id(item).some(code => {
        const processedCode = code.replace(/\s+/g, '').toLowerCase();
        return processedCode.includes(processedSearch);
      });
  });

  const handleSearch = (event) => { //Filtering data
    setSearch(event.target.value);
  };

  useEffect(() => { //Filtering data
    sendResults(filteredData)
  }, [search]);


  return ( //Display 
    <div className="Search"> 
      <input type="text" placeholder="Search By Class" onChange={handleSearch} />
      <ul>
        {filteredData.length > 0 ? 
          filteredData.map((item, index) => (
            <li key={index}> 
              <Link
                href={'/csci/' + Access.onlyNum(Access.id(item)[0])}
              >
                {Access.id(item)[0]} - {Access.title(item)}
              </Link>
            </li>
          ))
          :
          <li>No search results</li>
        }
      </ul>
    </div>
  );
}

export default Search;