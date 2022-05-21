import React, { useEffect, useState, useContext } from 'react'

import { addNewUser as addNewUserAPI, deleteUser as deleteUserAPI, checkPermission, changePosition as changePositionAPI } from 'api/Admin'
import { getListPeople } from 'api/People'
import { useNavigate } from 'react-router-dom'
import { loadingContext } from 'App';
import ConfirmDialog from 'components/ConfirmDialog';
import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import NewUserPopup from './components/NewUserPopup';


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
    const addNewUser = async (data) => {
        console.log(data)
        try {
            let result = await addNewUserAPI(data)
            Store.addNotification(content("Success", "Insert successful", "success"))
            setShowNewUserModel(false)
            setUserInfo([...userInfo, result.data])
        } catch (error) {
            Store.addNotification(content("Error", error.response.data, "warning"))
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>

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
            <div>
                Admin site
            </div>
            <button onClick={() => {
                setShowNewUserModel(true)
            }}>
                add user
            </button>
            {
                userInfo.map((user, index) =>
                    <div className='row'>
                        <div className='col'>{index}</div>
                        <div className='col'> {user.Email}</div>
                        <div className='col'> {user.UserName}</div>
                        <div className='col'> {user.Position}</div>
                        <div className='col'>
                            <button className=' btn btn-default' onClick={() => {
                                deleteUser(index)
                            }}>delete </button>
                        </div>
                    </div>)
            }
        </div>
    )
}
