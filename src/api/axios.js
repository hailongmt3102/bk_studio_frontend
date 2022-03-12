import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
})

axiosClient.interceptors.request.use(
    request => {
        var token = localStorage.getItem("token")
        if (token !== null)
            request.headers.authorization =`Bearer ${token}`

        return new Promise((resolve, reject) => {
            resolve(request)
        })
    },
    error => {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
)

axiosClient.interceptors.response.use(
    response => {
        return new Promise((resolve, reject) => {
            resolve(response)
        })
    },
    error => {
        if (error.data.status === 401 || error.data.status === 403) {
            // remove username in local storage
            localStorage.removeItem("username")
        }
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
)

export default axiosClient
