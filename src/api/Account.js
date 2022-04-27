import axiosClient from "./axios"

const LoginApi = (data) => {
    return axiosClient.post("/account/login", data)
}
const ForgotPasswordAPI = (data) => {
    console.log("/account/forgot?Email=" + data)
    return axiosClient.get("/account/forgot?Email=" + data)
}
const SetNewPasswordAPI = (data) => {
    console.log(data)
    return axiosClient.post("/user/newpassword", data)
}
const updatePasswordAPI = (data) => {
    console.log(data)
    return axiosClient.post("/account/forgot", data)
}
const RegisterApi = (data) => {
    return axiosClient.post("/account/register", data)
}
const GetInformationApi = () => {
    return axiosClient.get("/user/info")
}
const GoogleLoginApi = (data) => {
    return axiosClient.post("/account/login/google", data)
}
const updateInformation = (data) => {
    return axiosClient.post("/user/updateinformation", data)
}

const updateAvatar = (data) => {
    return axiosClient.post("/upload/avt", data)
}

export {
    LoginApi,
    RegisterApi,
    GoogleLoginApi,
    ForgotPasswordAPI,
    updatePasswordAPI,
    GetInformationApi,
    SetNewPasswordAPI,
    updateInformation,
    updateAvatar
}