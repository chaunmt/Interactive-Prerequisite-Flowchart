import Link from "next/link";
// import Image from "next/image"
import logo from 'public/logo.png';


function Header(){
    return <div className="header">
                <nav> 
                <logo><a href='#'><img src="https://i.ibb.co/KsKrn80/Black-White-Minimalist-Business-Logo-1.png" alt="Black-White-Minimalist-Business-Logo-1" border="0"/></a></logo> 
                <ul>
                    {/* <li><a href='#'>About</a></li>
                    <li><a href='#'>Q&A</a></li>
                    <li><a href='#'>Info</a></li>
                    <li><a href='./table'>Course Table</a></li> */}
                    <li><a href='https://github.com/chaunmt/Interactive-Prerequisite-Flowchart' target="_blank">Contribute to Github</a></li>

                </ul>
                </nav>
                <mainlogo><a href='../'><img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisite_logo"/></a></mainlogo>
                <p>View all Prerequisite for classes at the University of Minnesota, Twin Cities!!</p>
            </div>
}



export default Header