/** program catalog home */

import GopherMajorBarChart from "@/components/gmp/GopherMajorBarChart";

// placeholder

export default function Page() {
  /* 
      Mini Documentation For GopherMajorBarChart

      - Barchart and Checklist are enabled by default
      - Disable either of them with "disableBarChart = true" or "disableChecklist = true"
      - myCourseIDs is required and takes in an array of courseIDs; ex: ["11111", "22222", "33333"] 
      - myMajor is optional. Use myMajor only if Checklist is enabled and match myMajor with one of the programs in programNames.json
  */
  return (
    <div>
      <GopherMajorBarChart
        myCourseIDs={["111111", "222222"]}
        disableChecklist={true}
      />
    </div>
  );
}
