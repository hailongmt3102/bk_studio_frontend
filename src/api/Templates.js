import axiosClient from './axios'

const getAllTemplate = () => {
    return axiosClient.get("/template/all")
}



export {
    getAllTemplate,
   
}