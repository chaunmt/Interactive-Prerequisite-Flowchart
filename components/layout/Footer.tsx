import Link from "next/link";
import "../styles/Layout.css";

export default function Footer() {
  return (
    <div id="footer">
      <h2 id="clubName">© 2024 Social Coding</h2>

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
