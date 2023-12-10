// gonna use this for streamlined testing of graphbuilder algorithm (i'll remove this when i'm done with it)

import Mermaid from "../../../components/Mermaid";
import {buildGraph, buildCombinedGraph} from "../../../data/graphBuilder";

export default function Page() {
  var test = buildCombinedGraph([
    "CSCI 5521", 
    // "EE 5364",
    // "GEOG 5839",
    // "MATS 3141",
    // "PHAR 6155",
    // "EE 4161W",
  ]);
  
  return (
    <div>
      <Link href="/"><button><img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisit_logo"/></button></Link>
      <h1>shhh... testing page</h1>
      <Mermaid graph={test}/>
    </div>
  );
}
