// page with dynamic graph generation and search bar for courses in [subj]

import Link from "next/link";
import {buildGraph} from "../../data/graphBuilder";
// import logo from 'public/logo.png';
import '../../components/styles/Layout.css'
import '../../components/styles/GraphPage.css'
import Mermaid from "../../components/Mermaid";

import Header from '../../components/Header'
import { GraphSearch } from '../../components/GraphSearch'


export default function Page({ params }) {
  var id = params.id;
  //todo: display 404 when data is unavailable
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
      {/* todo: running into errors with this for some reason, use eventually with actual data */}
      {/* <GraphSearch /> */}
    </div>
  );
}
