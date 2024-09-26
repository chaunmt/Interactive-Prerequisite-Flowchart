import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative flex flex-col text-center items-center">
      <h2 id="clubName">© 2023 Social Coding</h2>

      <Link
        id="github"
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
        target="_blank" // Open in new tab
      >
        <strong>Contribute to Github</strong>
      </Link>

      <Link href="mailto:truon417@umn.edu">
        <h4>Contact Us</h4>
      </Link>
    </div>
  );
}
