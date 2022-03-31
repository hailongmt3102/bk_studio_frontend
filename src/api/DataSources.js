import { idID } from "@mui/material/locale"
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


const GetDataSourcesListInformationInWorkSpace = () => {
    return axiosClient.get("/data/workspace")
}

const GetDataSourcesListInformationInProject = (pid) => {
    return axiosClient.post("/data/project",pid)
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
    SendToWorkspace,
    GetDataSourcesListInformationInWorkSpace,
    GetDataSourcesListInformationInProject
}