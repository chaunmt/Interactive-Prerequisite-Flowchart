import "../styles/Layout.css";

export default function Header() {
  return (
    <div className="header">
      <nav>
        <a href="../">
          <img src="./logo.png" alt="umn_prerequisite_logo"></img>
        </a>
        <ul>
          <li>
            <a
              href="https://github.com/chaunmt/Interactive-Prerequisite-Flowchart"
              target="_blank"
            >
              Contribute to Github
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
