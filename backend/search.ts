/// TODO consider turning this into an api endpoint instead
/// perhaps consider making separate logic for "catalog searching" (course/subjects separated too?)
/// as well as for "grad-planner searching" (show related courses to stuff in cart) when it's relevant

import { AccessAll } from "@/backend/access";

export { Search };

function Search() {
  const departments: readonly string[] = require(
    `../data/General/subjectNames.json`
  ).dept_mapping;
  const courses = AccessAll.courses;

  return {
    /** Return an array of Course that include a text */
    courseByName,
    /** Return an array of Department (type object[appreviation, name]) that include a text */
    deptByName,
    /** Return a string of full name of a department based on appreviation or name */
    exactDept,
  };

  /**
   * remove all whitespace and convert to lower-case with the hopes of
   * increasing search compatibility
   */
  function mash(text: string) {
    return text.toLowerCase().replaceAll(/\s/g, "");
  }

  function courseByName(text: string) {
    const l_text = mash(text);
    return courses.filter((course) => {
      const fullCodeName = course.code + " - " + course.title;
      return mash(fullCodeName).includes(l_text);
    });
  }

  function deptByName(text: string) {
    const l_text = mash(text);
    return Object.entries(departments)
      .filter(
        ([apr, name]) =>
          mash(apr).includes(l_text) ||
          l_text.startsWith(mash(apr)) ||
          mash(name).includes(l_text)
      )
      .map(([apr, name]) => ({ apr, name }));
  }

  function exactDept(text: string) {
    const l_text = mash(text);
    for (let apr in departments) {
      if (mash(apr) == l_text || mash(departments[apr]) == l_text) {
        return apr + " - " + departments[apr];
      }
    }
    return null;
  }
}
