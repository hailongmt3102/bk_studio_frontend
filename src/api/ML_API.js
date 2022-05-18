import axiosClient from './axios'
const bayesModelAPI = (testdata) => {
    return new Promise((resolve, reject) => {
        fetch("http://ec2-18-138-249-226.ap-southeast-1.compute.amazonaws.com:8000/bayes", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify(testdata),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })

            // Converting to JSON
            .then(response => resolve(response.json()))
            .catch(err => {
                reject(err)
            })
    })
}

const fetchAPI = (data, api) => {
    return new Promise((resolve, reject) => {
        fetch(api, {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })

            // Converting to JSON
            .then(response => resolve(response.json()))
            .catch(err => {
                reject(err)
            })
    })
}

const getAllModel = () => {
    return axiosClient.get('/machinelearning')
}

const getAModelByID = (id) => {
    return axiosClient.get('/machinelearning/' + id)
}

const canModifyModel = (id) => {
    return axiosClient.get(`/machinelearning/${id}/canModify`)
}

const modifyModel = (id, data) => {
    return axiosClient.post(`/machinelearning/${id}/modify`, data)
}

const createModel = (data) => {
    return axiosClient.post(`/machinelearning/new`, data)
}


export {
    bayesModelAPI,
    getAllModel,
    getAModelByID,
    canModifyModel,
    modifyModel,
    createModel,
    fetchAPI
}