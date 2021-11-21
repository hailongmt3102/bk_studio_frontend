import React from 'react'

export default function Table(props) {
    return (
        <div className='mt-3'>
            <h4 className='m-auto'>{props.name}</h4>
            <table class="table table-info table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {
                            props.columns.data.map((col, index) => {
                                return (
                                    props.columns.active[index] ?
                                        <th scope='col'>{col}</th>
                                        : null
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map((ele, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    {
                                        props.columns.data.map((col, index) => {
                                            return (
                                                props.columns.active[index] ?
                                                    <td>{props.data[ele][col]}</td>
                                                    : null
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
