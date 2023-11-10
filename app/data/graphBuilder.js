import Access from "./access"


export function buildCombinedGraph(courses) {
    console.log("buildgraph:", courses)
    if (courses.length == 0) console.log("WARNING: no courses passed in, built empty graph.")
    
    let duplicate_list = []
    let graph = "graph TD\n"

    const helper = function (subj, idnum, acc) {
        if (duplicate_list.includes(`${subj} ${idnum}`)) { return '' }  // early exit for duplicates

        console.log(':', subj, idnum)
        duplicate_list.push(`${subj} ${idnum}`)
        let build = `${subj}_${idnum}[${subj} ${idnum}]\n`
        
        if (idnum < "1000") { return build }  // early exit for 0xxx-level courses
    
        // let prereqs = acc.getPrereq("code", `${subj} ${idnum}`) || []
        let prereqs = acc.getPrereq("code", `${subj} ${idnum}`)
        // for (var i = 0; i < prereqs.length; i++) {
            // let req = prereqs[i].course || []  // this shouldn't need the null-safety, but just in case
            let req = prereqs.course
            for (var j = 0; j < req.length; j++) {
                let pre_subj = req[j].subject
                let pre_id = req[j].id
                let next_acc = (subj === pre_subj) ? acc : Access(pre_subj)  // solely for optimization
                build += helper(pre_subj, pre_id, next_acc, duplicate_list) + `${pre_subj}_${pre_id} --> ${subj}_${idnum}\n`
            }
        // }
        return build
    }

    for (var k = 0; k < courses.length; k++) {
        console.log('>', courses[k])
        let [subjectCode, courseNumber] = courses[k].split(" ", 2);
        let accessor = Access(subjectCode)
        graph += helper(subjectCode, courseNumber, accessor)
    }

    return graph
}

export function buildGraph(course) {
    console.log("buildgraph:", course)

    let [subjectCode, courseNumber] = course.split(" ", 2);
    let accessor = Access(subjectCode)
    
    const helper = function (subj, idnum, acc, duplicate_list) {
        if (duplicate_list.includes(`${subj} ${idnum}`)) { return '' }
        console.log(':', subj, idnum)
        duplicate_list.push(`${subj} ${idnum}`)
        let build = `${subj}_${idnum}[${subj} ${idnum}]\n`
        if (idnum < "1000") { return build }  // early exit for 0xxx-level courses
        
        // let prereqs = acc.getPrereq("code", `${subj} ${idnum}`) || []
        let prereqs = acc.getPrereq("code", `${subj} ${idnum}`)
        // for (var i = 0; i < prereqs.length; i++) {
            // let req = prereqs[i].course || []  // this shouldn't need the null-safety, but just in case
            let req = prereqs.course
            for (var j = 0; j < req.length; j++) {
                let pre_subj = req[j].subject
                let pre_id = req[j].id
                let next_acc = (subj === pre_subj) ? acc : Access(pre_subj)  // solely for optimization
                build += helper(pre_subj, pre_id, next_acc, duplicate_list) + `${pre_subj}_${pre_id} --> ${subj}_${idnum}\n`
            }
        // }
        return build
    }
  
    return 'graph TD\n' + rec_helper(subjectCode, courseNumber, accessor, [])
}
