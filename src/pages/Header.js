import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import AdjustedDropdown from '../components/AdjustedDropdown'


export default function Header() {
    var url = useLocation().pathname
    const [visible, setVisible] = useState(true)
    var nav = useNavigate()

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
    return (
        visible ?
            <div className='d-flex justify-content-end me-2'>
                <AdjustedDropdown items={["Profile", "Logout"]}
                    onClick={(item) => {
                        if (item == "Logout") logout()
                        else if (item == "Profile") nav("personal/profile")
                    }}
                    title={
                        <div className='d-flex align-items-center'>
                            <div className='bg-primary text-white' style={{ height: "40px", width: "40px", borderRadius: "20px" }}>
                                <div>
                                    {localStorage.getItem("username") != null ? localStorage.getItem("username")[0] : ""}
                                </div>
                            </div>
                            <div className='ms-2'>
                                {localStorage.getItem("username")}
                            </div>
                        </div>
                    }
                />
            </div>
            : null
    );

}
