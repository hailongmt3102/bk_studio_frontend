import React, { useState, useEffect } from "react";
import Content from "./components/Content";
import MenuBar from "./components/MenuBar";
import ToolBar from "./components/ToolBar";
import "./EditReport.css";
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Form, InputGroup, Col, Button, FormControl } from 'react-bootstrap'
import back from "resources/icons/back_round_deep_blue.svg"
import { GetTableColumns, QueryData } from "api/DataSources"
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import { Roboto, Poppins } from "../../utils/font"

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



    const [options, setOptions] = useState([
        {
            "labelKey": "optionItem1",
            "value": "Option item 1"
        },
        {
            "labelKey": "optionItem2",
            "value": "Option item 2"
        }
    ])
    const handleChange = (selectedOptions) => {
        console.log(selectedOptions);
    }

    // render components
    return (
        <div>
            <div className="row">

                <div className="col-2 ">
                    <Tabs className="p-2" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab className="p-4" eventKey="Data" label="Data">
                            <BootstrapSelect options={options} onChange={handleChange} />
                        </Tab>
                        <Tab className="p-4" eventKey="Format" label="Style">Tab 2 content</Tab>
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
                        <MenuBar />
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
