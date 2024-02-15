// gonna use this for streamlined testing of graphbuilder algorithm (i'll remove this when i'm done with it)

// import Mermaid from "../../components/Mermaid";
// import {buildGraph, buildCombinedGraph} from "../../data/graphBuilder";

import Access from "../../data/access";
import { Course, CourseShell, PrereqFormat, PrereqTraversal } from "../../data/types"

export default function Page() {
  // var test = buildCombinedGraph([
  //   "CSCI 5521", 
  //   // "EE 5364",
  //   // "GEOG 5839",
  //   // "MATS 3141",
  //   // "PHAR 6155",
  //   // "EE 4161W",
  // ]);

  /**BUGS REPORT:
   * Error: Invalid subject "FAVICON.ICO" passed to Access module!
   */

  let course1 = {
    code: "CSCI 4061",
    subject: "CSCI",
    id: "4061"
  }

  let test1 = Access("CSCI").courses[0].title;
  let test2 = Access("CHEM").ids[0];
  // let test3 = Access("CSCI").get(course1);

  return (
    <div>
      {/* <Link href="/"><button><img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisit_logo"/></button></Link>
      <h1>shhh... testing page</h1>
      <Mermaid graph={test}/> */}
      test1 = Access("CSCI").courses[0].title = {test1}
      <br></br>
      test2 = Access("CSCI").ids[0] = {test2}
      <br></br>
      {/* test3 = Access("CSCI").get(course1) = {test3} */}
    </div>
  );
}
