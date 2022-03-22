import React, { useEffect, useState } from 'react'
import DoughnutChart from './charts/DoughnutChart';
import PieChart from './charts/PieChart'
import TableComponent from './table/TableComponent'
import { QueryData as QueryDataApi } from 'api/DataSources'

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);


export default function Content(props) {

    const [tables, setTables] = useState({})

    // setInterval(() => {
    //     console.log(tables)
    // }, 2000);

    useEffect(() => {
        props.components.map(component => {
            // get data of each component
            switch (component.Type) {
                case "Table":
                    QueryDataApi(component.QueryCommand)
                        .then(res => {
                            try {
                                let result = component
                                result.data = res.data
                                let positionString = result.Position.split(";")
                                result.Position = {
                                    x: positionString[0].substring(2),
                                    y: positionString[1].substring(2)
                                }
                                let TextThemeArray = result.TextTheme.split(";")
                                result.TextTheme = {}
                                TextThemeArray.map(style => result.TextTheme[style.split(':')[0]] = style.split(':')[1])
                                updateDataTable(result.Id, result)
                            } catch (e) {
                                alert(e)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    break
                default:
                    break
            }
        })
    }, [props.components])

    const updateDataTable = (key, data) => {
        setTables({ ...tables, [key]: data })
    }
    return (
        <div>
            {
                Object.keys(tables).map((key, index) =>
                    <div style={{
                        fontSize: tables[key].TextTheme.size,
                        fontFamily: tables[key].TextTheme.font,
                        textAlign: "center"
                    }}
                    >
                        <TableComponent
                            key={key}
                            data={tables[key]}
                            updateDataTable={(data) => { updateDataTable(key, data) }}
                        />
                    </div>
                )
            }
        </div>
        // <div className='row'>
        //     <div className='col-4'>
        //         {
        //             props.reports.map(report => {
        //                 switch (report.type) {
        //                     case "Doughnut":
        //                         return (
        //                             <DoughnutChart data={report.data} option={report.option} />
        //                         )
        //                     case "Pie":
        //                         return (
        //                             <PieChart data={report.data} option={report.option} />
        //                         )
        //                     default:
        //                         return null
        //                 }
        //             })
        //         }
        //     </div>
        //     <div className='col-2'></div>
        //     <div className='col-6'>
        //         {
        //             props.reports.map(report => {
        //                 if (report.type === "Table")
        //                 {
        //                     if (report.data.length  === 0) return null
        //                     let keys = Object.keys(report.data[0])
        //                     return (
        //                         <div class="overflow-scroll" style={{ maxHeight: "500px" }}>
        //                             <table class="table table-success table-striped">
        //                                 <thead>
        //                                     {
        //                                         keys.map(ele => <th scope='col'>{ele}</th>)
        //                                     }
        //                                 </thead>
        //                                 <tbody>
        //                                     {
        //                                         report.data.map((row, index) => {
        //                                             return(
        //                                                 <tr key={index}>
        //                                                     {
        //                                                         keys.map(key => <td>{row[key]}</td>)
        //                                                     }
        //                                                 </tr>
        //                                             )
        //                                         })
        //                                     }
        //                                 </tbody>
        //                             </table>
        //                         </div>
        //                     )
        //                 }
        //             })
        //         }
        //     </div>
        // </div>

    )
}
