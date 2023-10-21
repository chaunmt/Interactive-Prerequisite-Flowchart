"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Access from '../data/Access';

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
            <Link key={index}
                  href={'/' + Access.id(item)}  // Need some improvement in the data file
            > 
              <li>{Access.id(item)[0]} - {Access.title(item)}</li>
            </Link>
          ))
          :
          <li>No search results</li>
        }
      </ul>
    </div>
  );
}

export default Search;
