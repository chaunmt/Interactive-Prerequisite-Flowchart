// Home page - "google.com" w/ global search

import '../components/styles/Layout.css';
import '../components/styles/Mainpage.css';
import Search from "../components/Search";

export default function Page() {
  return (
    <div>
      {/* <GraphSearch /> */}
      <Search />
    </div>
  );
}


export const metadata = {
  title: `Home | Gopher Prerequisite`,
  description: '...',  // ??
}