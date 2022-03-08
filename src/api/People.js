import axiosClient from './axios'

const getListPeople = () => {
    return axiosClient.get('user/list')
}
const getListPeopleByProjectID = (id) => {
    return axiosClient.get('project/'+id+'/people')
}

export {
    getListPeople,
    getListPeopleByProjectID
}