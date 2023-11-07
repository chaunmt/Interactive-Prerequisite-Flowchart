import Link from "next/link";

function Header(){
    return <div className="header">
                <nav><img src='../photo/umn.png' alt="umn_logo" width="300"/>
                <ul>
                    <li><a href='#'>About</a></li>
                    <li><a href='#'>Q&A</a></li>
                    <li><a href='https://github.com/chaunmt/Interactive-Prerequisite-Flowchart' target="_blank">Contribute to Github</a></li>
                </ul>
            </nav>
        </div>
   
}

export default Header