import axiosClient from "./axios"

const checkPermission = () => {
    return axiosClient.get('/admin/permission')
}

const getRegisterRequest = () => {
    return axiosClient.get('/admin/registerReq')
}

const addNewUser = (data) => {
    return axiosClient.post('/admin/newUser', data)
}

const deleteUser = (Email) => {
    return axiosClient.post('/admin/deleteUser', {User: Email})
}

const changePosition = (Email, Position) => {
    return axiosClient.post('/admin/changePosition', {
        Email: Email,
        Position: Position
    })
}

const confirmRegisterRequest = (Email) => {
    return axiosClient.post('/admin/confirmRegReq', {Email: Email})
}

const rejectRegisterRequest = (Email) => {
    return axiosClient.post('/admin/rejectRegReq',{Email: Email})
}

export {
    checkPermission,
    addNewUser,
    deleteUser,
    changePosition,
    getRegisterRequest,
    confirmRegisterRequest,
    rejectRegisterRequest
}