import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import AdjustedDropdown from '../components/AdjustedDropdown'
import { Form, InputGroup, Col, Row, Container, Button, FormControl, FormGroup } from 'react-bootstrap'
import search from "resources/icons/search.svg"
import profile from "resources/icons/profile.svg"
import logout_icon from "resources/icons/logout_icon.svg"
import Autocomplete from '@mui/material/Autocomplete';
const orangeStyle = {
    color: "#FF7F0D",
}

export default function Header() {
    var url = useLocation().pathname
    const [visible, setVisible] = useState(true)
    var nav = useNavigate()
    const fonts = ['Roboto', 'Poppins'];
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
            <div className='text-center row m-0 p-0'>
                <div className='col-2 m-0 p-0' >
                </div>
                <div className='col-8 m-0 p-0 mt-4'  >
                    <Autocomplete

                        id="asynchronous-demo"
                        options={fonts}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                                <Form.Group   {...params.inputProps} md="12">
                                    <InputGroup>
                                        <InputGroup.Text className='border-right-0' style={{backgroundColor:"white"}} id="inputGroupPrepend "><img src={search}></img></InputGroup.Text>
                                        <Form.Control
                                        className='border-right-0 ' 
                                            onChange={(e) => {
                                                
                                            }}
                                            // type={isVisible ? "text" : "password"}
                                            placeholder="Search"
                                            // value={information.Password}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                {/* 
                                <input type="text" 
                                    style={{ height: "50px", width: "1200px" }}

                                /> */}
                            </div>
                        )}
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
                                <div className='bg-primary text-white p-1' style={{ height: "45px", width: "45px", borderRadius: "45px", "fontSize": "26px" }}>
                                    <div className=''>
                                        {localStorage.getItem("username") !== null ? localStorage.getItem("username")[0].toUpperCase() : ""}
                                    </div>
                                </div>
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
