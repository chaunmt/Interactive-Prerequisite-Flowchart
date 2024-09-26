import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative flex flex-col text-center items-center">
      {/* <div> */}
      <h2>© 2023 Social Coding</h2>

      <Link
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
        target="_blank" // Open in new tab
      >
        <strong>Contribute to Github</strong>
      </Link>

      <Link href="mailto:truon417@umn.edu" className="text-[#8b80f9]">
        <h4>Contact Us</h4>
      </Link>
    </div>
  );
}
