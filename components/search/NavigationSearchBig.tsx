// I categorically disapprove of this entire module - jahndan, 2024-11-28

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "@/backend/search";

import { CiSearch } from "react-icons/ci";

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
    <div className="relative mx-auto w-[90%] sm:w-[50%]">
      {/* Search Icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <CiSearch className="size-6 text-gray-500" />
      </div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search By Class"
        value={value}
        onChange={sendQuery}
        className="w-full rounded-full border border-gray-300 bg-white px-12 py-3 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}

interface NavigationSearchResult {
  display_text: string;
  ref: string;
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
    <ul className="mt-0.2 mx-auto max-h-60 w-[90%] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg sm:w-[48%]">
      {filteredData.length > 0 ? (
        filteredData.map((result) => (
          <li
            key={result.display_text}
            className="cursor-pointer rounded-md px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            <Link href={result.ref}>{result.display_text}</Link>
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-center font-medium text-gray-500">
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
      ref: `/courses/${course.subject}/${course.number}`,
    }));
    setResults(results);
  }, [search, setResults]);

  // Handle the search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Render the search input and results
  return (
    <div className="mt-8 w-full text-center">
      <SearchBar value={search} sendQuery={handleSearch} />
      {/* <div className="bg-[var(--search-result-container)] shadow-sm max-h-60 w-100 overflow-y-auto z-[999]"> */}
      {search && <SearchResultsList filteredData={results} />}
      {/* </div> */}
    </div>
  );
}

export default NavigationSearchBig;
