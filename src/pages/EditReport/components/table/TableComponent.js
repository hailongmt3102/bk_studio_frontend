import React from 'react'
import { Rnd } from 'react-rnd'
import './TableComponent.css'

export default function TableComponent(props) {
    return (
        <Rnd
            size={{ width: props.data.Width, height: props.data.Width }}
            position={{ x: props.data.Position.x, y: props.data.Position.y }}
            onDragStop={(e, d) => {
                // this.setState({ x: d.x, y: d.y })
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
            className="border"
        >
            <div className='component-container' style={{ width: props.data.Width - 20, height: props.data.Height - 20 }}>
                {
                    props.data.data != undefined ?
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
                                    props.data.data.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                {
                                                    Object.values(ele).map(value =>
                                                        <td>{value}</td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : null
                }
            </div>
        </Rnd>
    )
}
