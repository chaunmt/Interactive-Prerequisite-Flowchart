import Link from "next/link";
import Search from "../components/Search"

export default function Page() {
  return (
    <div>
      <h1>Welcome to "Interactive" Prerequisites</h1>
      <Search />
      <Link href="/csci"><button>CSCI</button></Link>
    </div>
  );
}