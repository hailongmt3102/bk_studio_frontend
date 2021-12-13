import React, { useState, useRef , useEffect} from "react";
import CircleModel from "./components/addShapeModel/CircleModel";
import Content from "./components/Content";
import EditBar from "./components/EditBar";
import ViewBar from "./components/ViewBar";
import "./EditReport.css";

import {GetTableColumns, QueryData} from "api/DataSources"


export default function EditReport(props) {
    useEffect(() => {
        // get data source
        GetTableColumns()
        .then(res => console.log(res))  
        .catch(err => console.log(err))
    }, [])

    const colorTemplate = ['rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)', 
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
    ] 
    const [dataSource, setDataSource] = useState({
        user_details_csv : ["user_id", "username", "first_name", "last_name", "gender", "password", "status"]
    })
    const [reports, setReports] = useState([
    ])

    const addShape = (table, query) => {
        QueryData(table, query)
        .then(res => {
            console.log(res)
            let dataResponse = res.data.body[0]
            // setReports([...reports, {
            //     type: 'doughnut',
            //     data : {
            //         labels : Object.keys(dataResponse),
            //         datasets : [
            //             {
            //                 label : "report",
            //                 data : Object.values(dataResponse),
            //                 backgroundColor : Object.values(dataResponse).map((_,i) => i < colorTemplate.length ? colorTemplate[i] : colorTemplate[colorTemplate.length - 1]),
            //                 hoverOffset : 5
            //             }
            //         ]
            //     }
            // }])
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-2 bg-info"> 
                {/* Menu */}
                </div>
                <div className="col-10">
                    <div className="rightColumn p-3">
                        <h2>My report</h2>
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
