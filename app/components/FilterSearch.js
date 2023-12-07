/**
 * FilterSearch.js - Adapted from Search.js (~11/1/23)
 * 
 * operates on provided data to show a filtered list matching the search query
 */

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Access from "../data/access"

function FilterSearch({ sourceData, sendResults }) {
//   const [data, setData] = useState([]); //list of items from JSON
  const [search, setSearch] = useState(''); //Current search term

  const processedSearch = search.replace(/\s+/g, '').toLowerCase(); 

  const filteredData = sourceData.filter(item => {
    return item.title.toLowerCase().replace(/\s+/g, '').includes(processedSearch) ||
      item.code.replace(/\s+/g, '').toLowerCase().includes(processedSearch)
      });

  const handleSearch = (event) => { //Filtering data
    setSearch(event.target.value);
  };

  useEffect(() => { //Filtering data
    sendResults(filteredData)
  }, [search]);


  return ( //Display 
    <div className="Search"> 
      <input type="text" placeholder="Search By Class" onChange={handleSearch} className="searchBar" />
      {search.trim()!==""&&(
      <ul className='list'>
        {filteredData.length > 0 ? 
          filteredData.map((item, index) => (
            <li key={index}> 
              <Link
                href={`/${item.subject}/${item.id}`}
                style={{ textDecoration: 'none' }}
                className="link">
                {item.code} - {item.title}
              </Link>
            </li>
          ))
          :
          <li>No search results</li>
        }
      </ul>)}
    </div>
  )};


export default FilterSearch;