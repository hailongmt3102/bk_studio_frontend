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

const GetDataSourcesListInformationInProject = (pid) => {
    return axiosClient.post("/data/project", pid)
}

const getColumnsOfTable = (table) => {
    return axiosClient.get(`/data/columns?table=${table}`)
}

const QueryData = (query) => {
    return axiosClient.post("/data/query", {
        query: query
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




export {
    ImportDataApi,
    GetTableColumns,
    QueryData,
    SendToWorkspace,
    GetDataSourcesListInformationInWorkSpace,
    GetDataSourcesListInformationInProject,
    getColumnsOfTable,
    deleteDatasource,
    Rename
}