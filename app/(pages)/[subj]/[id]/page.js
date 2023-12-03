import Link from "next/link";
import Mermaid from "../../../components/Mermaid";
import {buildGraph, buildCombinedGraph} from "../../../data/graphBuilder";


export default function Page({ params }) {
  var id = params.id;
  var subj = params.subj.toUpperCase();
  var test = buildCombinedGraph([`${subj} ${id}`]);
  
  return (
    <div>
      <h1>You are on the {subj} {id} page.</h1>
      <Link href="/"><button>Homepage</button></Link>
      <Link href={`/${params.subj}`}><button>{subj} Page</button></Link>
      <Link href="./table"><button>{subj} Table</button></Link>
      <Mermaid graph={test}/>
    </div>
  );
}