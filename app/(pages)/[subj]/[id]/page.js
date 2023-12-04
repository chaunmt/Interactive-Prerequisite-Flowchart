import Link from "next/link";
import Mermaid from "../../../components/Mermaid";
import {buildGraph} from "../../../data/graphBuilder";
import logo from 'public/logo.png';


export default function Page({ params }) {
  var id = params.id;
  var subj = params.subj.toUpperCase();
  var test = buildGraph(`${subj} ${id}`);
  
  return (
    <div>
      <a href='../'><img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisite_logo"/></a>
      <h1>You are on the {subj} {id} page.</h1>
       {/* <Link href="/"><button>Homepage</button></Link> */}
      <Link href={`/${params.subj}`}><button>{subj} Page</button></Link>
      <Link href="./table"><button>{subj} Table</button></Link>
      <Mermaid graph={test}/>
    </div>
  );
}
