var sample = require('./CSCI.json');

const Access = {
  findCourseInfo,
  findPrerequisite,
  findTitle,
  prereq,
  id,
  title,
  info
}

function prereq(course) { return course.start }

function id(course) { return course.end }

function title(course) { return course.name }

function info(course) { return course.info }


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

export default access;
