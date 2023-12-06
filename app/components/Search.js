import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Search({ sendResults }) {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const subject = search.match(/[a-zA-Z]+/g)?.[0].toUpperCase();
    if (subject) {
      import(`../data/Dog/${subject}.json`)
        .then((module) => {
          setCourses(module.default); //array of courses
        })
        .catch((e) => {
          console.error("Failed to load subject data", e);
          setCourses([]);
        });
    }
  }, [search]);

  // Filter courses, search term
  useEffect(() => {
    if (courses.length) {
      const processedSearch = search.replace(/\s+/g, '').toLowerCase();
      const results = courses.filter(course => {
        return course.title.toLowerCase().includes(processedSearch) ||
               course.code.toLowerCase().replace(/\s+/g, '').includes(processedSearch);
      });
      setFilteredData(results);
    }
  }, [search, courses]);

  // Handle the search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Render the search input and results
  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search By Class"
        value={search}
        onChange={handleSearch}
        className="searchBar"
      />
      {search && (
        <ul className='list'>
          {filteredData.length > 0 ? (
            filteredData.map((course, index) => (
              <li key={index}>
                <Link href={`/course/${course.code}`}>
                  {course.code} - {course.title}
                </Link>
              </li>
            ))
          ) : (
            <li>No search results</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
