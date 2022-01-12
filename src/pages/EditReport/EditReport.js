import React, { useState, useEffect} from "react";
import Content from "./components/Content";
import EditBar from "./components/EditBar";
import ViewBar from "./components/ViewBar";
import "./EditReport.css";

import {GetTableColumns, QueryData} from "api/DataSources"


export default function EditReport(props) {
    // this function will be call when loaded page
    useEffect(() => {
        // get data source
        GetTableColumns()
        .then(res => console.log(res))  
        .catch(err => console.log(err))
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
        user_details_csv : ["user_id", "username", "first_name", "last_name", "gender", "password", "status"]
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
        let dataResponse = res.data.body.length > 1 ?  res.data.body.reduce((pre, cur) => [...pre, ...cur]) : res.data.body
        setReports([...reports, {
            type: 'Doughnut',
            data : {
                labels : dataResponse.map(field => Object.keys(field)[0]),
                datasets : [
                    {
                        label : "report",
                        data : dataResponse.map(field => Object.values(field)[0]),
                        backgroundColor : Object.values(dataResponse).map((_,i) => i < colorTemplate.length ? colorTemplate[i] : colorTemplate[colorTemplate.length - 1]),
                        hoverOffset : 5
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

    // render components
    return (
        <div>
            <div className="row">
                <div className="col-2 bg-info"> 
                {/* Menu */}
                </div>
                <div className="col-10">
                    <div className="rightColumn p-3">
                        <h2>My report1</h2>
                        {
                            props.isEdit === true ? (
                                <EditBar dataSource={dataSource} addShape={addShape}/>

                            ) : (
                                <ViewBar />
                            )
                        }

                        <div>
                            <div className="m-2 content">
                                <Content reports = {reports}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
