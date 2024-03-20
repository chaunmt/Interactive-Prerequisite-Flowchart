import { Course } from "./types";

import { AccessAll } from "./access";

export {
  Search
}

function Search() {
  const departments: readonly string[] = require(`./General/subjectNames.json`).dept_mapping;
  const courses: readonly Course[] = AccessAll.courses;

  return {
    courseByName,
    deptByName
  };

  function courseByName(text: string) {
    return courses
    .filter(course => {
      const fullCodeName = course.code + " - " + course.title;
      return fullCodeName.includes(text);
    });
  }

  function deptByName(text: string) {
    return Object.entries(departments)
    .filter(([apr, name]) => name.includes(text))
    .map(([apr, name]) => `${apr} - ${name}`);
  }
}