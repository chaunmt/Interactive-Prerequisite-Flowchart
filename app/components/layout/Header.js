import Link from "next/link";
import Image from "next/image";
import "../styles/Layout.css";
import { ThemeSwitcher } from "../picker/ThemeSwitcher";
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Header() {
  //test dark mode branch
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
        <li id="home"><Link href={"/"}>Home</Link></li>
        <li id="about">About</li>
        <li id="subject">Subject</li>
        <li id="setting">Setting</li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>

    </div>
  );
}
