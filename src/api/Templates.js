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




export {
    getAllTemplate,
    likeTemplate,
    unlikeTemplate


}