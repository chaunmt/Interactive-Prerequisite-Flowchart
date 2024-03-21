// Home page - "google.com" w/ global search

import "../components/styles/Layout.css";
import "../components/styles/Mainpage.css";
import { NavigationSearch } from "../components/search/NavigationSearch";

export default function Page() {
  return (
    <div>
      {/* <GraphSearch /> */}
      <NavigationSearch />
    </div>
  );
}

export const metadata = {
  title: `Home | Gopher Prerequisite`,
};
