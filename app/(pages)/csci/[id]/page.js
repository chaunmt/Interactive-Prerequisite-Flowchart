import Link from "next/link";
import GraphSearch from "../../../components/GraphSearch";

export default function Page({ params }) {
  return (
    <div>
      <h1>You are on the CSCI {params.id} page.</h1>
      <p>Note: the graph does not currently update to match that—although it appears to be interactive with the search bar.</p>
      <Link href="/csci"><button>All CSCI Classes</button></Link>
      <br/> {/* this line break doesn't seem to do anything */}
      {/* THIS SHOULD BE A STATIC GRAPH */}
      <GraphSearch />
    </div>
  );
}

export async function getStaticPaths() {
  // TODO write getClassIDs() to take the department designator as a string and return a list of all course IDs as strings
  
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
