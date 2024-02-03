export interface CourseShell {
    readonly code: string;
    readonly subject: string;
    readonly id: string;
}

export interface Course extends CourseShell {
    readonly title: string;
    readonly info: string;
    readonly prereq: PrereqFormat;
}

export type PrereqFormat = {
    and?: PrereqFormat[];
    or?: PrereqFormat[];
} | PrereqFormat[] | CourseShell;

/** like Array.isArray(), this does type verification */
export function isCourseShell(arg: PrereqFormat): arg is CourseShell {
    return (arg as CourseShell).code !== undefined;
}