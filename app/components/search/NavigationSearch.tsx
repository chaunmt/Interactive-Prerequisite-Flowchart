/**
 * NavigationSearch.tsx - Search UI whose results provide links to other pages
 */
"use client";
import SearchBar from "./SearchBar";

import React, { useState, useEffect, Component } from "react";
import Link from "next/link";

/**
 * // TODO: make SearchResult[] object or something with onClick that can do a
 * // react Link or handler function somehow 
 * // (prolly another component now that i think about it)
 * 
 * @param {any[]} searchResults results to be displayed in a list
 * @returns 
 */
function SearchResultsList({ filteredData }: { filteredData: any[] }) {
  // TODO: inline vs hoverable list options, many options, this is meant to be customizable

  return (
    <ul className="list">
      {filteredData.length > 0 ? (
        <li>
          <Link href={`/${filteredData[0].subject}`}>
            {filteredData[0].subject}
          </Link>
        </li>
      ) : (
        ""
      )}
      {filteredData.length > 0 ? (
        filteredData.map((course, index) => (
          <li key={index}>
            <Link href={`/${course.subject}/${course.id}`}>
              {course.code} - {course.title}
            </Link>
          </li>
        ))
      ) : (
        <li>No search results</li>
      )}
    </ul>
  );
}

/**
 * Global search bar that allows you to choose a department and narrow down 
 * results from there
 */
function NavigationSearch() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const subject = search.match(/[a-zA-Z]+/g)?.[0].toUpperCase();
    if (subject) {
      import(`../../data/Dog/${subject}.json`)
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
      const processedSearch = search.replace(/\s+/g, "").toLowerCase();
      const results = courses.filter((course) => {
        return (
          course.title.toLowerCase().includes(processedSearch) ||
          course.code
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(processedSearch)
        );
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
      <SearchBar value={search} sendQuery={handleSearch} />
      {search && <SearchResultsList filteredData={filteredData} />}
    </div>
  );
}

export {
  NavigationSearch
};
