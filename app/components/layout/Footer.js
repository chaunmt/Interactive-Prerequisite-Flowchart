import Link from "next/link";
import "../styles/Layout.css";

export default function Footer() {
  return (
    <div className="footer">
      <h2>© 2023 Social Coding</h2>
      <div className="hyperlink">
        <button>
          <Link
            href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Contribute to Github
          </Link>
        </button>
      </div>
    </div>
  );
}
