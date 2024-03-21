import Link from "next/link";
import Image from "next/image";
import "../styles/Layout.css";

export default function Header() {
  return (
    <div id="header">
      <nav>
        <Link href={"/"}> 
          <Image 
            id="logo" 
            src={"/logos/CFLogo.webp"} 
            alt="interactive-prereq-logo" 
            width={1000} height={1000} // Pixel rendered
          />
        </Link>
      </nav>
      <ul>
        <li id="home">Home</li>
        <li id="about">About</li>
        <li id="subject">Subject</li>
        <li id="setting">Setting</li>
      </ul>
    </div>
  );
}
