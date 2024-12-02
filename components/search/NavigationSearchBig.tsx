// I categorically disapprove of this entire module - jahndan, 2024-11-28

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "@/backend/search";

/**
 * Search Bar UI Component that accepts and sends back search query values
 *
 * (<input> but pretty)
 *
 * @callback sendQuery
 * @param {{value: string, sendQuery: function(event: any): void}} props
 * @returns
 */
export function SearchBar({
  value,
  sendQuery,
}: {
  value: string;
  sendQuery: (event: any) => void;
}) {
  // TODO reconsider hideous type

  return (
    <div className="relative w-[90%] sm:w-[50%] mx-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search By Class"
        value={value}
        onChange={sendQuery}
        className="w-full px-12 py-3 text-lg bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}

interface NavigationSearchResult {
  display_text: string;
  href: string;
}

/**
 * @param {NavigationSearchResult[]} searchResults results to be displayed in a list
 * @returns
 */
function SearchResultsList({
  filteredData,
}: {
  filteredData: NavigationSearchResult[];
}) {
  // TODO: inline vs hoverable list options, many options, this is meant to be customizable

  return (
    <ul className="mt-0.2 bg-white shadow-lg rounded-md max-h-60 w-[90%] sm:w-[48%] mx-auto border border-gray-200 overflow-y-auto">
      {filteredData.length > 0 ? (
        filteredData.map((result, index) => (
          <li
            key={index}
            className="py-2 px-4 rounded-md text-gray-700 font-medium cursor-pointer hover:bg-gray-100"
          >
            <Link href={result.href}>{result.display_text}</Link>
          </li>
        ))
      ) : (
        <li className="py-2 px-4 text-gray-500 font-medium text-center">
          No search results
        </li>
      )}
    </ul>
  );
}

/**
 * Global search bar that allows you to choose a department and narrow down
 * results from there
 */
function NavigationSearchBig() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // call Search utility to find depts/classes matching query
  useEffect(() => {
    // first 20 courses matching query
    const courses = Search().courseByName(search).slice(0, 20);
    // TODO: have some other handler deal with representation
    const results = courses.map((course) => ({
      display_text: `${course.code} - ${course.fullname}`,
      href: `/courses/${course.subject}/${course.number}`,
    }));
    setResults(results);
  }, [search, setResults]);

  // Handle the search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Render the search input and results
  return (
    <div className="text-center mt-8 w-full">
      <SearchBar value={search} sendQuery={handleSearch} />
      {/* <div className="bg-[var(--search-result-container)] shadow-sm max-h-60 w-100 overflow-y-auto z-[999]"> */}
        {search && <SearchResultsList filteredData={results} />}
      {/* </div> */}
    </div>
  );
}

export default NavigationSearchBig;
