import Link from "next/link";
import GraphSearch from "../components/GraphSearch";

import mermaid from "mermaid";

export default function Page() {
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      <br/>
      <GraphSearch />
    </div>
  );
}
