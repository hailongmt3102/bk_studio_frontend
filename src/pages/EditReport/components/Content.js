import React from 'react'
import DoughnutChart from './charts/DoughnutChart';
import PieChart from './charts/PieChart'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default function Content(props) {
    return (
        <div className='row'>
            <div className='col-4'>
                {
                    props.reports.map(report => {
                        switch (report.type) {
                            case "Doughnut":
                                return (
                                    <DoughnutChart data={report.data} option={report.option} />
                                )
                            case "Pie":
                                return (
                                    <PieChart data={report.data} option={report.option} />
                                )
                            default:
                                return null
                        }
                    })
                }
            </div>
            <div className='col-2'></div>
            <div className='col-6'>
                {
                    props.reports.map(report => {
                        if (report.type === "Table")
                        {
                            if (report.data.length  === 0) return null
                            let keys = Object.keys(report.data[0])
                            return (
                                <div class="overflow-scroll" style={{ maxHeight: "500px" }}>
                                    <table class="table table-success table-striped">
                                        <thead>
                                            {
                                                keys.map(ele => <th scope='col'>{ele}</th>)
                                            }
                                        </thead>
                                        <tbody>
                                            {
                                                report.data.map((row, index) => {
                                                    return(
                                                        <tr key={index}>
                                                            {
                                                                keys.map(key => <td>{row[key]}</td>)
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
