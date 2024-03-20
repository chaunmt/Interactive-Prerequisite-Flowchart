/*** DO NOT RUN FROM INSIDE THE REPO ***/
/* Use `pnpm run sources` now, as this is a
 * script to be executed from the top-level
 * directory instead
 */

// Using file system
let fs = require("fs");

/** Check whether a string contains any number */
function hasNumber(str) {
  return /\d/.test(str);
}

/** Delete all spaces */
function deleteSpaces(str) {
  return str.replace(/\s/g, "");
}

/** Replace all "," with " and "
 * Replace all "/" with " and " */
function replaceSigns(str) {
  str = str.replaceAll(", ", " and ");
  str = str.replaceAll("/", " or ");
  str = str.replaceAll("&", " and ");
  return str;
}

/** Delete info about recommended courses from info string
 * WARNING: Omit this case because of data"s inconsistency */
function spliceRecommendAt(str, splitPattern) {
  let arr = str.split(splitPattern);
  let i = 0;
  while (i < arr.length) {
    if (!arr[i] || arr[i].toLowerCase().includes("special instruction")) {
      arr.splice(i, 1);
    } else {
      i++;
    }
  }
  return arr.join(" or ");
}

/** ASSUMPTION: Filter out extra information from info string 
 * WARNING: Omit this case because of data"s inconsistency
*/
function filterExtraInfo(str) {
  // if (str.toUpperCase().includes("NO PREREQUISITE")) return ""
  str = spliceRecommendAt(str, ";");
  str = spliceRecommendAt(str, ".");
  return str;
}

/** Split string at first occurence of a certain type (number or word) */
function splitStringAt(str, type) {
  str = deleteSpaces(str);

  let index = -1; 
  if (type == "word") { // Find the first index of a character of type "word"
    index = str.search(/[A-Za-z]/);
  } else { // Find the first index of a character of type "number"
    index = str.search(/\d/);
  }

  if (index != -1) { // Check if a letter or digit was found
    return [str.slice(0, index), str.slice(index)];
  }

  // If id does not contain suffix
  if (type == "word") {
    return [str, null];
  }

  // Course should always have number inside
  return [null, null];
}

/** Extract prerequisites courses from string, given target course information */
function extractCourses(str, targetSubject, targetId) {
  // match full words for 3 cases:
  //    3-4 digits + optional letters
  //    some letters + optional white space + 3-4 digits + optional letters
  //    "inside" + number
  const pattern =
    /\b\d{2,4}[A-Za-z]*\b|\b[A-Za-z]+\s?\d{2,4}[A-Za-z]*\b|\binside\d+\b/g;
  const courses = str.match(pattern) || [];
  const allSems = require("./General/allSemesters.json");

  return courses.map((each) => {
    let [subject, id] = splitStringAt(each, "number");
    if (!subject) {
      id = each;
    }

    subject = subject.toUpperCase();
    id = id.toUpperCase();

    function getId(id) {
      let [num, suffix] = splitStringAt(id, "word");
      let allowedSuffix = ["W", "H", "V", ""];

      // We don"t keep any remedial courses
      if (!num) {
        num = id;
      }

      if (parseInt(num, 10) < 1000 && (subject != "INSIDE")) {
        return null;
      }

      // Check what is this course"s type based on its suffix
      if (suffix && (suffix.length != 1 || !allowedSuffix.includes(suffix))) {
        id = num;
      }
      
      if (!allCourseNumbers.includes(id)) {
        if (allCourseNumbers.includes(id + "W")) {
          id = id + "W";
        } else if (allCourseNumbers.includes(id + "H")) {
          id = id + "H";
        } else if (!(subject == "INSIDE")) {
          return null;
        } else if (allCourseNumbers.includes(num)) {
          id = num;
        }
      }

      // We don"t keep any honor course in prereq
      if (id.includes("V") || id.includes("H")) {
        return null;
      }

      return id;
    }

    id = getId(id);
    if (!id) {
      return null;
    }

    // Remove semester and year (not a course)
    // ASSUME: NO PREREQ"S SUBJECT --> USE TARGET"S SUBJECT
    if (!(subject == "INSIDE") && !allSubjects.includes(subject)) {
      if (allSems.includes(subject)) {
        return null;
      }
      subject = targetSubject;
    }

    // If this course = target, it is not prereq
    if (subject == targetSubject && id == targetId) {
      return null;
    }

    return { code: subject + " " + id, subject: subject, id: id };
  });
}

/** Check whether 2 courses are the same */
function isEqualCourse(A, B) {
  // If A or B is not course, return false
  if (!A || !B) {
    return false;
  }
  
  if (!A.code || !A.subject || !A.id) {
    return false;
  }
  
  if (!B.code || !B.subject || !B.id) {
    return false;
  }

  // If A"s differs from B"s, return false
  if (A.code != B.code) {
    return false;
  }
  
  if (A.subject != B.subject) {
    return false;
  }
  
  if (A.id != B.id) {
    return false;
  }

  return true;
}

/** Use breadth first search to filter duplicate courses */
function filterDuplicate(items) {
  // Return null and single course
  if (!items) {
    return null;
  }
  
  if (items.code) {
    return items;
  }

  // Traverse through "and" array, "or" array
  if (items.and) {
    return { and: filterDuplicate(items.and) };
  }

  if (items.or) {
    return { or: filterDuplicate(items.or) };
  }

  // Replace duplicate course with null
  let i = 0;
  while (i < items.length - 1) {
    let j = i + 1;
    while (j < items.length) {
      if (isEqualCourse(items[i], items[j])) {
        items.splice(j, 1);
      } else {
        j++;
      }
    }
    i++;
  }

  // Filter each item
  for (i = 0; i < items.length; i++) {
    if (items[i] && !items[i].code) {
      items[i] = filterDuplicate(items[i]);
    }
  }

  return items;
}

/** Turning extra array into NULL */
function filterExtraArray(items) {
  // Return null and single course
  if (!items) {
    return null;
  }
  
  if (items.id) {
    return items;
  }

  // Empty array becomes null
  if (items.length == 0) {
    return null;
  }

  // Handle "and" array
  if (items.and) {
    if (items.and.length == 1) {
      return filterExtraArray(items.and[0]); // Single item array becomes single item
    } else {
      return { and: filterExtraArray(items.and) };
    }
  }

  // Handle "or" array
  if (items.or) {
    if (items.or.length == 1) {
      return filterExtraArray(items.or[0]); // Single item array becomes single item
    } else {
      return { or: filterExtraArray(items.or) };
    }
  }

  // Single item array becomes single item
  if (items.length == 1) {
    return filterExtraArray(items[0]);
  }

  // Recursively handle nested arrays
  let i = 0;
  while (i < items.length) {
    if (items[i] && !items[i].id) {
      items[i] = filterExtraArray(items[i]);
    }
    if (!items[i]) {
      items.splice(i, 1);
    } else {
      i++;
    }
  }

  return items;
}

/** Filter out all NULL value into empty */
function filterNull(items) {
  // Return null and single course
  if (!items || items.length == 0) {
    return null;
  }
  
  if (items.id) {
    return items;
  }

  // Traverse through "and" array, "or" array
  if (items.and) {
    return { and: filterNull(items.and) };
  }
  
  if (items.or) {
    return { or: filterNull(items.or) };
  }

  // If item is not an array, it is null
  if (!items.length) {
    return null;
  }

  // Recursively handle nested arrays
  let i = 0;
  while (i < items.length) {
    if (items[i] && !items[i]?.id) {
      items[i] = filterNull(items[i]);
    }
    
    if (!items[i]) {
      items.splice(i, 1); // Delete null
    } else {
      i++;
    }
  }

  return items;
}

function cutStringAtLastNumber(inputString) {
  let lastNumberIndex = inputString.search(/\d[^0-9]*$/);

  if (lastNumberIndex !== -1) {
    return inputString.slice(0, lastNumberIndex + 1).trim();
  }

  return "";
}

/** Assume logic level for each occurence "and", "or"
 * WARNING: Problem with ambiguous level */
function convertLogic(str, targetSubject, targetId) {
  // convert "A and B" into { and: ["A", "B"] }
  if (str.includes(" and ")) {
    return { and: extractCourses(str, targetSubject, targetId) };
  }

  // convert "A or B" into { or: ["A", "B"] }
  if (str.includes(" or ")) {
    return { or: extractCourses(str, targetSubject, targetId) };
  }

  return extractCourses(str, targetSubject, targetId);
}

/** Replace encoded substring with decoded data */
function decodeBracket(data, encodedData) {
  if (!data) {
    return null;
  }
  
  // Handle "and" array, "or" array
  if (data.and) {
    if (data.and.length == 1) {
      return decodeBracket(data.and, encodedData);
    }
    return { and: decodeBracket(data.and, encodedData) };
  }
  if (data.or) {
    if (data.or.length == 1) {
      return decodeBracket(data.or, encodedData);
    }
    return { or: decodeBracket(data.or, encodedData) };
  }

  // Data is array
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      data[i] = decodeBracket(data[i], encodedData);
    }
  }
  // Data is course
  else if (data.subject == "INSIDE") {
    // Data is encoded
    data = encodedData[data.id];
    if (data != null) {
      data = decodeBracket(data, encodedData); // Decode data
    }
  }
  return data;
}

/** Encode the info string into a string with layers of bracket and code {"inside" + a number} */
function encodeBracket(info, targetSubject, targetId) {
  let open = [];
  let inside = [];
  let inNum = -1;
  let i = 0;

  while (i < info.length) {
    // Store all indexes of open square brackets "["
    if (info[i] == "[") {
      open.push(i);
    }

    // Get string inside square brackets "[" + string inside + "]"
    if (info[i] == "]") {
      inside[++inNum] = info.substring(open[open.length - 1], i + 1);
      open.pop();

      // No number in inside == No course
      if (!hasNumber(inside[inNum])) {
        info = info.replace(inside[inNum], "");
        inNum--;
      } else { // Replace "[" + string inside + "]" with "inside" + its index in the saved array
        info = info.replace(inside[inNum], "inside" + inNum.toString());
        i = i - inside[inNum].length + 7;
      }
    }
    i++;
  }

  // All information after last number are redundant
  info = cutStringAtLastNumber(info);

  // Convert encoded string and saved array into encoded array
  let encodedArr = [];
  for (i = 0; i <= inNum; i++) {
    encodedArr.push(convertLogic(inside[i], targetSubject, targetId));
  }
  encodedArr.push(convertLogic(info, targetSubject, targetId));

  return encodedArr;
}

/** Filter Prerequisite Courses of a Target Course out of info */
function filterPrereq(info, targetSubject, targetId) {
  // No number == No prerequisite
  if (!hasNumber(info)) {
    return [];
  }

  // info = filterExtraInfo(info); // WARNING: Too inconsistent
  info = info.replaceAll("(", "[");
  info = info.replaceAll(")", "]");
  info = replaceSigns(info);

  // return info
  let encoded = encodeBracket(info, targetSubject, targetId);

  // Only one encoded data in encoded array == No bracket
  if (!encoded.length || encoded.length == 0) {
    return encoded;
  }
  
  let data = encoded[encoded.length - 1];
  data = decodeBracket(data, encoded);
  data = filterDuplicate(data);
  data = filterNull(data);
  data = filterExtraArray(data);
  data = filterNull(data);
  data = filterExtraArray(data);

  return data;
}

/** Export JSON file from Course Dogs API */
function exportDogs(SUBJECT) {
  const schoolId = "umn_umntc_peoplesoft";
  let subject = SUBJECT;
  let subjectCode = subject == "allCourses" ? "" : "subjectCode=" + subject;
  let fileName = subject + ".json";
  // NOTE: Write path is relative to location of execution and *not* this file
  let filePath = "./app/data/Dog/"; // For offical data folder
  // let filePath = "./app/data/"  // For testing purpose
  let returnFields = "&returnFields=subjectCode,courseNumber,name,description"; // preq is at the end of description
  let limit = "&limit=infinity";

  let url =
    "https://app.coursedog.com/api/v1/cm/" +
    schoolId +
    "/courses/search/$filters?" +
    subjectCode +
    returnFields +
    limit;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let courses = filterNull(
        data.data.map((course) => {
          // Filter out prerequisites
          let descrip = course.description.toLowerCase();
          let splitPattern = "\n\n\n\n\n";
          if (descrip.includes("prereq:")) {
            splitPattern = "prereq:";
          } else if (descrip.includes("prerequisite:")) {
            splitPattern = "prerequisite:";
          } else if (descrip.includes("prerequisites:")) {
            splitPattern = "prerequisites:";
          } else if (descrip.includes("prereq")) {
            splitPattern = "prereq";
          } else if (descrip.includes("prerequisite")) {
            splitPattern = "prerequisite";
          } else if (descrip.includes("prerequisites")) {
            splitPattern = "prerequisites";
          }

          let info = descrip.split(splitPattern);

          const prereq = info[1]
            ? filterPrereq(info[1], course.subjectCode, course.courseNumber)
            : []; // Assume there is no prereq
          if (
            course.courseNumber.includes("H") ||
            course.courseNumber.includes("V")
          ) {
            return null;
          }

          return {
            code: course.subjectCode + " " + course.courseNumber,
            subject: course.subjectCode,
            id: course.courseNumber,
            title: course.name,
            info: course.description,
            prereq: prereq || [],
          };
        }),
      );

      fs.writeFile(filePath + fileName, JSON.stringify(courses, null, 2), (error) => {
        if (error) {
          console.error(
            "Error exporting data to JSON file" + fileName + ":",
            error,
          );
        } else {
          console.log("Data exported to", fileName);
        }
      });
    });
}

/** Generate allCourses.json and each subject json */

let allSubjects = require("./General/allSubjects.json");
let allCourseNumbers = require("./General/id/allCourses.json");

// Export a test json file to current folder
// exportDogs("CHEM")

// Export allCourses json data files
exportDogs("allCourses");

// Export each course json data files
for (let pup of allSubjects) {
  exportDogs(pup);
}