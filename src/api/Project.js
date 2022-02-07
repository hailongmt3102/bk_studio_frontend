import axiosClient from './axios'

const getListProject = () => {
    return axiosClient.get('/project/list')
}


export {
    getListProject
}