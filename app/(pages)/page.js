// Home page - "google.com" w/ global search

import '../components/styles/Layout.css';
import '../components/styles/Mainpage.css';
import Footer from '../components/Footer.js';
import Header from '../components/MainPageHeader.js';
import Search from "../components/Search";

export default function Page() {
  return (
    <div>
      <Header/>
      {/* <GraphSearch /> */}
      <Search />
      <Footer/>
    </div>
  );
}
