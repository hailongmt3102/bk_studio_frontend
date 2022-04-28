import axiosClient from "./axios"

const ImportDataApi = (tableName, data, PId) => {
    return axiosClient.post("/data/new", {
        table: tableName,
        data: data,
        PId: PId
    })
}

const GetTableColumns = () => {
    return axiosClient.get("/data/")
}


const GetDataSourcesListInformationInWorkSpace = () => {
    return axiosClient.get("/data/workspace")
}

const GetSampleDataSource = () => {
    return axiosClient.get("/data/sample")
}

const GetDataSourcesListInformationInProject = (pid) => {
    return axiosClient.post("/data/project", pid)
}

const getColumnsOfTable = (table) => {
    return axiosClient.get(`/data/columns?table=${table}`)
}

const QueryData = (query, isSampleType) => {
    return axiosClient.post("/data/query", {
        query: query,
        isSampleType: isSampleType
    })
}

const SendToWorkspace = (id, data) => {
    return axiosClient.post("/data/" + id + "/switchtype", data)
}

const deleteDatasource = (id) => {
    return axiosClient.get("/data/" + id + "/delete")
}
const Rename = (id, data) => {
    return axiosClient.post("/data/" + id + "/rename", data)
}

const getDataSourcesSharedListPeople = (id) => {
    return axiosClient.get("/data/" + id + "/getshare")
}

const shareDataSources = (id, data) => {
    return axiosClient.post("/data/" + id + "/share", data)
}

const unshareDataSources = (id, data) => {
    return axiosClient.post("/data/" + id + "/unshare", data)
}



const getDataSourcesInformationByDId = (id) => {
    return axiosClient.get("/data/" + id + "/info")
}
const showDataSourceContent = (id) => {
    return axiosClient.get("/data/" + id + "/rows")
}

const checkPermissionWithDatasource = (id) => {
    return axiosClient.get("/data/" + id + "/permission")
}


const updateShareDataSourcePermission = (Did, data) => {
    return axiosClient.post("/data/" + Did + "/share/update", data)
}




export {
    ImportDataApi,
    GetTableColumns,
    QueryData,
    SendToWorkspace,
    GetDataSourcesListInformationInWorkSpace,
    GetDataSourcesListInformationInProject,
    getColumnsOfTable,
    deleteDatasource,
    getDataSourcesSharedListPeople,
    shareDataSources,
    unshareDataSources,
    Rename,
    getDataSourcesInformationByDId,
    showDataSourceContent,
    checkPermissionWithDatasource,
    updateShareDataSourcePermission,
    GetSampleDataSource
}