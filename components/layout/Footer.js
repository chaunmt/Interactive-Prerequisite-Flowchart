import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative flex flex-col text-center items-center bottom-0 h-[10vh] w-full mt-auto mb-[5vh] bg-auto">
      <h2 className="text-[var(--footer-club-text)]">© 2023 Social Coding</h2>
      
      <Link
        className="text-[var(--footer-github-text)] font-bold"
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
        target="_blank"
      >
        Contribute to Github
      </Link>

      <Link href="mailto:truon417@umn.edu">
        <h4 className="text-[#8b80f9]">Contact Us</h4>
      </Link>
    </div>
  );
}
