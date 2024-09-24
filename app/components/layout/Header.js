import Link from "next/link";
import Image from "next/image";
import "../styles/Layout.css";
import { ThemeSwitcher } from "../picker/ThemeSwitcher";
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Header() {
  //test dark mode branch
  return (
    <div id="header" className="bg-stone-300 dark:bg-slate-900">
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
        <li id="navigatable"><Link href={"/"}>Home</Link></li>
        <li id="navigatable">About</li>
        <li id="navigatable">Subject</li>
        <li id="navigatable">Setting</li>
        <li id="navigatable">
          <Link href="mailto:truon417@umn.edu">
            <>Contact</>
          </Link>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>

    </div>
  );
}
