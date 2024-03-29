import axiosClient from './axios'

const createNewReport = (PId, data) => {
    return axiosClient.post(`/project/${PId}/new`, data)
}

const getAllReport = (PId) => {
    return axiosClient.get(`/project/${PId}/reports`)
}

const getAllComponent = (PId, RId, isTemplate) => {
    if (isTemplate) return axiosClient.get(`/template/${RId}/components`)
    return axiosClient.get(`/project/${PId}/${RId}/components`)
}

const createNewComponent = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/insert`, data)
}

const updateAComponent = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/component/update`, data)
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

const getReportInformation = (PId, RId, isTemplate) => {
    if (isTemplate) return axiosClient.get(`/template/${RId}/info`)
    return axiosClient.get(`/project/${PId}/${RId}/info`)
}

const shareReport = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/share`, data)
}

const unshareReport = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/unshare`, data)
}

const getSharedListPeople = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/getshare`)
}
const updateSharePermission = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/share/update`, data)
}

const deleteShape = (PId, RId, CId) => {
    return axiosClient.get(`/project/${PId}/${RId}/component/${CId}/delete`)
}

const getPermission = (PId, RId, Email) => {
    return axiosClient.get(`/project/${PId}/${RId}/getPermission`)
}
const saveAsCopy = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/copy`)
}
const saveAsTemplate = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/saveAsTemplate`)
}

const getAllDatasourceNameInReport = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/dataSourceName`)
}

const getReportInfoWithoutProjectId = (Rid) => {
    return axiosClient.get(`/project/RId/${Rid}`)
}

export {
    createNewReport,
    getAllReport,
    getAllComponent,
    createNewComponent,
    updateAComponent,
    like,
    unlike,
    deleteReport,
    updateReportInformation,
    getReportInformation,
    shareReport,
    unshareReport,
    getSharedListPeople,
    updateSharePermission,
    deleteShape,
    getPermission,
    saveAsCopy,
    saveAsTemplate,
    getAllDatasourceNameInReport,
    getReportInfoWithoutProjectId
}