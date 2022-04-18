import React, { useState, useEffect } from 'react'
// import Table from '../Components/Table'
import {deep_blue_primary} from "../../utils/color"
export default function DataSourceContent(props) {
    useEffect(() => {
        // setColumns({
        //     data: Object.keys(props.dataFile[0]),
        //     active: new Array(Object.keys(props.dataFile[0]).length).fill(true)
        // })
        // setRows(Array.from({ length: props.dataFile.length }, (_, i) => i))
    }, [])

    // rows, columns of table 1
    const [columns, setColumns] = useState({
        data: [],
        active: []
    })
    const [rows, setRows] = useState([])


    // const editColumns = (index) => {
    //     setColumns({...columns, active: columns.active.map((element, i) => {
    //         if (i === index) return !element
    //         else return element
    //     })})
    // }

    return (
        <div>
            <div>
                <div className='row'>
                    <h2 class="ms-4 mt-2" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                        Review data source:
                    </h2>

                    {/* <div className='col'>
                        <button className='btn btn-success' onClick={() => {props.submit(props.fileInformation.name, columns)}}>
                            Finish
                        </button>
                    </div> */}

                </div>
                <div className='bg-white row m-2'>
                    <div className='col-9'>
                        {/* <Table name={props.fileInformation.name} data={props.dataFile} rows={rows} columns={columns} /> */}
                    </div>
                    <div className='col-3'>
                        <h4>Properties</h4>
                        {/* <h6>{props.fileInformation.name}</h6> */}
                        {/* <ul className="list-group bd-none">
                            {
                                Object.keys(props.dataFile[0]).map((field, index) => {
                                    return (
                                        <li key={index} class="list-group-item border-0 row">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={columns.active[index]} onClick={() => {editColumns(index)}}/>
                                                <label class="form-check-label" for="flexSwitchCheckChecked">{field}</label>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
