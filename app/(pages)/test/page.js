import Access from "../../data/access";

export default function Page() {
  let subject = 'CSCI'

  console.log(Access('All').getPrereq("code", "CSCI 1113")[0].course[0])

  return (
    <div>
    </div>
  );
}
