import Link from "next/link";
import GraphSearch from "../components/GraphSearch";

import mermaid from "mermaid";
import '../components/styles/Layout.css';
import '../components/styles/Mainpage.css'

export default function Page() {
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      <br/> {/* this line break doesn't seem to do anything */}
      <GraphSearch />
      <footer/>
    </div>
  );
}
