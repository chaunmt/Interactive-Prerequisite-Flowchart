import Access from "../../data/access";

export default function Page() {
  let subject = 'CSCI'

  //console.log(Access('allCourses').getPrereq("code", "CSCI 1113"))

  // let A = Access('CSCI').getCourse('code', 'CSCI 4041H')
  let B = Access('CSCI').getCourse('code', 'CSCI 4041H')

  //console.log(Access('CSCI').isEqualCourses(A, B))

  let C = '3081V'
  let D = '3081H'
  console.log(Access('CSCI').isEqualId(C, D))

  return (
    <div>
    </div>
  );
}
