import { AccessAll } from "../../data/access";

import Graph, {
  build_options,
  display_options,
} from "../../components/graph/Graph";

export default function Page() {
  // test data
  let incl = [
    // "EE 5364",
    "CSCI 4041",
    "CSCI 2033",
    "MATH 4281",
    "MATH 4242",
  ].map((code) => AccessAll.getCourse(code));
  let soft = [
    "MATH 1271",
    "CSCI 2033",
    // "PHYS 2503",
    // "PHYS 1302",
    "PHYS 1301",
  ].map((code) => AccessAll.getCourse(code));
  let hard = [
    "MATH 2263",
    "MATH 2283",
    "CSCI 1913",
    // "CHEM 1066",
    // "CHEM 1062",
  ].map((code) => AccessAll.getCourse(code));
  let simpl = undefined;
  let deci = true;

  let build: build_options = {
    includes: incl,
    soft_excludes: soft,
    hard_excludes: hard,
    simplify: simpl,
    decimate_orphans: deci,
  };
  let display: display_options = {
    orientation: "TB",
  };

  return (
    <div id="testing">
      <Graph build={build} display={display} />
      {/* <Mermaid graph={input} /> */}
    </div>
  );
}
