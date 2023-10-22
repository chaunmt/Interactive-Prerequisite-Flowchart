import Link from "next/link";
import Search from "../components/Search"
import Mermaid from "../components/Mermaid"

export default function Page() {
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      <Mermaid graph={`
        graph TD
        A[CSCI 1933] --> C[CSCI 2041]
        B[CSCI 2011] --> C
        A --> D[CSCI 4041]
        B --> D
        C --> E[CSCI 4011]
        `}/>
      <Search />
    </div>
  );
}
