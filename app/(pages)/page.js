import Link from "next/link";
import GraphSearch from "../components/GraphSearch";

import mermaid from "mermaid";
import '../components/styles/Layout.css';
import '../components/styles/Mainpage.css';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';

export default function Page() {
  return (
    <div>
      <Header/>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      <br/> {/* this line break doesn't seem to do anything */}
      <GraphSearch />
      <Footer/>
    </div>
  );
}
