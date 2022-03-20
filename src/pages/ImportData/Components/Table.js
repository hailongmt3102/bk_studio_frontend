import React from 'react'
import './table.css'

export default function Table(props) {
    return (
        <div className='mt-3'>
            <div className='row'>
                <div className='table-container col'>
                    <h4 className='m-auto'>{props.name}</h4>
                    <table class='custom-table'>
                        <thead>
                            <tr>
                                {
                                    props.columns.data.map((col, index) =>
                                        props.columns.active[index] ?
                                            <th>{col}</th>
                                            : null
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.rows.map((ele, index) => {
                                    return (
                                        <tr key={index}>
                                            {
                                                props.columns.data.map((col, index) =>
                                                    props.columns.active[index] ?
                                                        <td>{props.data[ele][col]}</td>
                                                        : null

                                                )
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )

}
