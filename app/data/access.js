const sample = require('./CSCI.json');



const access = {
  findCourseInfo
}

function findCourseInfo(input){
    for(var i=0;sample.class.length;i++){
        if(input==sample.class[i].end){
            return sample.class[i].start;
        }
    }
}

// this is for testing, you can erase if you want
var arr=findCourseInfo('CSCI 1933');
console.log(arr);

export default access;
