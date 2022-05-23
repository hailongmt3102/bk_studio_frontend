import axiosClient from "./axios"

const checkPermission = () => {
    return axiosClient.get('/admin/permission')
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
export {
    checkPermission,
    addNewUser,
    deleteUser,
    changePosition
}