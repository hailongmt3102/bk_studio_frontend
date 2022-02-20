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
        }else {
            setVisible(true)
        }
    }, [url])

    const logout = () => {
        localStorage.removeItem("token")
        nav('account/login')
    }
    return (
        visible ?
        <div className='d-flex justify-content-end'>
            {/* <AdjustedDropdown items={["Logout"]} onclick={(item) => {
                if (item == "Logout") logout()
            }}/> */}
            <button className='btn btn-default' onClick={() => {
                logout()
            }}> 
                <h4 className='me-4'>Logout</h4>
            </button>
        </div>
        : null
    );

}
