import Link from "next/link";
import Mermaid from "../../../components/Mermaid";
import {buildGraph} from "../../../data/graphBuilder";
import logo from 'public/logo.png';
import '../../../components/styles/Layout.css'
import '../../../components/styles/GraphPage.css'

import Header from '../../../components/Header'



export default function Page({ params }) {
  var id = params.id;
  var subj = params.subj.toUpperCase();
  var test = buildGraph(`${subj} ${id}`);
  
  return (
    <div>
      <Header/>
      <h1>{subj} {id} </h1>
       {/* <Link href="/"><button>Homepage</button></Link> */}
      <Link href={`/${params.subj}`}><button>{subj} Page</button></Link>
      <Link href="./table"><button>{subj} Table</button></Link>
      <Mermaid graph={test}/>
    </div>
  );
}
