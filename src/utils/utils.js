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
    setting: 9,
    machineLearning : 10,
}


function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}


module.exports = {
    checkVariable,
    currentFollowingDrawer,
    dataURLtoFile
}