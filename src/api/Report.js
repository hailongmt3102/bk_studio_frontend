import axiosClient from './axios'

const createNewReport = (PId, data) => {
    return axiosClient.post(`/project/${PId}/new`, data)
}

const getAllReport = (PId) => {
    return axiosClient.get(`/project/${PId}/reports`)
}

const getAllComponent = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/components`)
}

const createNewComponent = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/insert`, data)
}
const like = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/favorite`)
}
const unlike = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/unfavorite`)
}

const deleteReport = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/delete`)
}

const updateReportInformation = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/update`, data)
}

export {
    createNewReport,
    getAllReport,
    getAllComponent,
    createNewComponent,
    like,
    unlike,
    deleteReport,
    updateReportInformation
}