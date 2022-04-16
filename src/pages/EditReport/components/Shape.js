import React, { useEffect, useImperativeHandle, useState } from 'react'
import { QueryData as QueryDataApi } from 'api/DataSources'
import { updateAComponent } from 'api/Report'
import { useLocation } from "react-router-dom";
import TableComponent from './table/TableComponent'
import { Rnd } from 'react-rnd'
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
]

const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
]

const Shape = React.forwardRef((props, ref) => {
    const [componentData, setComponentData] = useState({})
    const location = useLocation().pathname
    const RId = location.split('/')[3]
    const currentProject = localStorage.getItem("currentProject")


    // fetch info here
    const getData = async () => {
        try {
            var result = props.data
            // parse position
            let positionString = result.Position.split(";")
            result.Position = {
                x: positionString[0].substring(2),
                y: positionString[1].substring(2)
            }
            // parse theme from server
            let TextThemeArray = result.TextTheme.split(";")
            result.TextTheme = {}
            TextThemeArray.map(style => result.TextTheme[style.split(':')[0]] = style.split(':')[1])
            let res, keys, arrayData
            // get data
            switch (props.data.Type) {
                case "Table":
                    res = await QueryDataApi(props.data.QueryCommand)
                    result.data = res.data
                    break
                case "Pie Chart":
                    res = await QueryDataApi(props.data.QueryCommand)
                    keys = Object.keys(res.data[0])
                    if (keys.length < 2) return

                    // convert data to array
                    arrayData = {}
                    keys.map(key => arrayData[key] = [])

                    res.data.map(row => {
                        keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                    })

                    let pieData = {
                        labels: arrayData[keys[0]],
                        datasets: [
                            {
                                label: result.title,
                                data: arrayData[keys[1]],
                                backgroundColor: arrayData[keys[0]].map((_, index) => backgroundColors[index % backgroundColors.length]),
                                borderColor: arrayData[keys[0]].map((_, index) => borderColors[index % borderColors.length]),
                                borderWidth: 1,
                            }
                        ]
                    }
                    result.pieData = pieData
                    break
                case "Doughnut Chart":
                    res = await QueryDataApi(props.data.QueryCommand)
                    positionString = result.Position.split(";")
                    result.Position = {
                        x: positionString[0].substring(2),
                        y: positionString[1].substring(2)
                    }
                    TextThemeArray = result.TextTheme.split(";")
                    result.TextTheme = {}
                    TextThemeArray.map(style => result.TextTheme[style.split(':')[0]] = style.split(':')[1])

                    keys = Object.keys(res.data[0])
                    if (keys.length < 2) return

                    // convert data to array
                    arrayData = {}
                    keys.map(key => arrayData[key] = [])

                    res.data.map(row => {
                        keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                    })

                    let doughnutData = {
                        labels: arrayData[keys[0]],
                        datasets: [
                            {
                                label: result.title,
                                data: arrayData[keys[1]],
                                backgroundColor: arrayData[keys[0]].map((_, index) => backgroundColors[index % backgroundColors.length]),
                                borderColor: arrayData[keys[0]].map((_, index) => borderColors[index % borderColors.length]),
                                borderWidth: 1,
                            }
                        ]
                    }
                    result.doughnutData = doughnutData
                    break
                case "Line Chart":
                    res = await QueryDataApi(props.data.QueryCommand)
                    if (res.data.length == 0) return
                    keys = Object.keys(res.data[0])
                    if (keys.length == 0) return

                    // convert data to array
                    arrayData = {}
                    keys.map(key => arrayData[key] = [])

                    res.data.map(row => {
                        keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                    })

                    result.lineData = {
                        labels: arrayData[keys[0]],
                        datasets: keys.slice(1).map((key, index) => {
                            return {
                                label: key,
                                data: arrayData[key],
                                fill: true,
                                backgroundColor: backgroundColors[index % backgroundColors.length],
                                borderColor: borderColors[index % borderColors.length]
                            }
                        })
                    }
                    break;
                case "Bar Chart":
                    res = await QueryDataApi(props.data.QueryCommand)
                    if (res.data.length == 0) return
                    keys = Object.keys(res.data[0])
                    if (keys.length == 0) return
                    // convert data to array
                    arrayData = {}
                    keys.map(key => arrayData[key] = [])

                    res.data.map(row => {
                        keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                    })

                    result.barData = {
                        labels: arrayData[keys[0]],
                        datasets: keys.slice(1).map((key, index) => {
                            return {
                                label: key,
                                data: arrayData[key],
                                fill: true,
                                backgroundColor: backgroundColors[index % backgroundColors.length],
                                borderColor: borderColors[index % borderColors.length]
                            }
                        })
                    }

                    break;
                default:
                    break
            }

            // put to component data
            setComponentData(result)
        }
        catch (err) {
            // error shape
        }
    }

    useImperativeHandle(
        ref,
        () => ({
            SaveShape() {
                SaveShape()
            },
            getShapeInfo() {
                getShapeInfo()
            }
        }),
    )

    const SaveShape = () => {
        console.log("shape", componentData.Id, "is saving")
        if (currentProject != null) {
            let positionString = Object.keys(componentData.Position).map(key => `${key}:${componentData.Position[key]}`).join(';')
            let TextThemeString = Object.keys(componentData.TextTheme).map(key => `${key}:${componentData.TextTheme[key]}`).join(';')
            updateAComponent(currentProject, RId, {
                CId: componentData.Id,
                Title: componentData.Title,
                Type: componentData.Type,
                QueryCommand: componentData.QueryCommand,
                Height: parseInt(componentData.Height),
                Width: parseInt(componentData.Width),
                Position: positionString,
                TitleTheme: componentData.TitleTheme,
                TextTheme: TextThemeString,
                FrameTheme: componentData.FrameTheme
            }).then(res => {

            }).catch(err => {
                console.log(err)
            })
        }
    }

    const getShapeInfo = () => {
        return {
            Title: componentData.Title,
            Type: componentData.Type,
            QueryCommand: componentData.QueryCommand,
            Height: componentData.Height,
            Width:componentData.Width,
            Position: componentData.Position,
            TitleTheme: componentData.TitleTheme,
            TextTheme: componentData.TextTheme,
            FrameTheme: componentData.FrameTheme
        }
    }

    const callParentWhenClick = () => {
        props.onComponentHasClick(getShapeInfo())
    }

    useEffect(() => {
        getData()
    }, [])

    const RenderShape = () => {
        switch (componentData.Type) {
            case "Table":
                return (
                    <div style={{
                        fontSize: componentData.TextTheme.size,
                        fontFamily: componentData.TextTheme.font,
                        textAlign: "center"
                    }}
                    >
                        <TableComponent
                            data={componentData}
                            updateDataTable={setComponentData}
                        />
                    </div>
                )
            case "Doughnut Chart":
                <Rnd
                    size={{ width: componentData.Width, height: componentData.Height }}
                    position={{ x: componentData.Position.x, y: componentData.Position.y }}
                    onDragStop={(e, d) => {
                        setComponentData({
                            ...componentData, Position: {
                                x: d.x,
                                y: d.y
                            }
                        })
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        setComponentData({ ...componentData, Width: ref.style.width, Height: ref.style.height })
                    }}
                    className="border"
                >
                    {componentData.Title}
                    <Doughnut data={componentData.doughnutData} />
                </Rnd>
                break
            case "Line Chart":
                return (
                    <Rnd
                        size={{ width: componentData.Width, height: componentData.Height }}
                        position={{ x: componentData.Position.x, y: componentData.Position.y }}
                        onDragStop={(e, d) => {
                            setComponentData({
                                ...componentData, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            setComponentData({ ...componentData, Width: ref.style.width, Height: ref.style.height })
                        }}
                        onMouseDown={()=> {
                            callParentWhenClick()
                        }}
                        className="border border-5"
                    >
                        {componentData.Title}
                        <Line data={componentData.lineData} />
                    </Rnd>)
            case "Bar Chart":
                return (
                    <Rnd
                        size={{ width: componentData.Width, height: componentData.Height }}
                        position={{ x: componentData.Position.x, y: componentData.Position.y }}
                        onDragStop={(e, d) => {
                            setComponentData({
                                ...componentData, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })

                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            setComponentData({ ...componentData, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className="border"
                    >
                        {componentData.Title}
                        <Bar data={componentData.barData} />
                    </Rnd>
                )
            case "Pie Chart":
                return (
                    <Rnd
                        size={{ width: componentData.Width, height: componentData.Height }}
                        position={{ x: componentData.Position.x, y: componentData.Position.y }}
                        onDragStop={(e, d) => {
                            setComponentData({
                                ...componentData, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })

                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            setComponentData({ ...componentData, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className="border"
                    >
                        {componentData.Title}
                        <Pie data={componentData.pieData} />
                    </Rnd>)
            default:
                break
        }
    }

    return (
        <React.Fragment>
            {
                RenderShape()
            }
        </React.Fragment>
    )
})

export default Shape