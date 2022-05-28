import React, { useEffect, useState, useContext } from 'react'

import { addNewUser as addNewUserAPI, deleteUser as deleteUserAPI, checkPermission, changePosition as changePositionAPI } from 'api/Admin'
import { getListPeople } from 'api/People'
import { useNavigate } from 'react-router-dom'
import { loadingContext } from 'App';
import ConfirmDialog from 'components/ConfirmDialog';
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import NewUserPopup from './components/NewUserPopup';
import DropdownWithIndex0 from 'components/DropdownWithIndex0'

export default function Admin() {


    const [userInfo, setUserInfo] = useState([])
    const navigation = useNavigate()
    const setIsLoading = useContext(loadingContext)

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, index: 0 })
    const [shownewUserModel, setShowNewUserModel] = useState(false)

    const handleCloseYes = async () => {
        if (confirmDialog.index >= userInfo.length) {
            handleCloseNo()
            return
        }
        let Email = userInfo[confirmDialog.index].Email

        try {
            await deleteUserAPI(Email)
            handleCloseNo()
            Store.addNotification(content("Success", "Delete successful", "success"))
            setUserInfo([...userInfo.slice(0, confirmDialog.index), ...userInfo.slice(confirmDialog.index + 1)])
        } catch (error) {
            handleCloseNo()
        }
    }



    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = (index) => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: true, index: index })
    }

    const getData = async () => {
        let myEmail = localStorage.getItem("email") || ""
        setIsLoading(true)
        try {
            await checkPermission()
        } catch (error) {
            setIsLoading(false)
            navigation("/")
        }
        try {
            let userResult = await getListPeople()
            setUserInfo(userResult.data.filter(user => user.Email !== myEmail))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            // navigation("/")
        }
    }

    const deleteUser = (index) => {
        handleOpen(index)
    }

    // ------------------------------

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }

        return (false)
    }



    const addNewUser = async (data) => {
        console.log(data)
        if ([data.Email.length, data.Password.length].includes(0)) {
            Store.addNotification(content("Warning", "Please fill in email or password", "warning"))
            return
        }
        if (!ValidateEmail(data.Email)) {
            Store.addNotification(content("Warning", "You have entered an invalid email address!", "warning"))
            return
        }
        if (data.Password.length < 8) {
            Store.addNotification(content("Warning", "Password have to more than 8 digit", "warning"))
            return
        }
        // }
        try {

            let result = await addNewUserAPI(data)
            Store.addNotification(content("Success", "Insert successful", "success"))
            setShowNewUserModel(false)
            setUserInfo([...userInfo, result.data])
            window.location.reload()
        } catch (error) {
            Store.addNotification(content("Error", error.response.data, "warning"))
        }
    }

    const setPosition = async (index, val) => {
        try {
            let newVal = val
            await changePositionAPI(userInfo[index].Email, val)
            setUserInfo(
                [
                    ...userInfo.slice(0, index),
                    {
                        ...userInfo[index],
                        Position: newVal
                    },
                    ...userInfo.slice(index + 1)
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div style={{ height: "100vh" }}>
            <NewUserPopup
                show={shownewUserModel}
                handleClose={() => {
                    setShowNewUserModel(false)
                }}
                onComplete={addNewUser}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                title="Are you sure you want to delete this user ?"
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            <div className='row mt-4'>
                <h2 class=" col ms-4 mt-2 PrimaryFontColor" style={{ "fontWeight": "bold", fontSize: "40px" }}>
                    Admin site
                </h2>
                <div className='col text-end me-5 m-auto'>
                    <button className='p-3 m-3 ps-3 pe-3 btn btn-primary ' onClick={() => {
                        setShowNewUserModel(true)
                    }}>
                        Add User
                    </button>
                </div>
            </div>
            <div className='m-5 '>
                <table class="table table-bordered text-center ">
                    <thead>
                        <tr className='bg-success'>
                            <th className='col'></th>
                            <th className='col'> <div style={{ color: "white" }}>Email</div></th>
                            <th className='col'> <div style={{ color: "white" }}>User</div></th>
                            <th className='col'> <div style={{ color: "white" }}>Position</div></th>
                            <th className='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((user, index) =>
                            <tr style={{ backgroundColor: "white" }}>
                                <td className='col-1 '>{index + 1}</td>
                                <td className='col '> {user.Email}</td>
                                <td className='col '> {user.UserName}</td>
                                <td className='col '>
                                    <DropdownWithIndex0 title={user.Position} items={["Manager", "Member"]} icons_list={["", ""]}
                                        onClick={(val) => {
                                            setPosition(index, val)
                                        }} /></td>
                                <td className='col '>
                                    <button className=' btn btn-default' style={{ backgroundColor: "red" }} onClick={() => {
                                        deleteUser(index)
                                    }}><div style={{ color: "white" }}>Delete</div> </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
