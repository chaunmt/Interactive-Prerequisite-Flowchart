import Link from "next/link";
import "../styles/Layout.css";

export default function Footer() {
  return (
    <div id="footer">
      <h2 id="clubName">© 2023 Social Coding</h2>

      <Link
        id="github"
        href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
        target="_blank" // Open in new tab
      >
        <strong>Contribute to Github</strong>
      </Link>
    </div>
  );
}
