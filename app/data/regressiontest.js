// using a .js file as a node script because
// we're not using deno, which runs .ts files

// this can be adapted to before/after compare
// when making changes to the python repo btw

let fs = require("fs");

const js_proc = require(`./Dog/allCourses.json`);
const py_proc = require(`./UMNTC/general.json`);

// slightly more complicated reformatting
function oldprereqformatter(thing) {
  if (thing?.map) {
    if (thing.length < 1) return {};
    else return { and: helper(thing) };
  } else return helper(thing);

  function helper(thin) {
    if (thin?.map) {
      return thin.map(helper);
    } else if (thin?.and) {
      return { and: helper(thin.and) };
    } else if (thin?.or) {
      return { or: helper(thin.or) };
    } else {
      return thin.subject + thin.id;
    }
  }
}
function newprereqformatter(thing) {
  if (Object.keys(thing).length < 1) {
    return {};
  } else if (thing?.map) {
    return thing.map(newprereqformatter);
  } else if (thing?.and) {
    return { and: newprereqformatter(thing.and) };
  } else if (thing?.or) {
    return { or: newprereqformatter(thing.or) };
  } else {
    // uid --> Course code
    return py_proc[thing].code;
  }
}

let a = js_proc
  .map((c) => ({
    code: c.subject + c.id,
    prereq: oldprereqformatter(c.prereq),
    name: c.title,
    // info: c.info,
  }))
  .sort((a, b) => {
    if (a.code > b.code) return 1;
    else if (a.code < b.code) return -1;
    else return 0;
  });

let b = Object.entries(py_proc)
  .map(([_, c]) => ({
    code: c.code,
    prereq: newprereqformatter(c.prereq),
    name: c.name,
    // info: c.info,
  }))
  .sort((a, b) => {
    if (a.code > b.code) return 1;
    else if (a.code < b.code) return -1;
    else return 0;
  });

fs.writeFile("./old.test.json", JSON.stringify(a, null, 2), (e) => {
  console.log(e);
});
fs.writeFile("./new.test.json", JSON.stringify(b, null, 2), (e) => {
  console.log(e);
});

// now just use any diffing tool to compare the two files
