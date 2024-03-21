import { Course } from "./types";

import { AccessAll } from "./access";

export { Search };

function Search() {
  const departments: readonly string[] = require(
    `./General/subjectNames.json`,
  ).dept_mapping;
  const courses: readonly Course[] = AccessAll.courses;

  return {
    courseByName,
    deptByName,
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
}
