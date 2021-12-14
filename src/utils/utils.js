const variableRgExp = /\-?\d*\.?\d+/

const checkVariable = (value) => {
    if (variableRgExp.test(value)) return value
    else return `'${value}'`
}
module.exports = {
    checkVariable
}