var sample = require('./Old/CSCI.json');

const Access = {
  findCourseInfo,
  findPrerequisite,
  findTargetOf,
  findTitle,
  courses,
  id,
  title,
  info,
  prereq,
  isPrereq,
  isTargetOf,
  // isCoreq,
  // major,
  // idNum,
  onlyNum,
}

function id(course) { return course.end }

function onlyNum(id) { return id.replace(/[^0-9]/g, '') }

function title(course) { return course.name }

function info(course) { return course.info }

function courses() { return sample.class }

function prereq(course) { return course.start }

function isPrereq(course) {
  if (course == null || prereq(course) == null) return false
  return prereq(course).includes(Access.title(course))
}

// return true if course has prereq as its prerequisites
function isTargetOf(prereq) { return findTargetOf(prereq).includes(prereq) }

// return the array of course that have prereq as its prerequisites
function findTargetOf(prereq){
  for(var i=0;sample.class.length;i++){
      if(sample.class[i].start.includes(input)){
          return sample.class[i].end;
      }
  }
}

function findPrerequisite(input){
    for(var i=0;sample.class.length;i++){
        if(input==sample.class[i].end){
            return sample.class[i].start;
        }
    }
}

function findCourseInfo(input){
    for(var i=0;sample.class.length;i++){
        if(input==sample.class[i].end){
            return sample.class[i].info;
        }
    }
}

function findTitle(input){
    for(var i=0;sample.class.length;i++){
        if(input==sample.class[i].end){
            return sample.class[i].name;
        }
    }
}

export default Access;
