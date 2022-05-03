import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Rnd } from 'react-rnd';
import React from 'react';
import TableComponent from './table/TableComponent';
import ErrorShape from './ErrorShape/ErrorShape';
import { TextField } from '@mui/material';

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
                    className={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
                >
                    <ErrorShape />
                </Rnd>
            )
        }
        switch (shape.Type) {
            case "Table":
                if (shape.data == null) return null
                return (
                    <div style={{
                        fontSize: shape.TextTheme.size,
                        fontFamily: shape.TextTheme.font,
                        textAlign: "center"
                    }}
                    >
                        <TableComponent
                            disableDragging={!props.isEdit}
                            enableResizing={props.isEdit}
                            data={shape}
                            updateDataTable={(data) => {
                                props.updateShapeComponent(index, data)
                            }}
                            classstyle={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
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
                        className={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
                    >
                        {shape.Title}
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
                        className={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
                    >
                        {shape.Title}
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
                        className={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
                    >
                        {shape.Title}
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
                        className={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
                    >
                        {shape.Title}
                        <Pie data={shape.pieData} />
                    </Rnd>)
            case "Text":
                console.log(shape)
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
                        className={props.followingIndexComponent === index ? "border border-5 customBorder" : "border border-5"}
                    >
                        <h4>{shape.Title}</h4>
                        <TextField
                            variant="standard"
                            placeholder="text"
                            value={shape.QueryCommand}
                            onChange={(e) => {
                                props.updateShapeComponent(index, { ...shape, QueryCommand: e.target.value })
                            }}
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
                    <div key={index} onMouseDown={() => {
                        props.setFollowingIndexComponent(index)
                    }}>
                        {
                            executeShape(shape, index)
                        }
                    </div>
                )
            }
            {props.showingMouseDrag && <Rnd size={props.mouseDragValue.size} position={props.mouseDragValue.position} className="border" />}
        </div>

    )
})

export default Content
