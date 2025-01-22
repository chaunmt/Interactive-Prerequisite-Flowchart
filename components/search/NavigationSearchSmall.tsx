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
    <div className="relative">
      {/* Search Icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <CiSearch className="size-5" />
      </div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search By Class"
        value={value}
        onChange={sendQuery}
        className="w-[19%] rounded-md border border-gray-300 bg-[var(--search-bar)] bg-white px-12 py-3 shadow-sm outline-0 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
    <ul className="mb-1 mt-1 p-2">
      {filteredData.length > 0 ? (
        filteredData.map((result) => (
          <li
            key={result.display_text}
            className="cursor-pointer pr-2 pt-2 font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Link href={result.ref}>{result.display_text}</Link>
          </li>
        ))
      ) : (
        <li className="pr-2 pt-2 font-bold text-gray-700">No search results</li>
      )}
    </ul>
  );
}

/**
 * Global search bar that allows you to choose a department and narrow down
 * results from there
 */
function NavigationSearchSmall() {
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
    <div className="right-0 top-0">
      <SearchBar value={search} sendQuery={handleSearch} />
      <div className="absolute z-50 mt-1 max-h-60 w-[19%] overflow-y-auto bg-white shadow-md">
        {search && <SearchResultsList filteredData={results} />}
      </div>
    </div>
  );
}

export default NavigationSearchSmall;
