// gonna use this for streamlined testing of graphbuilder algorithm (i'll remove this when i'm done with it)

import Link from "next/link";
import Mermaid from "../../components/Mermaid";
import {buildGraph} from "../../data/graphBuilder";

export default function Page() {
  var test = buildGraph([
    "CSCI 5521", 
    // "EE 5364",
    // "GEOG 5839",
    // "MATS 3141",
    // "PHAR 6155",
    // "EE 4161W",
  ]);
  
  return (
    <div>
      <h1>shhh... testing page</h1>
      <Mermaid graph={test}/>
    </div>
  );
}
