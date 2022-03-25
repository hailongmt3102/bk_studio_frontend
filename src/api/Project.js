import axiosClient from './axios'

const getListProject = () => {
    return axiosClient.get('/project/list')
}

const createNewProject = (data) => {
    return axiosClient.post('/project/new', data)
}

const updateStatus = (id, data) => {
    return axiosClient.post('/project/'+id+'/status', data)
}

const deleteProject = (id) => {
    return axiosClient.get('/project/'+id+'/delete')
}

const editProject = (id, data) => {
    return axiosClient.post('/project/'+id+'/update', data)

}
const inviteMember = (id, data) => {
    return axiosClient.post('/project/'+id+'/invite', data)
}

const editPeopleRoleWithProject = (id, data) => {
    return axiosClient.post('/project/'+id+'/updatePermission', data)
}

const canUpdatePermission = (id, data) => {
    return axiosClient.get('/project/'+id+'/canUpdatePermission', data)
}

const getInformationByPId = (id) => {
    return axiosClient.get('/project/'+id+'/info')
}



export {
    getListProject,
    createNewProject,
    updateStatus,
    deleteProject,
    editProject,
    inviteMember,
    editPeopleRoleWithProject,
    canUpdatePermission,
    getInformationByPId
}