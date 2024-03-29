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
        if ((error.response.status === 401 || (error.response.status === 403 && error.response.data === "Expire")) && !window.location.href.includes('/login')) {
            // remove username in local storage
            localStorage.removeItem("username")
            localStorage.removeItem("currentProject")
            window.location.assign('/account/login/expired')
            return
        }
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
)

export default axiosClient
