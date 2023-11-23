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
      <input type="text" placeholder="Search By Class" onChange={handleSearch} className="searchBar" />
      {search.trim()!==""&&(
      <ul className='list'>
        {filteredData.length > 0 ? 
          filteredData.map((item, index) => (
            <li key={index}> 
              <Link
                href={'/csci/' + Access.onlyNum(Access.id(item)[0])}
                style={{ textDecoration: 'none' }}
                className="link">
                {Access.id(item)[0]} - {Access.title(item)}
              </Link>
            </li>
          ))
          :
          <li>No search results</li>
        }
      </ul>)}
    </div>
  )};


export default Search;

//still working on it
/*
function Search({ sendResults }) {
  const [inputValue, setInputValue] = useState('');
  const [subject, setSubject] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubject(inputValue.trim().toUpperCase()); //subject code format
  };

  useEffect(() => {
    if (subject) {
      const access = Access(subject);
      sendResults(access.courses());
    }
  }, [subject]);

  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (subject) {
      const access = Access(subject);
      const processedSearch = inputValue.replace(/\s+/g, '').toLowerCase();

      // Filter based on the new data format
      const result = access.courses().filter(course => {
        return course.title.toLowerCase().replace(/\s+/g, '').includes(processedSearch) ||
               course.code.toLowerCase().replace(/\s+/g, '').includes(processedSearch);
      });

      setFilteredData(result);
      sendResults(result);
    }
  }, [inputValue, subject]);
*/
