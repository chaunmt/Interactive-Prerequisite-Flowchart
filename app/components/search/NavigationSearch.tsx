/**
 * NavigationSearch.tsx - Search UI whose results provide links to other pages
 */
"use client";
import SearchBar from "./SearchBar";
import { Search } from "../../data/search";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavigationSearchResult {
  display_text: string;
  href: string;
}

/**
 * @param {NavigationSearchResult[]} searchResults results to be displayed in a list
 * @returns 
 */
function SearchResultsList({ filteredData }: { filteredData: NavigationSearchResult[] }) {
  // TODO: inline vs hoverable list options, many options, this is meant to be customizable

  return (
    <ul className="list">
      {filteredData.length > 0 ? (
        filteredData.map((result, index) => (
          <li key={index}>
            <Link href={result.href}>
              {result.display_text}
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
  const [results, setResults] = useState([]);

  // call Search utility to find depts/classes matching query
  useEffect(() => {
    //first 5 departments matching query
    const depts = Search().deptByName(search).slice(0, 5);
    //first 20 courses matching query
    const courses = Search().courseByName(search).slice(0, 20);
    // TODO: have some other handler deal with representation
    const results = depts.map(({ apr, name}) => ({
      display_text: `${apr} - ${name}`,
      href: `/${apr}`
    }))
    results.push(...courses.map((course) => ({
      display_text: `${course.code} - ${course.title}`,
      href: `/${course.subject}/${course.id}`
    })));
    setResults(results);
  }, [search, setResults]);

  // Handle the search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Render the search input and results
  return (
    <div className="Search">
      <SearchBar value={search} sendQuery={handleSearch} />
      {search && <SearchResultsList filteredData={results} />}
    </div>
  );
}

export {
  NavigationSearch
};
