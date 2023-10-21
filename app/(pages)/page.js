import Link from "next/link";

import Search from "../components/Search";

export default function Page() {
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Link href="/csci"><button>CSCI</button></Link>
      <Search/>
    </div>
  );
}
