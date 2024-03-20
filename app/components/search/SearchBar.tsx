/**
 * SearchBar.tsx - Search Bar UI Component
 */
// import "../styles/SearchBar.css"

/**
 * Search Bar UI Component that accepts and sends back search query values
 * 
 * @callback sendQuery
 * @param {{value: string, sendQuery: function(event: any): void}} props 3edl;kfjas;l
 * @returns 
 */
export default function SearchBar({ value, sendQuery }: { value: string, sendQuery: (event: any) => void}) {
    // TODO reconsider hideous type

  return (
    <input
      type="text"
      placeholder="Search By Class"
      value={value}
      onChange={sendQuery}
      className="searchBar"
    />);
}