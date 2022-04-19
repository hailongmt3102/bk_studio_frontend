import { QueryData as QueryDataApi } from 'api/DataSources';
import { updateAComponent } from 'api/Report';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Rnd } from 'react-rnd';
import { useLocation } from "react-router-dom";
import TableComponent from './table/TableComponent';


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
            result.Position = JSON.parse(result.Position)
            // parse theme from server
            result.TextTheme = JSON.parse(result.TextTheme)
            result.FrameTheme = JSON.parse(result.FrameTheme)

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
            setComponentData({})
            // error shape
        }
    }

    useEffect(() => {
        getData()
    }, [props.data])

    useImperativeHandle(
        ref,
        () => ({
            SaveShape() {
                SaveShape()
            },
            getShapeInfo() {
                return getShapeInfo()
            }
        }),
    )

    const SaveShape = async () => {
        console.log("shape", componentData.Id, "is saving")
        if (currentProject != null) {
            try {
                await updateAComponent(currentProject, RId, {
                    CId: componentData.Id,
                    Title: componentData.Title,
                    Type: componentData.Type,
                    QueryCommand: componentData.QueryCommand,
                    Height: parseInt(componentData.Height),
                    Width: parseInt(componentData.Width),
                    Position: JSON.stringify(componentData.Position),
                    TitleTheme: componentData.TitleTheme,
                    TextTheme: JSON.stringify(componentData.TextTheme),
                    FrameTheme: JSON.stringify(componentData.FrameTheme)
                })
            }
            catch (err) {
            }
        }
    }

    const getShapeInfo = () => {
        return JSON.stringify({
            Title: componentData.Title,
            Type: componentData.Type,
            QueryCommand: componentData.QueryCommand,
            Height: componentData.Height,
            Width: componentData.Width,
            Position: componentData.Position,
            TitleTheme: componentData.TitleTheme,
            TextTheme: componentData.TextTheme,
            FrameTheme: componentData.FrameTheme
        })
    }

    const callParentWhenClick = () => {
        props.onComponentHasClick(getShapeInfo())
    }

    useEffect(() => {
        getData()
        console.log("shpe", props.data.Type)
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
                            classstyle={props.focus ? "border border-5 customBorder" : "border border-5"}
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
                    className={props.focus ? "border border-5 customBorder" : "border border-5"}
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
                        onMouseDown={() => {
                            callParentWhenClick()
                        }}
                        className={props.focus ? "border border-5 customBorder" : "border border-5"}
                    >
                        {componentData.Title}
                        <Line data={componentData.lineData} />
                    </Rnd>
                )
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
                        className={props.focus ? "border border-5 customBorder" : "border border-5"}
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
                        className={props.focus ? "border border-5 customBorder" : "border border-5"}
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