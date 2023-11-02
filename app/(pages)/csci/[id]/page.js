import Link from "next/link";
import Mermaid from "../../../components/Mermaid";
import Access from "../../../data/access";

/*** page stuff ***/

export default function Page({ params }) {
  var test = buildGraph("CSCI", params.id);
  
  return (
    <div>
      <h1>You are on the CSCI {params.id} page.</h1>
      <Link href="/"><button>Homepage</button></Link>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      <Mermaid graph={test}/>
    </div>
  );
}

// required for dynamic routing
export async function getStaticPaths() {
  // TODO use the data to return a list of all course IDs for a subject code
  const courselist = ['1133', '1933', '2011', '2021', '2033', '2041', '3081W', '4011', '4041', '4061', '4203', '4271W', '4611', '4707', '5103', '5105', '5106', '5115', '5117', '5123', '5125', '5143', '5161', '5204', '5221', '5271', '5302', '5304', '5421', '5451', '5461', '5481', '5511', '5512', '5521', '5523', '5551', '5552', '5561', '5563', '5608', '5609', '5611', '5619', '5708', '5751', '5801', '5802']; // placeholder for testing

  // just puts the list of page IDs in a format that is suitable for dynamic routing
  const paths = courselist.map(
    (num) => { return {params: {id: num,},}; }
  );
  return {
    paths,
    fallback: false,
  };
}

/*** graph building stuff ***/

function buildGraph(subjectCode, courseNumber) {
  console.log("buildgraph:", subjectCode, courseNumber)
  // It's easier to use Access("All") but I figured this would be much more efficient with the full data.
  let accessor = Access(subjectCode);  // should hopefully eat less RAM, and probably be faster too
  /*
   * this is a named lambda (anonymous function), which might seem needlessly complicated,
   * but I needed this part to be recursive and didn't want to declare a whole new helper
   * function just because there's one part of the string that should only be included once
   */
  const rec_helper = function (subj, idnum, acc) {
    console.log(':', subj, idnum)
    let graph = `${subj}_${idnum}[${subj} ${idnum}]\n`
    // early exit for 0xxx-level courses
    if (idnum < "1000") { return graph }

    /* commented out code to make this work for coursedog data
     * uncomment the commented code for post-mvp version (works on dummy data format)
     * post-mvp: hack mermaid for multiple styles
     * -> fix data format to distinguish and/or
     * -> use this
     */

    // let prereqs = acc.getPrereq("code", `${subj} ${idnum}`) || []
    let prereqs = acc.getPrereq("code", `${subj} ${idnum}`) /*** replace this with the above ***/
    // for (var i = 0; i < prereqs.length; i++) {
      // let req = prereqs[i].course || [] // this shouldn't need the null-safety, but just in case
      let req = prereqs.course /*** replace this with the above ***/
      for (var j = 0; j < req.length; j++) {
        let pre_subj = req[j].subject
        let pre_id = req[j].id
        let next_acc = (subj === pre_subj) ? acc : Access(pre_subj) // solely for optimization
        graph = graph + rec_helper(pre_subj, pre_id, next_acc) + `${pre_subj}_${pre_id} --> ${subj}_${idnum}\n`
      }
    // }
    return graph
  }

  return 'graph TD\n' + rec_helper(subjectCode, courseNumber, accessor)
}
