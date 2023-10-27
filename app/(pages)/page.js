import Link from "next/link";
import Search from "../components/Search"
import Mermaid from "../components/Mermaid"
//import MainPage from "../styles/MainPage"

export default function Page() {
  const graph = `
  graph TD
  CSCI_1933[CSCI 1933]
  CSCI_2011[CSCI 2011]
  CSCI_2041[CSCI 2041]
  CSCI_4041[CSCI 4041]
  CSCI_4011[CSCI 4011]
  CSCI_1933 --> CSCI_2041
  CSCI_2011 --> CSCI_2041 & CSCI_4041
  CSCI_1933 --> CSCI_4041
  CSCI_2041 --> CSCI_4011 --> something
  `
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      {/* ERROR: graph does not auto reload on changes */}
      <Mermaid graph = {graph}/>
      <Search />
      
    </div>
  );
}
