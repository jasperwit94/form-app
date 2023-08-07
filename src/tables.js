export const EMPLOYEE_TABLE_PREFFIX = "employee#"

export default function trySometing () {
    let userFullnames = users.map(function(element){
        return `${element.firstName} ${element.lastName}`;
    })
    
    console.log(userFullnames);

}