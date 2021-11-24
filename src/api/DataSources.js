import axiosClient from "./axios"

const ImportDataApi = (tableName, data) => {
    return axiosClient.post("/data/new", {
        table: tableName,
        data : data
    })
}

export {
    ImportDataApi
}