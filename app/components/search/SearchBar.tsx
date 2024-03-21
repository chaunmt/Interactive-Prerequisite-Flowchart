/**
 * SearchBar.tsx - Search Bar UI Component
 */
// import "../styles/SearchBar.css"

/**
 * Search Bar UI Component that accepts and sends back search query values
 *
 * (<input> but pretty)
 *
 * @callback sendQuery
 * @param {{value: string, sendQuery: function(event: any): void}} props
 * @returns
 */
export default function SearchBar({
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
      className="searchBar"
    />
  );
}
