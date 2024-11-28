export type { Course, PrerequisiteRule };
export { isCourse, isAndRule, isOrRule };

interface Course {
  readonly uid: string;
  readonly code: string;
  readonly subject: string;
  readonly number: string;
  readonly honors: boolean;
  readonly writing: boolean;
  readonly name: string;
  readonly fullname: string;
  readonly info: string;
  readonly prereq: PrerequisiteRule;
}

function isCourse(arg: any): arg is Course {
  return (
    arg &&
    (arg as Course).uid !== undefined &&
    (arg as Course).code !== undefined &&
    (arg as Course).subject !== undefined &&
    (arg as Course).number !== undefined &&
    (arg as Course).name !== undefined &&
    (arg as Course).fullname !== undefined &&
    (arg as Course).info !== undefined &&
    (arg as Course).prereq !== undefined
  );
}

// functional style since JS has no pointers
type AndRule = { and: PrerequisiteRule[] };
type OrRule = { or: PrerequisiteRule[] };
type PrerequisiteRule =
  | AndRule // allows nesting
  | OrRule // allows nesting
  | string // uid corresponds to single course
  | {}; // no prereq (accepts any non-null type, test other cases first)

function isAndRule(arg: any): arg is AndRule {
  return arg && (arg as AndRule).and !== undefined;
}

function isOrRule(arg: any): arg is OrRule {
  return arg && (arg as OrRule).or !== undefined;
}
