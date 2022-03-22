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

const QueryData = (query) => {
    return axiosClient.post("/data/query", {
        query: query
    })
}

export {
    ImportDataApi,
    GetTableColumns,
    QueryData
}