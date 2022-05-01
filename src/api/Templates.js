import axiosClient from './axios'

const getAllTemplate = () => {
    return axiosClient.get("/template/all")
}

const likeTemplate = (RId) => {
    return axiosClient.get(`/template/${RId}/favorite`)

}
const unlikeTemplate = (RId) => {
    return axiosClient.get(`/template/${RId}/unfavorite`)
}

const deleteTemplate = (RId) => {
    return axiosClient.get(`/template/${RId}/delete`)
}

const updateTemplateInformation = (RId, data) => {
    return axiosClient.post(`/template/${RId}/rename`, data)
}



export {
    getAllTemplate,
    likeTemplate,
    unlikeTemplate,
    deleteTemplate,
    updateTemplateInformation
}