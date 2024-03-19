// gonna use this for streamlined testing of graphbuilder algorithm (i'll remove this when i'm done with it)

import Mermaid from "../../components/Mermaid";
import buildGraph from "../../data/graphBuilder";

import Access, { AccessAll } from "../../data/access";
import {
  Course,
  CourseShell,
  PrereqFormat,
  PrereqTraversal,
} from "../../data/types";

export default function Page() {
  /* access.ts tests */

  let shell1 = {
    code: "MATH 5466",
    subject: "MATH",
    id: "5466",
  };
  let shell2 = {
    code: "MATH 5465",
    subject: "MATH",
    id: "5465",
  };
  let shell3 = {
    code: "CSCI 1133",
    subject: "CSCI",
    id: "1133",
  };

  let test1 = Access("CSCI").courses[0].title;
  let test2 = Access("CHEM").ids[0];
  let test3 = AccessAll.courses[0].code;
  let test4 = Access("MATH").isPrereq(shell2, Access("MATH").get(shell1));
  console.log(`=== targets of ${shell3.code}===`);
  console.log(Access("CSCI").target(shell3));

  /* graphBuilder.ts tests */

  let test = [
    // "MATH 1271",
    // "CSCI 1133",
    // "CSCI 2033",
    // "CSCI 5521",
    // "EE 5364",
    // "GEOG 5839",
    // "CHEM 1066",
    "MATS 3141",
    // "PHAR 6155",
    // "EE 4161W",
  ];
  let buildTests = test
    .map((code) => Access(code.split(" ")[0]).getCourse(code))
    .filter((e) => e !== null);
  let builtgraph = buildGraph(buildTests);

  return (
    <div>
      <h1>shhh... testing page</h1>
      test1 = Access(&quot;CSCI&quot;).courses[0].title = {test1}
      <br></br>
      test2 = Access(&quot;CSCI&quot;).ids[0] = {test2}
      <br></br>
      test3 = AccessAll.courses[0].code = {test3}
      <br></br>
      test4 = Access(&quot;MATH&quot;).isPrereq(shell2,
      Access(&quot;MATH&quot;).get(shell1)) = {test4 ? "true" : "false"}
      <br></br>
      {/* test5 = Access("MATH").target(shell1)[0].title = {test5} */}
      <Mermaid graph={builtgraph} />
    </div>
  );
}

export const metadata = {
  title: `Test | Gopher Prerequisite`,
};
