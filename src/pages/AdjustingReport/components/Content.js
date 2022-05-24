import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Rnd } from 'react-rnd';
import React from 'react';
import TableComponent from './table/TableComponent';
import ErrorShape from './ErrorShape/ErrorShape';
import { TextField } from '@mui/material';
import { Form } from 'react-bootstrap'
import warning from "resources/icons/warning.svg"
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


const Content = React.forwardRef((props, ref) => {
    const executeShape = (shape, index) => {
        if (shape.TypeParsed == "Error") {
            return (
                <Rnd
                    disableDragging={!props.isEdit}
                    enableResizing={props.isEdit}
                    size={{ width: shape.Width, height: shape.Height }}
                    position={{ x: shape.Position.x, y: shape.Position.y }}
                    onDragStop={(e, d) => {
                        props.updateShapeComponent(index, {
                            ...shape, Position: {
                                x: d.x,
                                y: d.y
                            }
                        })

                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                    }}
                    className={props.followingIndexComponent === index ? "customBorder" : ""}
                >
                    <ErrorShape />
                </Rnd>
            )
        }
        switch (shape.Type) {
            case "Table":
                if (shape.data == null) return null
                return (
                    <div>
                        <TableComponent
                            disableDragging={!props.isEdit}
                            enableResizing={props.isEdit}
                            data={shape}
                            updateDataTable={(data) => {
                                props.updateShapeComponent(index, data)
                            }}
                            classstyle={props.followingIndexComponent === index ? "customBorder" : ""}
                        />
                    </div>
                )
            case "Doughnut Chart":
                if (shape.doughnutData == null) return null
                return (
                    <Rnd
                        disableDragging={!props.isEdit}
                        enableResizing={props.isEdit}
                        size={{ width: shape.Width, height: shape.Height }}
                        position={{ x: shape.Position.x, y: shape.Position.y }}
                        onDragStop={(e, d) => {
                            props.updateShapeComponent(index, {
                                ...shape, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className={props.followingIndexComponent === index ? "customBorder" : ""}
                    >
                        <Form.Group controlId="duedate" className='mt-4'>
                            <Form.Control
                                type="text"
                                placeholder="Enter data source name"
                                value={shape.Title}
                                onChange={(e) => {
                                    props.updateShapeComponent(index, {
                                        ...shape, Title: (e.target.value)
                                    })
                                }}
                                style={{
                                    border: "0px"
                                }}
                            />
                        </Form.Group>
                        <Doughnut data={shape.doughnutData} />
                    </Rnd>)
            case "Line Chart":
                if (shape.lineData == null) return null
                return (
                    <Rnd
                        disableDragging={!props.isEdit}
                        enableResizing={props.isEdit}
                        size={{ width: shape.Width, height: shape.Height }}
                        position={{ x: shape.Position.x, y: shape.Position.y }}
                        onDragStop={(e, d) => {
                            props.updateShapeComponent(index, {
                                ...shape, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className={props.followingIndexComponent === index ? "customBorder" : ""}
                    >
                        <Form.Group controlId="duedate" className='mt-4'>
                            <Form.Control
                                type="text"
                                placeholder="Enter data source name"
                                value={shape.Title}
                                onChange={(e) => {
                                    props.updateShapeComponent(index, {
                                        ...shape, Title: (e.target.value)
                                    })
                                }}
                                style={{
                                    border: "0px"
                                }}
                            />
                        </Form.Group>
                        <Line data={shape.lineData} />
                    </Rnd>
                )
            case "Bar Chart":
                if (shape.barData == null) return null
                return (
                    <Rnd
                        disableDragging={!props.isEdit}
                        enableResizing={props.isEdit}
                        size={{ width: shape.Width, height: shape.Height }}
                        position={{ x: shape.Position.x, y: shape.Position.y }}
                        onDragStop={(e, d) => {
                            props.updateShapeComponent(index, {
                                ...shape, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })

                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className={props.followingIndexComponent === index ? "customBorder" : ""}
                    >
                        <Form.Group controlId="duedate" className='mt-4'>
                            <Form.Control
                                type="text"
                                placeholder="Enter data source name"
                                value={shape.Title}
                                onChange={(e) => {
                                    props.updateShapeComponent(index, {
                                        ...shape, Title: (e.target.value)
                                    })
                                }}
                                style={{
                                    border: "0px"
                                }}
                            />
                        </Form.Group>
                        <Bar data={shape.barData} />
                    </Rnd>
                )
            case "Pie Chart":
                if (shape.pieData == null) return null
                return (
                    <Rnd
                        disableDragging={!props.isEdit}
                        enableResizing={props.isEdit}
                        size={{ width: shape.Width, height: shape.Height }}
                        position={{ x: shape.Position.x, y: shape.Position.y }}
                        onDragStop={(e, d) => {
                            props.updateShapeComponent(index, {
                                ...shape, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })

                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className={props.followingIndexComponent === index ? "customBorder" : ""}
                    >
                        <Form.Group controlId="duedate" className='mt-4'>
                            <Form.Control
                                type="text"
                                placeholder="Enter data source name"
                                value={shape.Title}
                                onChange={(e) => {
                                    props.updateShapeComponent(index, {
                                        ...shape, Title: (e.target.value)
                                    })
                                }}
                                style={{
                                    border: "0px"
                                }}
                            />
                        </Form.Group>
                        <Pie data={shape.pieData} />
                    </Rnd>)
            case "Text":
                return (
                    <Rnd
                        disableDragging={!props.isEdit}
                        enableResizing={props.isEdit}
                        size={{ width: shape.Width, height: shape.Height }}
                        position={{ x: shape.Position.x, y: shape.Position.y }}
                        onDragStop={(e, d) => {
                            props.updateShapeComponent(index, {
                                ...shape, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })

                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className={props.followingIndexComponent === index ? "customBorder" : ""}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <input type="text" value={shape.QueryCommand}
                                onChange={(e) => {
                                    props.updateShapeComponent(index, { ...shape, QueryCommand: e.target.value })
                                }}
                                placeholder="Text"
                                style={{
                                    border: `1px solid ${shape.FrameTheme.color}`,
                                    width: "100%",
                                    height: "100%",
                                    textAlign: shape.TextTheme.alignment,
                                    color: shape.TextTheme.color,
                                    fontWeight: shape.TextTheme.decoration["font-weight"],
                                    fontStyle: shape.TextTheme.decoration["font-style"],
                                    textDecoration: shape.TextTheme.decoration["text-decoration"],
                                    fontSize: shape.TextTheme.size+"px",
                                }}
                            />
                        </div>
                    </Rnd>
                )
            case "Image":
                return (
                    <Rnd
                        disableDragging={!props.isEdit}
                        enableResizing={props.isEdit}
                        size={{ width: shape.Width, height: shape.Height }}
                        position={{ x: shape.Position.x, y: shape.Position.y }}
                        onDragStop={(e, d) => {
                            props.updateShapeComponent(index, {
                                ...shape, Position: {
                                    x: d.x,
                                    y: d.y
                                }
                            })
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            props.updateShapeComponent(index, { ...shape, Width: ref.style.width, Height: ref.style.height })
                        }}
                        className={props.followingIndexComponent === index ? "customBorder customimagecontainer" : " customimagecontainer"}
                        style={{
                            border: `1px solid ${shape.FrameTheme.color}`,
                        }}
                    >
                        <img
                            src={shape.QueryCommand} alt="loading"
                            onError={(e) => { e.target.onerror = null; e.target.src = warning }}
                            className="customimageshape"
                        />
                    </Rnd>
                )
            default:
                break

        }
    }

    return (
        <div ref={ref}>
            {
                props.shapeComponents.map((shape, index) =>
                    <div
                        key={index} onMouseDown={() => {
                            props.setFollowingIndexComponent(index)
                        }}

                    >
                        {
                            executeShape(shape, index)
                        }
                    </div>
                )
            }
            {/* {props.showingMouseDrag && <Rnd size={props.mouseDragValue.size} position={props.mouseDragValue.position} className="border" />} */}
        </div>

    )
})

export default Content
