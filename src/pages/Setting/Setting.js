import { useContext, useEffect, useState } from 'react';

import { GetInformationApi, updateInformation } from "api/Account";
import ConfirmDialog from "components/ConfirmDialog";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Store } from 'react-notifications-component';
import tick from "resources/icons/tick.svg";
import { localizationContext } from '../../App';
import { content } from "../../utils/notification";
import { loadingContext } from "App"
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

import Switch from '@mui/material/Switch';
import Drop from 'pages/AdjustingReport/components/Drop';
export default function Setting(props) {
    const setIsLoading = useContext(loadingContext)
    const localization = useContext(localizationContext)
    const languageSaved = localStorage.getItem('language') || 'English'
    const [language, setlanguage] = useState(languageSaved)
    const [premium, setPremium] = useState(false)

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const handleCloseYes = (id) => {
        getRank("Premium")
    }
    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = () => {
        if (!premium)
            setConfirmDialog({ ...confirmDialog, isOpen: true })
    }

    const [confirmDialog1, setConfirmDialog1] = useState({ isOpen: false, title: '', subTitle: '' })

    const handleCloseYes1 = (id) => {
        getRank("Free")
    }
    const handleCloseNo1 = () => {
        setConfirmDialog1({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen1 = () => {
        if (premium)
            setConfirmDialog1({ ...confirmDialog1, isOpen: true })
    }


    useEffect(() => {
        setIsLoading(true)
        GetInformationApi()
            .then(response => {
                console.log(response.data.RankAccount === "Premium")
                setPremium(response.data.RankAccount === "Premium")
                setIsLoading(false)

            })
            .catch(
                error => {
                    console.log(error)
                    setIsLoading(false)

                }
            )
    }, [])

    const getRank = (type) => {
        updateInformation({
            "RankAccount": type,

        })
            .then(res => {
                Store.addNotification(content("Success", "Updated", "success"))
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                title="Do you want to get premium account ?"
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog1}
                title="Do you want switch to free account ?"
                handleCloseYes={() => handleCloseYes1()}
                handleCloseNo={() => handleCloseNo1()}
            />
            <h2 class="mt-3 mb-3 ms-4 PrimaryFontColor" style={{ "fontWeight": "bold", fontSize: "40px" }}>{localization.Setting} </h2>
            <div className='customforeground' style={{ paddingBottom: "25px", height: "800px" }}>

                <Form.Group as={Row} className="mb-3 mt-3 ms-4 align-items-center" controlId="formPlaintextPassword">

                    <div className='row'>
                        <div className='col-2'>
                            <Form.Label column sm="2">
                                <h5 className='mt-4' style={{ "fontWeight": "bold", fontSize: 16 }}>{localization.DarkMode}  </h5>
                            </Form.Label>
                        </div>

                        <div className='col text-start m-auto'>
                            <div className='mt-2'>
                                <FormControlLabel
                                    control={<MaterialUISwitch sx={{ m: 1 }} />}
                                    label=""
                                    onChange={(event) => {
                                        props.setLightMode(!event.target.checked)
                                        localStorage.setItem('lightTheme', !event.target.checked)
                                    }}
                                    checked={!props.lightMode}
                                />
                            </div>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-7 ms-4 ms-2 align-items-center" controlId="formPlaintextPassword">
                    <Form.Label column sm="2" >
                        <h5 style={{ "fontWeight": "bold", fontSize: 16 }}>{localization.Language} </h5>
                    </Form.Label>
                    <Col sm="2" >
                        <Drop title={language} items={["English", "Vietnamese"]} onClick={(val, index) => {
                            setlanguage(val)
                            props.setLanguage(val)
                            window.location.reload()
                        }} />
                    </Col>

                </Form.Group>

                <Row>
                    <Col className="mt-4 ms-5 level1 brownColor" md={3} style={{ borderRadius: "20px", marginRight: "40px" }}>
                        <Col className=" text-center me-2 align-items-end "> <h3 class="customFontBold SecondFontColor align-self-center mt-3 mb-3" > {localization.Free}</h3></Col>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext">
                                    {localization.usetool}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext">
                                    {localization.createreports}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customhinttext">
                                    {localization.addData}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customhinttext" >
                                    {localization.limitPro}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customhinttext">
                                    {localization.invite}
                                </div>
                            </div>
                        </div>
                        <div className='customFontRoboto' style={{ paddingLeft: "100px" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customhinttext">
                                    {localization.nolimitreports}
                                </div>
                            </div>
                        </div>
                        <div className="text-center gap-2 mt-4 mb-4  customFontRoboto" >
                            <Button variant={premium ? "success" : "secondary"} size="sm" style={{ width: "200px", borderRadius: "20px" }}
                                onClick={() => {
                                    handleOpen1()
                                }}
                            >
                                {!premium ? localization.used : "Free"}
                            </Button>
                        </div>

                    </Col>
                    <Col className="mt-4 ms-5 level1 brownColor" md={3} style={{ borderRadius: "15px", marginRight: "40px" }}>
                        <Col className=" text-center align-items-end ">
                            <h3 class=" align-self-center mt-3 mb-3 SecondFontColor customFontBold">
                                {localization.VIP}
                            </h3>
                        </Col>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext" >
                                    {localization.usetool}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext" >
                                    {localization.createreports}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext" >
                                    {localization.addData}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext" >
                                    {localization.limitPro}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext" >
                                    {localization.invite}
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "100px", fontFamily: "Roboto" }}>
                            <div className="row  ">
                                <div class=" justify-content-center  col-1">
                                    <img src={tick} className="customhidden" style={{ height: 10, width: 10 }} />
                                </div>
                                <div class="col-7 customFontRoboto customwhitetext">
                                    {localization.nolimitreports}
                                </div>
                            </div>
                        </div>
                        <div className="text-center gap-2 mt-4 mb-4 customFontRoboto"   >
                            <Button variant={!premium ? "warning" : "secondary"} size="sm" style={{ width: "200px", borderRadius: "15px" }}
                                onClick={() => {
                                    handleOpen()
                                }}>
                                <div className='text-white'>{premium ? localization.used : localization.getPremiun} </div>
                            </Button>
                        </div>

                    </Col>
                </Row>
            </div>
        </div >
    )
}
