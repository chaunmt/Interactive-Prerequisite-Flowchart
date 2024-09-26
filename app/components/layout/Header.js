import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const headerComponents = ["Home", "About", "Subject", "Setting"];
  return (
    <div className="fixed flex justify-between items-center w-full h-[10%] bg-[color:var(--header-bar)] border-[color:var(--header-bar-border)] p-[0.5%] border-t-0 border-b-[0.03%] border-x-0 border-solid left-0 top-0">
      <nav>
        <Link href={"/"}>
          <Image
            id="logo"
            src={"/logos/CFLogo.webp"}
            alt="interactive-prereq-logo"
            width={1000}
            height={1000} // Pixel rendered
          />
        </Link>
      </nav>
      <ul className="justify-end flex flex-row list-none gap-[0.2%] mr-[1%]">
        {headerComponents.map((item, index) => (
          <li
            key={index}
            className="flex justify-center items-center cursor-pointer font-semibold p-[10%] rounded-[0.4rem] hover:bg-[color:var(--header-block-hover)] hover:text-[color:var(--dark-gray-2)"
          >
            {index === 0 ? <Link href={"/"}>Home</Link> : <div>{item}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
