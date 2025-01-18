'use client'
import React from "react";
import { useState, useEffect } from "react";
import { Checklist } from "./Checklist";
import { BarChart } from "./BarChart";
import CoursesData from "../../data/GMP/allCourses.json";
import ProgramData from "../../data/GMP/allMajors.json";

type Course = {
  id: string;
  code: string;
  longName: string;
  credits: { numberOfCredits: number };
};

type customInfoObj = {
  major: any;
  curCreditsInProgram: string;
  validCourses: string;
  programMaxCredits: any;
};

type GopherMajorBarChartProps = {
  myMajor?: string;
  myCourseIDs: string[];
  disableChecklist?: boolean;
  disableBarChart?: boolean;
};

function GopherMajorBarChart({
  myMajor = "",
  myCourseIDs,
  disableBarChart = false,
  disableChecklist = false,
}: GopherMajorBarChartProps) {
  const [allPrograms, setAllPrograms] = useState<any>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const yourCourses = myCourseIDs; // Fixes string or null type error when parsing
  const yourProgram = myMajor ? myMajor : "Undecided"; // Handles invalid majors

  useEffect(() => {
    setAllCourses(CoursesData as Course[]);
    setAllPrograms(ProgramData);
  }, []);

  function calculateCredits(courseIds: string[]) {
  let totalCredits = 0;
    for (const courseId of courseIds) {
      // Match course ID with the courses data
      for (const course of allCourses) {
        // for of statements invokes the Symbol.iterator. Ignore error for now
        if (course.id.startsWith(courseId.substring(0, 7))) {
          totalCredits += course.credits.numberOfCredits;
          break; // Exit the inner loop after finding the course
        }
      }
    }
    return totalCredits;
  }

  function createStoreCourses(values: any, yourCourses: string[]) {
    let storeCourses: string[] = [];
    for (let e in values) {
      const coursesObj = values[e]; //Ex: coursesObj = {"logic": "or","value": ["8257721","0099201","0062811","8019831"]}
      const logic = coursesObj.logic;
      const value = coursesObj.value;

      for (let v of value) {
        if (logic.includes("or")) {
          for (let v of value) {
            if (yourCourses.includes(v)) {
              //use 'includes()' instead of 'in' for strings
              storeCourses.push(v);
              break; //Only 1 course needs to be in value
            }
          }
        } else if (logic.includes("and")) {
          if (yourCourses.includes(value[0])) {
            storeCourses.push(v);
          }
        }
      }
    }

    return storeCourses.filter(
      (item, index) => storeCourses.indexOf(item) === index
    ); // Filters out duplicates
  }

  function checkConditions(
    condition: string,
    values: any[],
    storeCourses: string[],
    storeCoursesCredits: number,
    name: string,
    minCredits: number,
    maxCredits: number,
    minCourses: number,
    maxCourses: number
  ) {
    let subRuleObj = { [name]: "False" };

    switch (condition) {
      case "completedAnyOf":
        if (storeCourses.length != 0) {
          subRuleObj[name] = "True";
        }
        break;

      case "completedAllOf": // Logic is either "and" or "or"
        if (storeCourses.length == values.length) {
          subRuleObj[name] = "True";
        }
        break;

      case "minimumCredits":
        let storeMinCredits = minCredits;
        storeMinCredits -= storeCoursesCredits;
        if (storeMinCredits <= 0) {
          subRuleObj[name] = "True";
        }
        break;

      case "completeVariableCoursesAndVariableCredits":
        //Checks if credits or courses are used
        if (
          storeCoursesCredits <= maxCourses &&
          storeCoursesCredits &&
          storeCourses.length <= maxCourses &&
          storeCourses.length >= minCourses
        ) {
          subRuleObj[name] = "True";
        } else if (
          storeCoursesCredits <= maxCredits &&
          storeCoursesCredits >= minCredits
        ) {
          subRuleObj[name] = "True";
        } else if (
          storeCourses.length <= maxCourses &&
          storeCourses.length >= minCourses
        ) {
          subRuleObj[name] = "True";
        }
        break;

      case "completedAtLeastXOf":
        if (storeCourses.length >= minCourses) {
          subRuleObj[name] = "True";
        }
        break;

      case "allOf":
        break;

      case "anyOf":
        break;

      default:
        console.log("Condition Not Found:", condition);
        break;
    }

    return subRuleObj;
  }

  function createChecklist(programObj: any, yourCourses: string[]) {
    const requirements = programObj["requisites"]["requisitesSimple"];
    const checklist: any[] = [];
    let validCourses: string[] = [];

    requirements.forEach((req: any) => {
      const rules = req["rules"];
      const checklistObj: { [key: string]: string } = {};

      checklistObj["requirementTitle"] = req.name; //Adds titles like "Admission Requirements" or "Program Requirements" to checklist

      for (let i in rules) {
        // Chracteristics of Rule TYPE 1: uses subRule, no values, conditions: ["allOf", "anyOf"]
        // Chracteristics of Rule TYPE 2: empty subRule, uses value, conditions: ["completedAllOf", "completedAnyOf", "completeVariableCoursesAndVariableCredits", "minimumCredits", "completedAtLeastXOf"]
        const rule = rules[i];
        const condition: string = rule.condition; // Can be Rule TYPE 1 or TYPE 2
        const coreName = rule.name; //Ex: Major: Astrophysics,  "Mathematics Core", "Statics Core", ect
        const subRules = rule.subRules; // Used for type 1
        const ruleValue = rule.value ? rule.value : []; // Used for TYPE 2

        // Used in "completeVariableCoursesAndVariableCredits" and "completedAtLeastXOf"
        const minCredits = rule.minCredits ? rule.minCredits : null;
        const maxCredits = rule.maxCredits ? rule.maxCredits : null;
        const minCourses = rule.minCourses ? rule.minCourses : null;
        const maxCourses = rule.maxCourses ? rule.maxCourses : null;

        if (condition.includes("allOf")) {
          // Condition for handling type 1
          let subRuleChecklist: any[] = [];

          for (let i in subRules) {
            const subRule = subRules[i];
            const subName: string = subRule["name"]
              ? subRule["name"]
              : "Unnamed"; // Ex: Economics
            const subCondition = subRule["condition"]; // Almost all uses TYPE 2. AFRO-Elective uses TYPE 1
            const values: any[] = subRule?.value?.values
              ? subRule?.value?.values
              : []; // Ex: [{"logic": "or","value": ["8257721","0099201","0062811","8019831"]}, ...]
            const storeCourses: string[] = createStoreCourses(
              values,
              yourCourses
            );
            const storeCoursesCredits: number = calculateCredits(storeCourses);

            const subMinCredits = subRule.minCredits
              ? subRule.minCredits
              : null;
            const subMaxCredits = subRule.maxCredits
              ? subRule.maxCredits
              : null;
            const subMinCourses = subRule.minCourses
              ? subRule.minCourses
              : null;
            const subMaxCourses = subRule.maxCourses
              ? subRule.maxCourses
              : null;

            const subRuleObj = checkConditions(
              subCondition,
              values,
              storeCourses,
              storeCoursesCredits,
              subName,
              subMinCredits,
              subMaxCredits,
              subMinCourses,
              subMaxCourses
            );

            validCourses.push(...storeCourses); // for tracking courses in program

            subRuleChecklist.push(subRuleObj);
          }

          const subRuleObjValues = subRuleChecklist.flatMap((obj) =>
            Object.values(obj)
          );
          if (!subRuleObjValues.includes("False")) {
            checklistObj[coreName + "?"] = JSON.stringify([
              "True",
              subRuleChecklist,
            ]);
          } else {
            checklistObj[coreName + "?"] = JSON.stringify([
              "False",
              subRuleChecklist,
            ]);
          }
        } else if (condition.includes("anyOf")) {
          let subRuleChecklist: any[] = [];

          for (let i in subRules) {
            const subRule = subRules[i];
            const subName: string = subRule["name"]
              ? subRule["name"]
              : "Unnamed"; // Ex: Economics
            const subCondition = subRule["condition"]; // Almost all uses TYPE 2. AFRO-Elective uses TYPE 1
            const values: any[] = subRule?.value?.values
              ? subRule?.value?.values
              : []; // Ex: [{"logic": "or","value": ["8257721","0099201","0062811","8019831"]}, ...]
            const storeCourses: string[] = createStoreCourses(
              values,
              yourCourses
            );
            const storeCoursesCredits: number = calculateCredits(storeCourses);

            const subMinCredits = subRule.minCredits
              ? subRule.minCredits
              : null;
            const subMaxCredits = subRule.maxCredits
              ? subRule.maxCredits
              : null;
            const subMinCourses = subRule.minCourses
              ? subRule.minCourses
              : null;
            const subMaxCourses = subRule.maxCourses
              ? subRule.maxCourses
              : null;

            const subRuleObj = checkConditions(
              subCondition,
              values,
              storeCourses,
              storeCoursesCredits,
              subName,
              subMinCredits,
              subMaxCredits,
              subMinCourses,
              subMaxCourses
            );

            validCourses.push(...storeCourses); // for tracking courses in program
            subRuleChecklist.push(subRuleObj);
          }

          const subRuleObjValues = subRuleChecklist.flatMap((obj) =>
            Object.values(obj)
          ); // Array of boolean values. ex: [true, true, false]
          if (subRuleObjValues.includes("True")) {
            checklistObj[coreName + "?"] = JSON.stringify([
              "True",
              subRuleChecklist,
            ]);
          } else {
            checklistObj[coreName + "?"] = JSON.stringify([
              "False",
              subRuleChecklist,
            ]);
          }
        } else if (ruleValue != 0) {
          // Chracteristics of Rule type 2: empty subRule, uses value
          const ruleValues = ruleValue.values;
          const storeCourses = createStoreCourses(ruleValues, yourCourses);
          const storeCoursesCredits = calculateCredits(storeCourses);

          validCourses.push(...storeCourses); // for tracking courses in program

          switch (condition) {
            case "completedAnyOf":
              if (storeCourses.length != 0) {
                checklistObj[coreName] = "True";
              }
              break;

            case "completedAllOf": // Logic is either "and" or "or"
              if (storeCourses.length == ruleValues.length) {
                checklistObj[coreName] = "True";
              }

              break;

            case "minimumCredits":
              let storeMinCredits = rule.minCredits;
              storeMinCredits -= storeCoursesCredits;
              if (storeMinCredits <= 0) {
                checklistObj[coreName] = "True";
              }
              break;

            case "completeVariableCoursesAndVariableCredits":
              //Checks if credits or courses are used
              if (
                storeCoursesCredits <= maxCredits &&
                storeCoursesCredits &&
                storeCourses.length <= maxCourses &&
                storeCourses.length >= minCourses
              ) {
                checklistObj[coreName] = "True";
              } else if (
                storeCoursesCredits <= maxCredits &&
                storeCoursesCredits >= minCredits
              ) {
                checklistObj[coreName] = "True";
              } else if (
                storeCourses.length <= maxCourses &&
                storeCourses.length >= minCourses
              ) {
                checklistObj[coreName] = "True";
              }
              break;

            case "completedAtLeastXOf":
              if (storeCourses.length >= minCourses) {
                checklistObj[coreName] = "True";
              }
              break;

            default:
              break;
          }
        } else {
          console.log("Condition Unsupported:", condition);
        }
      }
      checklist.push(checklistObj);
    });
    // Customize information here
    const uniqueValidCourses = validCourses.filter(
      (item, index) => validCourses.indexOf(item) == index
    ); // Removes Duplicates
    const currCredits = calculateCredits(uniqueValidCourses).toString(); // Parsing to string for consistency

    const customInfoObj = {
      major: programObj.catalogDisplayName,
      curCreditsInProgram: currCredits,
      validCourses: JSON.stringify(uniqueValidCourses),
      programMaxCredits: programObj.customFields.cdProgramCreditsProgramMax,
    } as customInfoObj; //fixes value is type unknown error in line 416
    checklist.push(customInfoObj);

    return checklist;
  }

  function checkRequirements(yourProgram: string) {
    const getProgramObj =
      yourProgram != "Undecided"
        ? allPrograms.find((p: any) => p.catalogDisplayName == yourProgram)
        : false;

    if (getProgramObj) {
      return createChecklist(getProgramObj, yourCourses);
    } else {
      return [
        {
          major: "Undecided",
          curCreditsInProgram: "0",
          programMaxCredits: null,
          validCourses: "[]",
        },
      ];
    }
  }

  function createSortedOverlap(lastObjChecklist: any) {
    //lastObj Ex: {"major": "Undecided", "curCreditsInProgram": "0", "programMaxCredits": null, "validCourses": "[]"}
    if (lastObjChecklist.major == "Undecided") {
      return [];
    } else {
      const allLastObjs = allPrograms.map((prog: any) => {
        const checkList = createChecklist(prog, yourCourses);
        return checkList[checkList.length - 1]; //lastObj
      });

      const relevantLastObjs = allLastObjs.filter((lastObj: customInfoObj) => {
        return Number(lastObj.curCreditsInProgram) > 0;
      }); // Filters out programs with no overlap
      const sortByOverlap = relevantLastObjs.sort((a: any, b: any) => {
        return b.curCreditsInProgram - a.curCreditsInProgram;
      }); // Sort by ascending to decending

      return sortByOverlap;
    }
  }

  const yourMajorChecklist = checkRequirements(yourProgram);
  const lastObjChecklist = yourMajorChecklist[yourMajorChecklist.length - 1];
  const sortedByOverlap = createSortedOverlap(lastObjChecklist);

  return (
    <div>
      {disableBarChart ? null : (
        <BarChart
          sortedByOverlap={sortedByOverlap}
        />
      )}
      {disableChecklist ? null : (
        <Checklist yourMajorChecklist={yourMajorChecklist} />
      )}
    </div>
  );
}

export default GopherMajorBarChart;
