import Link from "next/link";
import Search from "../components/Search"
import Mermaid from "../components/Mermaid"
import head from 'next/head'

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
<<<<<<< Updated upstream
      <div class="header">
        <div class="title"><h2>Gophers Prerequisites</h2></div>
      </div>
=======
      <div class="header">Gophers Prerequisites</div>
>>>>>>> Stashed changes
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      {/* ERROR: graph does not auto reload on changes */}
      <Mermaid graph = {graph}/>
      <Search />
       </div>
  );
}
