import Access from "../../data/access";

export default function Page() {
  let subject = 'CSCI'

  //console.log(Access('allCourses').getPrereq("code", "CSCI 1113"))

  let A = Access('CSCI').getCourse('code', 'CSCI 4041')
  let B = Access('CSCI').getCourse('code', 'CSCI 4041H')

  console.log(Access('CSCI').isEqualCourses(A, B))

  return (
    <div>
    </div>
  );
}
