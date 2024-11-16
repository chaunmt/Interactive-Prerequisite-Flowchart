import { Access, allSubjects } from "@/backend/access";
import NavigationSearchSmall from "@/components/search/NavigationSearchSmall";
import Link from "next/link";
import Graph from "@/components/graph/Graph";
import { Deck } from "@/components/deck/Deck";
import { FiDownload } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return {
    title: `${params.subj.toUpperCase()} ${params.id}`,
  };
}

export default function Page({ params }) {
  const SUBJ = params.subj.toUpperCase();
  const ID = params.id.toUpperCase();
  if (!allSubjects.includes(SUBJ)) notFound();
  if (!Access(SUBJ).ids.includes(ID)) notFound();

  let course = Access(SUBJ).getCourse(ID, "id");
  let targets = Access(SUBJ).target(course);
  let build = {
    includes: [course],
    simplify: false,
    decimate_orphans: false,
  };

  return (
    <div className="px-[5%] flex flex-col gap-4">
      <div className="w-full flex flex-col justify-between pb-4">
        <Link href={"/" + SUBJ}>
          <button className="text-2xl border-none shadow-[0_0_2px_var(--border)] cursor-pointer">
            <IoReturnUpBackOutline className="relative justify-center" />
          </button>
        </Link>
          <NavigationSearchSmall />
      </div>
      
      <div className="grid grid-cols-2">
        <div className="bg-[var(--graph-box)] pb-[2%]">
          <div className="p-4 flex items-center justify-between">
            <div 
              className="items-center text-[var(--warning)]"
              title="Prerequisite information is unreliable and subject to change during and between terms."
            >
              <b>*Possible Prerequisites</b>
            </div>
            <button className="text-2xl border-none bg-transparent p-0 m-0 cursor-pointer">
              <FiDownload />
            </button>
          </div>
          <Graph build={build} />
        </div>
        
        <div className="bg-[var(--info-box)] p-[5%] m-0">
          <div className="text-xl font-bold">
            {course.code}
          </div>
          <div className="text-xl font-bold">
            {course.title}
          </div>
          <p>{course.info}</p>
        </div>
      </div>
      
      <Deck courses={targets} />
    </div>
  );
}