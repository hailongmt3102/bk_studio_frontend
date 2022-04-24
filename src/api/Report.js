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

const getReportInformation = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/info`)
}

const shareReport = (PId, RId, data) => {
    return axiosClient.post(`/project/${PId}/${RId}/share`, data)
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

const getPermission = (PId, RId, Email ) => {
    return axiosClient.get(`/project/${PId}/${RId}/getPermission`)
}
const saveAsCopy = (PId, RId) => {
    return axiosClient.get(`/project/${PId}/${RId}/copy`)
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
    getSharedListPeople,
    updateSharePermission,
    deleteShape,
<<<<<<< HEAD
    getPermission
=======
    saveAsCopy
>>>>>>> main
}