import axiosClient from "./axios"

const LoginApi = (data) => {
    return axiosClient.post("/account/login", data)
}
const ForgotPassword  = (data) => {
    console.log(data)
    return axiosClient.get("account/forgot?Email=$data" )
}
const RegisterApi= (data) => {
    return axiosClient.post("/account/register", data)
}
const GoogleLoginApi = (data) => {
    return axiosClient.post("/account/login/google", data)
}

export {
    LoginApi, 
    RegisterApi,
    GoogleLoginApi, 
    ForgotPassword
}