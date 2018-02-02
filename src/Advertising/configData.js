/**
 * Created by qitmac000274 on 2017/12/19.
 */
const startAge = 22;
const endAge = 55;
function getAge() {
    let age = [];
    for(let i = startAge; i <= endAge; ++i ){
        let obj = {display: i, value: i};
        age.push(obj);
    }
    return age;
}
export const ageArr = getAge();
