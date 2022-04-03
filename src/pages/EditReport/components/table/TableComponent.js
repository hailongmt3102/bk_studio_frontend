import React from 'react'
import { Rnd } from 'react-rnd'
import './TableComponent.css'

export default function TableComponent(props) {
    return (
        <Rnd
            size={{ width: props.data.Width, height: props.data.Height }}
            position={{ x: props.data.Position.x, y: props.data.Position.y }}
            onDragStop={(e, d) => {
                props.updateDataTable({
                    ...props.data, Position: {
                        x: d.x,
                        y: d.y
                    }
                })
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                props.updateDataTable({ ...props.data, Width: ref.style.width, Height: ref.style.height })
            }}
            className="border component-container"
        >
            {
                props.data.data !== undefined ?
                    <div>
                        <h4 className='ms-2'>{props.data.Title}</h4>
                        <table class='component-table'>
                            <thead>
                                <tr>
                                    {
                                        Object.keys(props.data.data[0]).map(ele => <th>{ele}</th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.data.data.map((ele, index) =>
                                        <tr key={index}>
                                            {
                                                Object.values(ele).map((value, i) =>
                                                        <td>{value}</td>
                                                )
                                            }
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    : null
            }
        </Rnd>
    )
}
