import axiosClient from './axios'

const getListProject = () => {
    return axiosClient.get('/project/list')
}

const createNewProject = (data) => {
    return axiosClient.post('/project/new', data)
}

const changeStatus = (data) => {
    return axiosClient.post('/project/status', data)
}

const deleteProject = (data) => {
    return axiosClient.post('/project/delete', data)
}

const renameProject = (data) => {
    return axiosClient.post('/project/rename', data)
}
const inviteMember = (id) => {
    return axiosClient.post('/project/'+id+'/invite')
}


export {
    getListProject,
    createNewProject,
    changeStatus,
    deleteProject,
    renameProject,
    inviteMember
}