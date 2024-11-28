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
    <input
      type="text"
      placeholder="Search By Class"
      value={value}
      onChange={sendQuery}
      className="border-0 outline-0 bg-[var(--search-bar)] p-[2%_5%] rounded-md shadow-sm"
    />
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
    <ul className="mt-1 mb-1 p-2">
      {filteredData.length > 0 ? (
        filteredData.map((result, index) => (
          <li
            key={index}
            className="pt-2 pr-2 text-gray-700 font-bold cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          >
            <Link href={result.href}>{result.display_text}</Link>
          </li>
        ))
      ) : (
        <li className="pt-2 pr-2 text-gray-700 font-bold">No search results</li>
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
    <div className="w-1/2 right-0 top-0">
      <SearchBar value={search} sendQuery={handleSearch} />
      <div className="absolute bg-white shadow-md max-h-60 w-96 overflow-y-auto z-50">
        {search && <SearchResultsList filteredData={results} />}
      </div>
    </div>
  );
}

export default NavigationSearchSmall;
