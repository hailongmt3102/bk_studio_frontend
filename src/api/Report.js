import axiosClient from './axios'

const createNewReport = (PId, data) => {
    return axiosClient.post(`/project/${PId}/new`, data)
}

const getAllReport = (PId) => {
    return axiosClient.get(`/project/${PId}/reports`)
}

export {
    createNewReport,
    getAllReport
}