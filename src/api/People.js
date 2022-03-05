import axiosClient from './axios'

const getListPeople = () => {
    return axiosClient.get('user/list')
}

export {
    getListPeople,
}