// I categorically disapprove of this entire module - jahndan, 2024-11-28

/// TODO consider turning this into an api endpoint instead
/// perhaps consider making separate logic for "catalog searching" (course/subjects separated too?)
/// as well as for "grad-planner searching" (show related courses to stuff in cart) when it's relevant

import { general, honors } from "@/backend/access";
// import departments from "@/data/UMNTC/allSubjects.json";

export function Search(honor?: boolean) {
  const courses = honor ? Object.values(honors) : Object.values(general);

  return {
    /** Return an array of Course that include a text */
    courseByName,

    /** @deprecated strongly because dept pages no longer exist */
    /** Return an array of Department (type object[appreviation, name]) that include a text */
    // deptByName,
    /** Return a string of full name of a department based on appreviation or name */
    // exactDept,
  };

  /**
   * removes all whitespace and convert to lower-case
   * with the hopes of increasing search compatibility
   */
  function mash(text: string) {
    return text.toLowerCase().replaceAll(/\s/g, "");
  }

  function courseByName(text: string) {
    const l_text = mash(text);
    return courses.filter((course) => {
      const fullCodeName = course.code + " - " + course.fullname;
      return mash(fullCodeName).includes(l_text);
    });
  }

  // function deptByName(text: string) {
  //   const l_text = mash(text);
  //   return Object.entries(departments)
  //     .filter(
  //       ([apr, name]) =>
  //         mash(apr).includes(l_text) ||
  //         l_text.startsWith(mash(apr)) ||
  //         mash(name).includes(l_text),
  //     )
  //     .map(([apr, name]) => ({ apr, name }));
  // }
  // function exactDept(text: string) {
  //   const l_text = mash(text);
  //   for (let apr in departments) {
  //     if (mash(apr) === l_text || mash(departments[apr]) === l_text) {
  //       return apr + " - " + departments[apr];
  //     }
  //   }
  //   return null;
  // }
}
