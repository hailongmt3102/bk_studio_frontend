import axiosClient from './axios'

const getListCompanies = () => {
    return axiosClient.get('/general/companies')
}


export {
    getListCompanies
}