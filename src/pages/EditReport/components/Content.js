import React from 'react'
import DoughnutChart from './charts/DoughnutChart';
import PieChart from './charts/PieChart'


import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default function Content(props) {
    return (
        <div>
            {
                props.reports.map(report => {
                    switch(report.type) {
                        case "doughnut" :
                            return(
                                <DoughnutChart data={report.data} option={report.option}/>
                            )
                        case "pie" :
                            return(
                                <PieChart data={report.data} option={report.option}/>
                            )
                        default:
                            return null
                    }
                })
            }
        </div>
    )
}
