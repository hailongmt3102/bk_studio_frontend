const variableRgExp = /\-?\d*\.?\d+/

const checkVariable = (value) => {
    if (variableRgExp.test(value)) return value
    else return `'${value}'`
}

const currentFollowingDrawer = {
    none: -1,
	dashboard: 0,
	dataSource: 1,
    people: 2,
    template: 3,
    yourProject: 4,
    createReport: 5,
    gallery: 6,
    importData: 7,
    profile: 8,
    setting: 9
}
module.exports = {
    checkVariable,
    currentFollowingDrawer
}