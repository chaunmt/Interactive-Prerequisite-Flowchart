import Link from "next/link";
// import Image from "next/image"
import logo from 'public/logo.png';


function Header(){
    return <div className="header">
                <nav> 
                    <img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisite_logo"/>
                <ul>
                    <li><a href='#'>About</a></li>
                    <li><a href='#'>Q&A</a></li>
                    <li><a href='https://github.com/chaunmt/Interactive-Prerequisite-Flowchart' target="_blank">Contribute to Github</a></li>
                </ul>
            </nav>
        </div>
   
}

export default Header