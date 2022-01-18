import axiosClient from "./axios"

const LoginApi = (data) => {
    return axiosClient.post("/account/login", data)
}
const RegisterApi = (data) => {
    return axiosClient.post("/account/register", data)
}

export {
    LoginApi, 
    RegisterApi
}