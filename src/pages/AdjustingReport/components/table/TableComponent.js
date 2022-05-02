import React, {useEffect, useState} from 'react'
import { Rnd } from 'react-rnd'
import './TableComponent.css'

const selectReg = /select.*(?= from)/
export default function TableComponent(props) {
    const [columns, setColumns] = useState([])
    useEffect(() => {
        let selectArray = (selectReg.exec(props.data.QueryCommand) ?? [""])[0].replace("select ", "").split(",").map(ele => ele.trim())
        setColumns(selectArray)
    }, [props.data.data])
    
    return (
        <Rnd
            disableDragging={props.disableDragging}
            enableResizing={props.enableResizing}
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
            className={`${props.classstyle} component-container`}
        >
            {
                props.data.data !== undefined && props.data.data.length == 0 &&
                <div>
                    <h4 className='ms-2'>{props.data.Title}</h4>
                    <table class='component-table'>
                        <thead>
                            <tr>
                                {
                                    columns.map(ele => <th>{ele}</th>)
                                }
                            </tr>
                        </thead>
                    </table>
                </div>
            }
            {
                props.data.data !== undefined && props.data.data.length > 0 ?
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
