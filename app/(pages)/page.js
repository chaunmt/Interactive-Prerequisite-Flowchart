import Link from "next/link";
import Search from "../components/Search"
import Mermaid from "../components/Mermaid"

export default function Page() {
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      {/* ERROR: mermaid graph does not autoload on changes */}
      <Mermaid graph={`
        graph TD
        A[CSCI 1933]
        B[CSCI 2011]
        C[CSCI 2041]
        D[CSCI 4041]
        E[CSCI 4011]
        A --> C
        B --> C
        A --> D
        B --> D
        C --> E
        `}/>
      <Search />
    </div>
  );
}
