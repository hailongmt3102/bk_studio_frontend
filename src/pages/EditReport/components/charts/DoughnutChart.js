import React from 'react'
import { Doughnut} from 'react-chartjs-2'

export default function DoughnutChart(props) {
    return (
        <div>
            <Doughnut data={props.data} />
        </div>
    )
}
