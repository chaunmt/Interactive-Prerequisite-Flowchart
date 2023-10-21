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

  // Improve filter with ignore space maybe?
  // For example, csci4 should show csci4041 instead of no result
  const filteredData = Access.courses().filter(item => {
    return Access.title(item).toLowerCase().includes(search.toLowerCase()) || 
           Access.id(item).some(code => (`CSCI ${code}`).toLowerCase().includes(search.toLowerCase()));
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
