import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import AdjustedDropdown from '../components/AdjustedDropdown'
import profile from "resources/icons/profile.svg"
import logout_icon from "resources/icons/logout_icon.svg"
import bell from "resources/icons/bell.svg"
import chaticon from "resources/icons/chaticon.svg"
import logoapp from "resources/images/hcmut.png"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { GetInformationApi } from "api/Account"

import Badge from "@mui/material/Badge";


export default function Header(props) {
    var url = useLocation().pathname
    const [visible, setVisible] = useState(true)
    var nav = useNavigate()
    const option_list = ['Dashboard', 'Datasources', 'People', "Templates", "Machine Learning", "Your Projects", "Create a report", "Gallery", "Import Data", "Profile", "Setting"];
    useEffect(() => {
        let accountExp = /account\/[a-zA-Z]/
        if (accountExp.test(url)) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [url])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        props.setCurrentUser({
            Email: "",
            UserName: ""
        })
        nav('account/login')
    }
    const [searchContent, setSearchContent] = useState("")

    useEffect(() => {
        GetInformationApi()
            .then(response => {
                setinformation(response.data)
            })
            .catch(
                error => {
                }
            )
    }, [props.currentUser])

    const [information, setinformation] = useState({
        Email: "",
        LastLoginTime: null,
        UserName: "",
        Verification: 1,
        RankAccount: "",
        Avatar: "",
        OverView: "",
        Company: "",
        Gender: "M",
        Address: "",
        Birthday: "",
        Position: ""
    })



    return (
        visible ?
            <div className='text-center row m-0 p-0 header'>
                <div className='col-2 m-0 p-0' >
                    <img onClick={() => { nav("/") }} className='mt-1 ms-2' src={logoapp} height="50px" width="auto" />
                </div>
                <div className='col-8 m-0 p-0 mt-4 text-center'  >
                    <div className='ms-4 me-5'>
                        <Autocomplete
                            className='ms-5 me-5'
                            id="tags-standard"
                            options={option_list}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    placeholder="Go to page..."
                                />
                            )}
                            onChange={(e, val) => {
                                setSearchContent(val)
                                if (val === "Dashboard") {
                                    nav("/")
                                }
                                else if (val === "Datasources") {
                                    nav("/datasources")
                                }
                                else if (val === "People") {
                                    nav("/people")
                                }
                                else if (val === "Your Projects") {
                                    nav("/pList")
                                }
                                else if (val === "People") {
                                    nav("/people")
                                }
                                else if (val === "Create a report") {
                                    nav("/project/create")
                                }
                                else if (val === "Gallery") {
                                    nav("/project/gallery")
                                }
                                else if (val === "Machine Learning") {
                                    nav("/machinelearning")
                                }
                                else if (val === "Import Data") {
                                    nav("/project/import")
                                }
                                else if (val === "Templates") {
                                    nav("/templates")
                                }
                                else if (val === "Profile") {
                                    nav("/personal/profile")
                                }
                                else if (val === "Setting") {
                                    nav("/personal/setting")
                                }
                                else nav("/")
                            }}
                        />
                    </div>
                </div>
                <div className='col-2 mt-3 ' >
                    <div className='row me-2'>
                        <div className='col-10'>
                            <AdjustedDropdown
                                className="text-center"
                                style={{ "justify-content": "center", "align-items": "center" }}
                                items={["Profile", "Logout"]}
                                icons_list={[profile, logout_icon]}
                                onClick={(item) => {
                                    if (item === "Logout") logout()
                                    else if (item === "Profile") nav("personal/profile")
                                }}
                                title={
                                    <div className='d-flex align-items-center'>
                                        <Avatar sx={{ bgcolor: "#0089ED" }}>
                                            <img src={information.Avatar} />
                                        </Avatar>

                                        <div className='ms-2 me-3'>
                                            {localStorage.getItem("username") === null ? "" : localStorage.getItem("username").substring(0, 10)}
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                        {/* <div className='col-2 m-0 p-0 m-auto'>
                            <div className='me-5'>
                                <Badge color="error" overlap="circular" badgeContent=" 12">
                                    <Avatar src={bell} sx={{ width: 35, height: 35 }} />
                                </Badge>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* <div className='col-1 mt-3'>
                    <Badge color="error" overlap="circular" badgeContent=" 12">
                        <Avatar src={chaticon} sx={{ width: 35, height: 35 }} />
                    </Badge>

                </div> */}
            </div>

            : null
    );

}
