import React, { useEffect, useState } from 'react'
import TableComponent from './table/TableComponent'
import { QueryData as QueryDataApi } from 'api/DataSources'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { Rnd } from 'react-rnd'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);


export default function Content(props) {

    const [pieDataSet, setPieDataSet] = useState([])

    const PieData = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: pieDataSet,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    const Baroptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const BarNgangoptions = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    //  const Bardata = {
    //     labels:['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data:  [33, 53, 85, 41, 44, 65],
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: [33, 53, 85, 41, 44, 65],
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    // const Linedata = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //         {
    //             label: "First dataset",
    //             data: ["asdfasdf", "asdf", "asdf", "zxcv", "qwer", "dfgh"],
    //             fill: true,
    //             backgroundColor: "rgba(75,192,192,0.2)",
    //             borderColor: "rgba(75,192,192,1)"
    //         },
    //         {
    //             label: "Second dataset",
    //             data: [33, 25, 35, 51, 54, 76],
    //             fill: false,
    //             borderColor: "#742774"
    //         }
    //     ]
    // };

    const [tables, setTables] = useState({})
    const [lineDataSet, setLineDataset] = useState({})
    const [barDataSet, setBarDataset] = useState({})

    const fetchData = async () => {
        let table = {}
        let lineCharts = {}
        let barCharts = {}
        for (let i = 0; i < props.components.length; i++) {
            let component = props.components[i]
            switch (component.Type) {
                case "Table":
                    try {
                        let res = await QueryDataApi(component.QueryCommand)
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
                        table[result.Id] = result
                    }
                    catch (err) {
                        console.log(err.response.data)
                    }
                    break
                case "Pie Chart":
                    try {
                        let res = await QueryDataApi(component.QueryCommand)
                        //res.data is list json 
                        console.log("data trả về từ api", res.data)
                        setPieDataSet(res.data.map((e) => e.user_id))
                    }
                    catch (err) {
                        console.log(err.response.data)
                    }
                    break
                case "Doughnut Chart":
                    try {
                        let res = await QueryDataApi(component.QueryCommand)
                        //res.data is list json 
                        console.log("data trả về từ api", res.data)
                        setPieDataSet(res.data.map((e) => e.user_id))
                    }
                    catch (err) {
                        console.log(err.response.data)
                    }
                    break
                case "Line Chart":
                    try {
                        let res = await QueryDataApi(component.QueryCommand)

                        if (res.data.length == 0) return
                        let result = component
                        let positionString = result.Position.split(";")
                        result.Position = {
                            x: positionString[0].substring(2),
                            y: positionString[1].substring(2)
                        }
                        let keys = Object.keys(res.data[0])
                        if (keys.length == 0) return

                        // convert data to array
                        let arrayData = {}
                        keys.map(key => arrayData[key] = [])

                        res.data.map(row => {
                            keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                        })

                        result.lineData = {
                            labels: arrayData[keys[0]],
                            datasets: keys.slice(1).map(key => {
                                return {
                                    label: key,
                                    data: arrayData[key],
                                    fill: true,
                                    backgroundColor: 'rgba(75,192,192,0.2)',
                                    borderColor: 'rgba(75,192,192,1)'
                                }
                            })
                        }
                        lineCharts[result.Id] = result
                    }
                    catch (err) {
                        console.log(err.response.data)
                    }
                    break;
                case "Bar Chart":
                    try {
                        let res = await QueryDataApi(component.QueryCommand)

                        if (res.data.length == 0) return
                        let result = component
                        let positionString = result.Position.split(";")
                        result.Position = {
                            x: positionString[0].substring(2),
                            y: positionString[1].substring(2)
                        }
                        let keys = Object.keys(res.data[0])
                        if (keys.length == 0) return

                        // convert data to array
                        let arrayData = {}
                        keys.map(key => arrayData[key] = [])

                        res.data.map(row => {
                            keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                        })

                        result.barData = {
                            labels: arrayData[keys[0]],
                            datasets: keys.slice(1).map(key => {
                                return {
                                    label: key,
                                    data: arrayData[key],
                                    fill: true,
                                    backgroundColor: 'rgba(75,192,192,0.2)',
                                    borderColor: 'rgba(75,192,192,1)'
                                }
                            })
                        }
                        barCharts[result.Id] = result
                    }
                    catch (err) {
                        console.log(err.response.data)
                    }
                    break;
                default:
                    break
            }
            setTables({ ...tables, ...table })
            setLineDataset({ ...lineDataSet, ...lineCharts })
            setBarDataset({ ...barDataSet, ...barCharts })
        }
    }

    useEffect(() => {
        fetchData()
    }, [props.components])

    const updateDataTable = (key, data) => {
        setTables({ ...tables, [key]: data })
    }

    const updateLineChart = (key, data) => {
        setLineDataset({ ...lineDataSet, [key]: data })
    }

    const updateBarChart = (key, data) => {
        setBarDataset({ ...barDataSet, [key]: data })
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
            {
                Object.keys(lineDataSet).map((key, index) =>
                    <div>
                        <Rnd
                            size={{ width: lineDataSet[key].Width, height: lineDataSet[key].Height }}
                            position={{ x: lineDataSet[key].Position.x, y: lineDataSet[key].Position.y }}
                            onDragStop={(e, d) => {
                                updateLineChart(key, {
                                    ...lineDataSet[key], Position: {
                                        x: d.x,
                                        y: d.y
                                    }
                                })

                            }}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                updateLineChart(key, { ...lineDataSet[key], Width: ref.style.width, Height: ref.style.height })
                            }}
                            className="border"
                        >
                            {lineDataSet[key].Title}
                            <Line data={lineDataSet[key].lineData} />
                        </Rnd>
                    </div>
                )
            }
            {
                Object.keys(barDataSet).map((key, index) =>
                    <div>
                        <Rnd
                            size={{ width: barDataSet[key].Width, height: barDataSet[key].Height }}
                            position={{ x: barDataSet[key].Position.x, y: barDataSet[key].Position.y }}
                            onDragStop={(e, d) => {
                                updateBarChart(key, {
                                    ...barDataSet[key], Position: {
                                        x: d.x,
                                        y: d.y
                                    }
                                })

                            }}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                updateBarChart(key, { ...barDataSet[key], Width: ref.style.width, Height: ref.style.height })
                            }}
                            className="border"
                        >
                            {barDataSet[key].Title}
                            <Bar data={barDataSet[key].barData} />
                        </Rnd>
                    </div>
                )
            }
            {/* {
                <Rnd
                    size={{ width: 1000, height: 1000 }}
                    position={{ x: 0, y: 0 }}

                    className="border"
                >
                    <Pie data={PieData} />

                </Rnd>
            } */}

            <div>
                {/* <Doughnut data={PieData} /> */}
                {/* <Bar options={Baroptions} data={Linedata} /> */}
                {/* <Bar options={BarNgangoptions} data={Linedata} /> */}

            </div>
        </div>
    )
}
