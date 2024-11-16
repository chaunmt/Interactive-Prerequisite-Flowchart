import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const tabStyle = "flex p-[10%] justify-center items-center cursor-pointer rounded-md font-semibold hover:bg-[var(--header-block-hover)] hover:text-[var(--dark-gray-2)]";
  return (
    <div className="fixed flex justify-between items-center top-0 left-0 w-full h-[10%] bg-[var(--header-bar)] border-b border-[var(--header-bar-border)] border-b-[0.03%] p-[0.5%]">
      <nav className="w-[10%] self-start">
        <Link href="/"> 
          <Image 
            className="w-[10vh] h-auto pl-[1vh]"
            src="/logos/CFLogo.webp"
            alt="interactive-prereq-logo" 
            width={1000}
            height={1000}
          />
        </Link>
      </nav>
      <ul className="flex flex-row justify-end list-none mr-[1%] gap-[0.2%]">
        <li className={tabStyle}>
          <Link href="/">Home</Link>
        </li>
        <li className={tabStyle}>
          About
        </li>
        <li className={tabStyle}>
          Subject
        </li>
        <li className={tabStyle}>
          Setting
        </li>
      </ul>
    </div>
  );
}