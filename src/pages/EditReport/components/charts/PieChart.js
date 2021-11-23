import React from 'react'
import { Pie} from 'react-chartjs-2'

export default function PieChart(props) {
    return (
        <div>
            <Pie data={props.data} />
        </div>
    )
}
