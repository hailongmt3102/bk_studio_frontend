import axiosClient from './axios'

const getListPeople = () => {
    return axiosClient.get('user/list')
}
const getListPeopleByProjectID = (id,data) => {
    return axiosClient.get('project/'+id+'/people',data)
}

export {
    getListPeople,
    getListPeopleByProjectID
}