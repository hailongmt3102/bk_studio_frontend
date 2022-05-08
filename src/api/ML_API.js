import axiosClient from './axios'
const bayesModelAPI = (testdata) => {
    return new Promise((resolve, reject) => {
        fetch("http://ec2-13-215-176-116.ap-southeast-1.compute.amazonaws.com:8000/bayes", {

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

const getAllModel = () => {
    return axiosClient.get('/machinelearning')
}

const getAModelByID = (id) => {
    return axiosClient.get('/machinelearning/' + id)
}
export {
    bayesModelAPI,
    getAllModel,
    getAModelByID
}