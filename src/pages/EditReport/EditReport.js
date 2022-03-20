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
import underline from "resources/icons/underline.svg"
import italic from "resources/icons/italic.svg"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { GetTableColumns, QueryData } from "api/DataSources"
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import { Roboto, Poppins } from "../../utils/font"
import SqlPopUp from "./components/SqlPopUp";





export default function EditReport() {
    // this function will be call when loaded page
    useEffect(() => {
        // get data source
        // GetTableColumns()
        // .then(res => console.log(res))  
        // .catch(err => console.log(err))
    }, [])
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
    // render components

    return (
        <div>
            <SqlPopUp
                type={popUpType}
                show={showSqlPopUp}
                handleClose={() => {
                    setshowSqlPopUp(false)
                }}
                onComplete={(sql) => {
                    console.log(sql)
                    // setAppendPeopleList(appendPeopleList + 1)
                }}
            />
            <div className="row">

                <div className="col-2 ">
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
                            <div>Alignmnet</div>
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
                <div className="col-10 h-200">
                    <div className="rightColumn p-3">
                        <div className="row m-0 p-0">
                            <div className="col-7 m-0 p-0">
                                <div className="row" >
                                    <div className="col-1 mt-1">
                                        <button type="button" class="btn btn-sm">
                                            <img src={back} />
                                        </button>
                                    </div>
                                    <div className="col-6" >
                                        <Form.Control type="text" value="My report" onChange={(event) => {
                                            // setprojectInformation({ ...projectInformation, Name: event.target.value })
                                        }}
                                            className="text-primary border-0 mb-2"
                                            style={{
                                                fontSize: "32px",
                                                backgroundColor: "#F7F7F7",
                                                fontFamily: "Poppins"
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        </div>
                        <MenuBar showSqlPopUpFunction={showSqlPopUpFunction} />
                        <ToolBar />
                        <div className="m-2 content">
                            {/* <Content reports = {reports}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
