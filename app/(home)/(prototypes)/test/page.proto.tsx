import Graph, { BuildOptions } from "@/components/graph/Graph";
import { uid_get, prereqs } from "@/backend/access";
import { Course } from "@/data/types";
import * as YAML from "yaml";

export default function Page() {
  const build: BuildOptions = {
    includes: [
      "002187",
      "003675",
      "010795",
      // "793076",
      "803956",
      "004312",
      "002186",
    ],
    decimate_orphans: false,
  };

  const height = "";
  // const height = "h-4/5";

  return (
    <div id="content" className="flex gap-4 h-screen">
      <div id="preqs" className={`w-1/2 ${height} overflow-auto p-4`}>
        {build.includes
          .map((c) => [uid_get(c), ...prereqs(uid_get(c))])
          .flat()
          .map((c) => [c, ...prereqs(c)])
          .flat()
          .map((c) => [c, ...prereqs(c)])
          .flat()
          .map((c) => [c, ...prereqs(c)])
          .flat()
          .reduce((a: Course[], b) => {
            if (a.map((c) => c.uid).indexOf(b.uid) < 0) a.push(b);
            return a;
          }, [])
          .map((c) => (
            <div className="text-xs" key={c.uid}>
              <b>
                <pre>{c.uid + " – " + c.code}</pre>
              </b>
              <pre>{YAML.stringify(c.prereq, null)}</pre>
            </div>
          ))}
      </div>
      <div id="graph" className={`w-1/2 ${height} overflow-auto p-4`}>
        <Graph build={build} />
      </div>
    </div>
  );
}
