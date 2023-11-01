import Link from "next/link";
import Mermaid from "../../../components/Mermaid";

// this stuff will probably end up in access.js once we migrate from the old data,
// but for now I'm leaving it here since it's not ready for that yet
var courses_data = new Map();
var subject_list = ["CSCI", "MATH"]; // placeholder for testing
subject_list.forEach(subject => {
  var subject_data = require(`../../../data/Dummy/${subject}.json`);
  courses_data.set(subject, subject_data);
});

function findCourse(subjectCode, courseNumber) {
  var course = courses_data.get(subjectCode).filter(item => {
    return item.subject == subjectCode && item.id == courseNumber;
  });
  return course;
}

function buildGraph(subjectCode, courseNumber) {
  var current = findCourse(subjectCode, courseNumber);
  if (current.prereq == null) {
    // `CSCI_1133[CSCI 1133]\n`
    return `${current.subject}_${current.id}[${current.subject} ${current.id}]\n`;
  } else {
    // `CSCI_1933[CSCI 1933]\n` + buildGraph(CSCI, 1133) + `CSCI_1133 --> CSCI_1933\n`
    return `${current.subject}_${current.id}[${current.subject} ${current.id}]\n` + current.prereq.map(req => {
      return req.map(course => {
        return buildGraph(course.subject, course.id) + `${course.subject}_${course.id} --> ${current.subject}_${current.id}`;
      }).join('\n');
    }).join('\n');
  }
}



export default function Page({ params }) {
  // var test; if (findCourse("CSCI", params.id).includes()) {test = "s";} else {test ="n";}

  return (
    <div>
      <h1>You are on the CSCI {params.id} page.</h1>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      {/* <h2>{ test }</h2> */}
      {/* <p>{findCourse("CSCI", params.id)}</p> */}
      {/* <p>{buildGraph("CSCI", params.id)}</p> */}
      <Mermaid graph={buildGraph("CSCI", params.id)}/>
    </div>
  ); // the commented out bits are several things I tried to probe at the objects I've created trying to read the json
}

export async function getStaticPaths() {
  // TODO write getClassIDs() to return a list of all course IDs for a subject code
  // placeholder for testing
  const courselist = ['1133', '1933', '2011', '2021', '2033', '2041', '3081W', '4011', '4041', '4061', '4203', '4271W', '4611', '4707', '5103', '5105', '5106', '5115', '5117', '5123', '5125', '5143', '5161', '5204', '5221', '5271', '5302', '5304', '5421', '5451', '5461', '5481', '5511', '5512', '5521', '5523', '5551', '5552', '5561', '5563', '5608', '5609', '5611', '5619', '5708', '5751', '5801', '5802'];

  const paths = courselist.map(
    (num) => { return {params: {id: num,},}; }
  ); // just puts the list of page IDs in a format that is suitable for dynamic routing
  return {
    paths,
    fallback: false,
  };
}
