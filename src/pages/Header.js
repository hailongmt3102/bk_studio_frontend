import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import AdjustedDropdown from '../components/AdjustedDropdown'
import profile from "resources/icons/profile.svg"
import logout_icon from "resources/icons/logout_icon.svg"
import logoapp from "resources/icons/logoapp.svg"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
export default function Header() {
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
        nav('account/login')
    }
    const [searchContent, setSearchContent] = useState("")

    return (
        visible ?
            <div className='text-center row m-0 p-0'>
                <div className='col-2 m-0 p-0' >
                    <img onClick={() => { nav("/") }} className='mt-2 ms-5' src={logoapp} height="50%" width="50%" />
                </div>
                <div className='col-8 m-0 p-0 mt-4'  >
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

                <div className='col-2 mt-3' >
                    <AdjustedDropdown className="text-center" style={{ "justify-content": "center", "align-items": "center" }} items={["Profile", "Logout"]} icons_list={[profile, logout_icon]}
                        onClick={(item) => {
                            if (item === "Logout") logout()
                            else if (item === "Profile") nav("personal/profile")
                        }}
                        title={
                            <div className='d-flex align-items-center'>
                                <Avatar sx={{ bgcolor: "#0089ED" }}>{localStorage.getItem("username") !== null ? localStorage.getItem("username")[0].toUpperCase() : ""}</Avatar>
                                {/* <div className='bg-primary text-white p-1' style={{ height: "45px", width: "45px", borderRadius: "45px", "fontSize": "26px" }}>
                                    <div className=''>

                                    </div>
                                </div> */}
                                <div className='ms-2 me-3'>
                                    {localStorage.getItem("username") === null ? "" : localStorage.getItem("username").substring(0, 10)}
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>

            : null
    );

}
