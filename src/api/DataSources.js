import axiosClient from "./axios"

const ImportDataApi = (tableName, data) => {
    return axiosClient.post("/data/new", {
        table: tableName,
        data : data
    })
}

const GetTableColumns = () => {
    return axiosClient.get("/data/")
}


const GetDataSourcesListInformation = () => {
    return axiosClient.get("/data/info")
}

const QueryData = (query) => {
    return axiosClient.post("/data/query", {
        query: query
    })
}

const SendToWorkspace = (id, data) => {
    return axiosClient.post("/data/"+id+"/switchtype", data)
}

export {
    ImportDataApi,
    GetTableColumns,
    QueryData,
    GetDataSourcesListInformation,
    SendToWorkspace
}