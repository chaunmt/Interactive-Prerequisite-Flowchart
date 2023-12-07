// Home page - "google.com" w/ global search

import Link from "next/link";
import GraphSearch from "../components/GraphSearch";
import mermaid from "mermaid";
import '../components/styles/Layout.css';
import '../components/styles/Mainpage.css';
import Footer from '../components/Footer.js';
import Header from '../components/MainPageHeader.js';

export default function Page() {
  return (
    <div>
      <Header/>
      <GraphSearch />
      <Footer/>
    </div>
  );
}
