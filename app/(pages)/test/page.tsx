import { AccessAll } from "../../data/access";
import Graph, {
  build_options,
  display_options,
} from "../../components/graph/Graph";
import { Course, CourseShell } from "../../data/types";

export default async function Page() {
  // // test data
  // let incl: CourseShell[] = [
  //   // "EE 5364",
  //   "CSCI 4041",
  //   "CSCI 2033",
  //   "MATH 4281",
  //   "MATH 4242",
  // ].map((code) => AccessAll.getCourse(code));
  // let soft: CourseShell[] = [
  //   "MATH 1271",
  //   "CSCI 2033",
  //   // "PHYS 2503",
  //   // "PHYS 1302",
  //   "PHYS 1301",
  // ].map((code) => AccessAll.getCourse(code));
  // let hard: CourseShell[] = [
  //   "MATH 2263",
  //   "MATH 2283",
  //   "CSCI 1913",
  //   // "CHEM 1066",
  //   // "CHEM 1062",
  // ].map((code) => AccessAll.getCourse(code));
  // let simpl = true;
  // let deci = true;

  // let build: build_options = {
  //   includes: incl,
  //   soft_excludes: soft,
  //   hard_excludes: hard,
  //   simplify: simpl,
  //   decimate_orphans: deci,
  // };
  // let display: display_options = {
  //   orientation: "DOWN",
  // };

  const body = {
    include: undefined,
    folded: [],
    exclude: [{ code: "CSCI 1133", subj: "CSCI", id: "1133" }],
  };
  const req: RequestInit = {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    body: JSON.stringify(body),
  };
  const res = await fetch("/api/graphbuilder?simplify=false", req);

  return (
    <div id="testing">
      {/* <p>{JSON.stringify(res)}</p> */}
      {/* <Graph build={build} display={display} /> */}
      {/* <Mermaid graph={input} /> */}
    </div>
  );
}
