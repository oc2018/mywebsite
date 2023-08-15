export const dateFormatter = (date) => {
    const datter = new Date(date);
//    return datter.getFullYear() + '-' + datter.getMonth() + 1 + '-' + datter.getDate()
   return `${datter.getDate()} - ${datter.getMonth() + 1} - ${datter.getFullYear()}`;
}