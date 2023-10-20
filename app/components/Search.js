import React, { useState, useEffect } from 'react';

function SearchBar() {
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

  const filteredData = data.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase()) || 
           item.end.some(code => (`CSCI ${code}`).toLowerCase().includes(search.toLowerCase()));
  });

  return ( //Display 
    <div className="SearchBar">
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

export default SearchBar;
