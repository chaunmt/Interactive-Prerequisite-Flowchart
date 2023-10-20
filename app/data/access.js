var sample = require('./CSCI.json');

const access = {
  findCourseInfo,
  findPrerequisite,
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

export default access;
