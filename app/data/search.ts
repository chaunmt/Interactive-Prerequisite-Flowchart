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
    const l_text = text.toLowerCase()
    return courses
    .filter(course => {
      const fullCodeName = course.code + " - " + course.title;
      return fullCodeName.toLowerCase().includes(l_text);
    });
  }

  function deptByName(text: string) {
    const l_text = text.toLowerCase()
    return Object.entries(departments)
    .map(([apr, name]) => `${apr} - ${name}`)
    .filter((title) => title.toLowerCase().includes(l_text));
  }
}