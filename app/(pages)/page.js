// Home page - "google.com" w/ global search

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
      <br/> {/* this line break doesn't seem to do anything */}
      <GraphSearch />
      <Footer/>
    </div>
  );
}
