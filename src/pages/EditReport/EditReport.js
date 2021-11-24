import React, { useState, useRef } from "react";
import CircleModel from "./components/AddShapeModel/CircleModel";
import Content from "./components/Content";
import EditBar from "./components/EditBar";
import ViewBar from "./components/ViewBar";
import "./EditReport.css";


export default function EditReport(props) {
    const colorTemplate = ['rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
    ]
    const [reports, setReports] = useState([
        {
            type: 'doughnut',
            data: {
                labels: [
                    'male',
                    'female',
                    'unknown'
                ],
                datasets: [
                    {
                        label: "example report",
                        data: [100, 200, 300],
                        backgroundColor:[
                            colorTemplate[0],
                            colorTemplate[1],
                            colorTemplate[2]
                        ],
                        hoverOffset: 10
                    }
                ]
            }
        },
        {
            type: 'pie',
            data: {
                labels: [
                    'male',
                    'female'
                ],
                datasets: [
                    {
                        label: "example report",
                        data: [100, 200],
                        backgroundColor:[
                            colorTemplate[0],
                            colorTemplate[1]
                        ],
                        hoverOffset: 4
                    }
                ]
            }
        }
    ])

    return (
        <div>
            <div className="row">
                <div className="col-2 bg-info"> 
                Menu
                </div>
                <div className="col-10">
                    <div className="rightColumn p-3">
                        <h2>My report</h2>
                        {
                            props.isEdit === true ? (
                                <EditBar />

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
