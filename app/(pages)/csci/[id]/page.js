import Link from "next/link";
import Mermaid from "../../../components/Mermaid";
import {buildGraph, buildCombinedGraph} from "../../../data/graphBuilder";


export default function Page({ params }) {
  var test = buildCombinedGraph([`CSCI ${params.id}`]);
  
  return (
    <div>
      {/* <h1>You are on the {params.subj.toUpperCase()} {params.id} page.</h1> */}
      <Link href="/"><button>Homepage</button></Link>
      {/* <Link href={`/${params.subj}`}><button>All {params.subj.toUpperCase()} Classes</button></Link> */}
      <Link href="/csci"><button>All {params.subj.toUpperCase()} Classes</button></Link>
      <Mermaid graph={test}/>
    </div>
  );
}

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
