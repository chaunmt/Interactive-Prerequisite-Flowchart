import { Course } from "./types";

import { AccessAll } from "./access";

export { Search };

function Search() {
  const departments: readonly string[] = require(
    `./General/subjectNames.json`,
  ).dept_mapping;
  const courses: readonly Course[] = AccessAll.courses;

  return {
    /** Return an array of Course that include a text */
    courseByName,
    /** Return an array of Department (type object[appreviation, name]) that include a text */
    deptByName,
    /** Return a string of full name of a department based on appreviation or name */
    exactDept
  };

  function courseByName(text: string) {
    const l_text = text.toLowerCase();
    return courses.filter((course) => {
      const fullCodeName = course.code + " - " + course.title;
      return fullCodeName.toLowerCase().includes(l_text);
    });
  }

  function deptByName(text: string) {
    const l_text = text.toLowerCase();
    return Object.entries(departments)
      .filter(
        ([apr, name]) =>
          apr.toLowerCase().includes(l_text) ||
          l_text.startsWith(apr.toLowerCase()) ||
          name.toLowerCase().includes(l_text),
      )
      .map(([apr, name]) => ({ apr, name }));
  }

  function exactDept(text: string) {
    const l_text = text.toLowerCase();
    for (let apr in departments) {
      if (apr.toLowerCase() == l_text || departments[apr].toLowerCase() == l_text) {
        return apr + " - " + departments[apr];
      }
    }
    return null;
  }
}
