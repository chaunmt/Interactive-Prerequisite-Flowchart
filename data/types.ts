/** sorting things out */

export type { CourseShell, Course, PrereqFormat };
export { isCourseShell, isCourse };

interface CourseShell {
  readonly uid: string;
  readonly code: string;
  readonly subject: string;
  readonly number: string;
  readonly honors: boolean;
}

interface Course extends CourseShell {
  readonly writing: boolean;
  readonly name: string;
  readonly fullname: string;
  readonly info: string;
  readonly prereq: PrereqFormat;
}

type PrereqFormat =
  | string // uid corresponds to single course
  | { and: PrereqFormat[] } // nested data type
  | { or: PrereqFormat[] } // nested data type
  | {}; // no prereq

function isCourseShell(arg: any): arg is CourseShell {
  return (
    arg &&
    (arg as Course).uid !== undefined &&
    (arg as Course).code !== undefined &&
    (arg as Course).subject !== undefined &&
    (arg as Course).number !== undefined
  );
}

function isCourse(arg: any): arg is Course {
  return (
    isCourseShell(arg) &&
    (arg as Course).name !== undefined &&
    (arg as Course).fullname !== undefined &&
    (arg as Course).info !== undefined &&
    (arg as Course).prereq !== undefined
  );
}
