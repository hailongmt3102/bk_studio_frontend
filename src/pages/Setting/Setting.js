import { useContext, useEffect, useState } from 'react';

import { GetInformationApi, updateInformation } from "api/Account";
import ConfirmDialog from "components/ConfirmDialog";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Store } from 'react-notifications-component';
import tick from "resources/icons/tick.svg";
import { localizationContext } from '../../App';
import { content } from "../../utils/notification";
import { loadingContext } from "App"


import Drop from 'pages/AdjustingReport/components/Drop';
export default function Setting(props) {
    const setIsLoading = useContext(loadingContext)
    const localization = useContext(localizationContext)
    const languageSaved = localStorage.getItem('language') || 'English'
    const [language, setlanguage] = useState(languageSaved)
    const [premium, setPremium] = useState(false)


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
                    <Form.Label column sm="2">
                        <h5 className='mt-4' style={{ "fontWeight": "bold", fontSize: 16 }}>{localization.DarkMode}  </h5>
                    </Form.Label>
                    <Col className='mt-4' sm="5">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            onChange={(event) => {
                                props.setLightMode(!event.target.checked)
                                localStorage.setItem('lightTheme', !event.target.checked)
                            }}
                            checked={!props.lightMode}
                        />
                    </Col>
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
                        <div className='customFontRoboto' style={{ paddingLeft: "100px"}}>
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
