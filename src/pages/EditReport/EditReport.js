import React, { useState, useEffect } from "react";
import Content from "./components/Content";
import MenuBar from "./components/MenuBar";
import ToolBar from "./components/ToolBar";
import "./EditReport.css";
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import back from "resources/icons/back_round_deep_blue.svg"
import align_left from "resources/icons/align_left.svg"
import align_right from "resources/icons/align_right.svg"
import align_center from "resources/icons/align_center.svg"
import align_justify from "resources/icons/align_justify.svg"
import bold from "resources/icons/bold.svg"

import edit from "resources/icons/edit.svg"
import underline from "resources/icons/underline.svg"
import italic from "resources/icons/italic.svg"

import Autocomplete from '@mui/material/Autocomplete';
import { GetTableColumns, QueryData } from "api/DataSources"
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { Roboto, Poppins } from "../../utils/font"
import SqlPopUp from "./components/SqlPopUp";
import SharePopUp from "./components/SharePopUp";

import { createNewReport, getAllComponent, createNewComponent, getReportInformation, updateReportInformation } from 'api/Report'
import { useLocation, useNavigate } from "react-router-dom";
import { deep_blue_primary } from "utils/color";



export default function EditReport(props) {

    const location = useLocation().pathname
    const navigate = useNavigate()
    const nav = useNavigate()
    let RId = location.split('/')[3]
    const currentProject = localStorage.getItem("currentProject")



    const updateSubmit = () => {
        updateReportInformation(currentProject, RId, {
            "Hastag": reportInformation.Hastag,
            "Description": "",
            "Name": reportInformation.Name
        })
            .then(res => {
                Store.addNotification(content("Success", "Updated Report Information", "success"))
                window.location.reload()
            })
            .catch(err => {
                Store.addNotification(content("Fail", "Fail update", "danger"))
                console.log(err.response.data)

            })
    }
    const [components, setComponents] = useState([])
    const [reportInformation, setReportInformation] = useState(
        {
            "Id": 0,
            "PId": 0,
            "Hastag": "",
            "Author": ".",
            "CreateTime": "",
            "LastModified": "",
            "Description": "",
            "TId": null,
            "Type": "",
            "Name": ""
        }
    )



    useEffect(() => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            //GET INFORMATION CUA PROJECT 
            getReportInformation(currentProject, RId)
                .then(res => {
                    setReportInformation(res.data)
                    //console.log("report in4:", reportInformation)
                })
                .catch(res => {
                    alert(res.response.data)
                })

            getAllComponent(currentProject, RId)
                .then(res => {
                    setComponents(res.data)
                })
                .catch(res => {
                    alert(res.response.data)
                })
        }

        GetTableColumns()
            .then(res => {
                setDataSource(res.data)
            })
            .catch(err => {
                console.log(err)
            })


    }, [])


    const newFileSubmit = () => {
        createNewReport(localStorage.getItem("currentProject"),
            {
                Hastag: "",
                Description: "",
                Name: "New Report"
            })
            .then(res => {
                console.log(res.data)
                nav(`/project/gallery/${res.data.Id}/edit`)
                window.location.reload()
            })
            .catch(err => {
                alert(err.response.data)
            })
    }






    // define some color template
    const colorTemplate = ['rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
    ]
    // list data sources of the report
    const [dataSource, setDataSource] = useState({
        user_details_csv: ["user_id", "username", "first_name", "last_name", "gender", "password", "status"]
    })

    // list components in the report
    const [reports, setReports] = useState([
    ])

    // receive data from model
    // send it to server and wait respone
    const addShape = (shapeType, table, query) => {
        QueryData(table, query)
            .then(res => {
                switch (shapeType) {
                    case "Doughnut":
                        doughnutShape(res)
                        break;
                    case "Table":
                        tableShape(res)
                    default:
                        break;
                }
            })
            .catch(err => {
                alert("create failure")
                console.log(err)
            })
    }

    // add new doughnut chart
    const doughnutShape = (res) => {
        let dataResponse = res.data.body.length > 1 ? res.data.body.reduce((pre, cur) => [...pre, ...cur]) : res.data.body
        setReports([...reports, {
            type: 'Doughnut',
            data: {
                labels: dataResponse.map(field => Object.keys(field)[0]),
                datasets: [
                    {
                        label: "report",
                        data: dataResponse.map(field => Object.values(field)[0]),
                        backgroundColor: Object.values(dataResponse).map((_, i) => i < colorTemplate.length ? colorTemplate[i] : colorTemplate[colorTemplate.length - 1]),
                        hoverOffset: 5
                    }
                ]
            }
        }])
    }

    // add new table data
    const tableShape = (res) => {
        setReports([...reports, {
            type: "Table",
            data: res.data.body
        }])
    }
    const [key, setKey] = useState('Data');

    const fonts = ['Roboto', 'Poppins'];
    const size = ['14', '16', "32", '45'];
    const [showSqlPopUp, setshowSqlPopUp] = useState(false)
    const [popUpType, setPopUpType] = useState("")


    const showSqlPopUpFunction = (type) => {
        setshowSqlPopUp(true)
        setPopUpType(type)
    }

    const createNewComponentInReport = (query) => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            let RId = location.split('/')[3]
            console.log(query.replaceAll('\n', " "))
            createNewComponent(currentProject, RId, {
                Title: "example",
                Type: "Table",
                QueryCommand: query.replaceAll('\n', " "),
                Height: "600",
                Width: "600",
                Position: "x:100;y:100",
                TitleTheme: "light",
                TextTheme: "font:Roboto;size:12",
                FrameTheme: "light"
            })
                .then(res => {
                    alert(res.data)
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }
    }
    // render components
    const tab_component = () => {
        return <div className="col-2 ">
            <Tabs className="p-2" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab className="p-4" eventKey="Data" label="Data">
                    <h4>Script</h4>
                    <div className="m-4">SELECT* FROM </div>
                    <div className="mt-3">
                        <h4>Data sources:</h4>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <h4>Field:</h4>
                        </div>
                        <div className="col">
                            <h4>Type</h4>
                        </div>
                    </div>
                </Tab>
                <Tab className="p-4" eventKey="Format" label="Style">
                    <div className="mt-2">Text</div>
                    <div className="row mt-2">
                        <div className="col">
                            <Autocomplete
                                id="custom-input-demo"
                                options={fonts}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="mt-2">Size</div>
                    <div className="row mt-2">
                        <div className="col">
                            <Autocomplete
                                id="custom-input-demo"
                                options={size}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="row m-2 m-0 p-0 mt-2  h-100  align-items-center">
                        <div className="col-1 m-0 p-0 text-center" >
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => { }}><img src={bold} height="15px" width="15px" /></button>
                        </div>
                        <div className="col-1 m-0 p-0 ms-5" onClick={() => { }}>
                            <button type="button" class="btn m-0 p-0 btn-sm ms-2" onClick={() => { }}> <img src={italic} height="30px" width="30px" /></button>
                        </div>
                        <div className="col-1 m-0 p-0 ms-5" onClick={() => { }}>
                            <button type="button" class="btn m-0 p-0 btn-sm ms-2" onClick={() => { }}> <img src={underline} height="20px" width="20px" /></button>
                        </div>

                    </div>
                    <div>Alignment</div>
                    <div className="row m-3">
                        <div className="col">
                            <img src={align_left} height="20px" width="20px" />
                        </div>
                        <div className="col">
                            <img src={align_right} height="20px" width="20px" />
                        </div>
                        <div className="col">
                            <img src={align_center} height="20px" width="20px" />
                        </div>
                        <div className="col">
                            <img src={align_justify} height="20px" width="20px" />
                        </div>

                    </div>
                    <div>Fill</div>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                    />

                    <div>Stroke</div>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                    />

                </Tab>

            </Tabs>
        </div>
    }


    const [showSharePopUp, setshowSharePopUp] = useState(false)


    return (
        <div>
            <SqlPopUp
                type={popUpType}
                show={showSqlPopUp}
                handleClose={() => {
                    setshowSqlPopUp(false)
                }}
                onComplete={(sql) => {
                    // setAppendPeopleList(appendPeopleList + 1)
                    createNewComponentInReport(sql)
                }}
                dataSource={dataSource}
            />
            <SharePopUp
                currentProject={currentProject}
                show={showSharePopUp}
                handleOpen={() => {
                    setshowSharePopUp(true)
                }}
                handleClose={() => {
                    setshowSharePopUp(false)
                }}

            />
            <div className="row">
                {tab_component()}
                <div className="col-10 h-200">
                    <div className="rightColumn p-3">
                        <div className="row m-0 p-0">
                            <div className="col-7 m-0 p-0">
                                <div className="row m-0 p-0" >
                                    <div className="col-1 m-0 p-0 mt-1">
                                        <button type="button" class="btn btn-sm" onClick={() => { navigate(-1) }}>
                                            <img src={back} />
                                        </button>
                                    </div>
                                    <div className="col-8 m-0 p-0" >
                                        <Form.Control type="text" value={reportInformation.Name} onChange={(event) => {
                                            setReportInformation({ ...reportInformation, Name: event.target.value })

                                        }}
                                            className="border-0 mb-2 m-0 p-0"
                                            placeholder="Report Name"
                                            style={{
                                                fontSize: "32px",
                                                backgroundColor: "#F7F7F7",
                                                color: deep_blue_primary,
                                                fontFamily: "Poppins",
                                                fontWeight: "bold"
                                            }}
                                        />
                                    </div>

                                </div>
                                <div className="row ms-5 m-0 p-0 text-center">
                                    <div className="col-5">
                                        <Form.Control type="text" value={reportInformation.Hastag} onChange={(event) => {
                                            setReportInformation({ ...reportInformation, Hastag: event.target.value })

                                        }}
                                            className="text-primary border-0  m-0 p-0 ms-4"
                                            placeholder="#Hastag"
                                            style={{
                                                fontSize: "22px",
                                                backgroundColor: "#F7F7F7",
                                                fontFamily: "Poppins",
                                                fontWeight: "bold"
                                            }}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                        <MenuBar
                            newFileSubmit={() => {
                                newFileSubmit()
                            }}
                            updateSubmit={() => updateSubmit()}
                            showSqlPopUpFunction={showSqlPopUpFunction}

                        />

                        <ToolBar
                            OpenSharePopUp={() => setshowSharePopUp(true)}
                        />
                        <div className="m-2 content">
                            <Content components={components} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
