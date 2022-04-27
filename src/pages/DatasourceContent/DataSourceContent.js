import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Table from '../ImportData/Components/Table'
import { getDataSourcesInformationByDId, showDataSourceContent } from "api/DataSources"
import { deep_blue_primary } from "../../utils/color"
import { DataGrid } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';

export default function DataSourceContent(props) {
    var location = useLocation()
    const [datasource, setDatasource] = useState([])

    const array = location.pathname.split("/");
    var DId = array[array.length - 2]
    const role = array[array.length - 1]
    const [dataFile, setDataFile] = useState([])


    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        console.log(rows)
        console.log(columns)
    }, [rows, columns])

    useEffect(() => {
        getDataSourcesInformationByDId(DId)
            .then(res => {
                setDatasource(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        showDataSourceContent(DId)
            .then(res => {
                // set rows and columns
                if (res.data.length == 0) return
                const keys = Object.keys(res.data[0])
                // parse keys to columns data
                const isEdit = props.isEdit
                const width = 150

                // TODO : parse type of content and set to Grid UI
                let columns = keys.map(key => {
                    if (key == "DataSource_Id")
                        return {
                            field: 'id',
                            headerName: key,
                            editable: isEdit,
                            width: width
                        }
                    return {
                        field: key,
                        headerName: key,
                        editable: isEdit,
                        width: width
                    }
                })

                setColumns(columns)
                // set row data
                let rows = res.data.map(row => {
                    row.id = row.DataSource_Id
                    delete row.DataSource_Id
                    return row
                })
                setRows(rows)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    // const columns = [
    //     { field: 'name', headerName: 'Name', width: 180, editable: true },
    //     { field: 'age', headerName: 'Age', type: 'number', editable: true },
    //     {
    //         field: 'dateCreated',
    //         headerName: 'Date Created',
    //         type: 'date',
    //         width: 180,
    //         editable: true,
    //     },
    //     {
    //         field: 'lastLogin',
    //         headerName: 'Last Login',
    //         type: 'dateTime',
    //         width: 220,
    //         editable: true,
    //     },
    // ];

    // const rows = [
    //     {
    //         id: 1,
    //         name: randomTraderName(),
    //         age: 25,
    //         dateCreated: randomCreatedDate(),
    //         lastLogin: randomUpdatedDate(),
    //     },
    //     {
    //         id: 2,
    //         name: randomTraderName(),
    //         age: 36,
    //         dateCreated: randomCreatedDate(),
    //         lastLogin: randomUpdatedDate(),
    //     },
    //     {
    //         id: 3,
    //         name: randomTraderName(),
    //         age: 19,
    //         dateCreated: randomCreatedDate(),
    //         lastLogin: randomUpdatedDate(),
    //     },
    //     {
    //         id: 4,
    //         name: randomTraderName(),
    //         age: 28,
    //         dateCreated: randomCreatedDate(),
    //         lastLogin: randomUpdatedDate(),
    //     },
    //     {
    //         id: 5,
    //         name: randomTraderName(),
    //         age: 23,
    //         dateCreated: randomCreatedDate(),
    //         lastLogin: randomUpdatedDate(),
    //     },
    // ];

    return (
        <div>
            <div>
                <div className='row'>
                    <h2 class="ms-4 mt-2" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>
                        Edit data source:
                    </h2>

                    {/* <div className='col'>
                        <button className='btn btn-success' onClick={() => {props.submit(props.fileInformation.name, columns)}}>
                            Finish
                        </button>
                    </div> */}

                </div>
                <div className='bg-white row m-2'>
                    <div className='col-9'>
                        {
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid rows={rows} columns={columns}
                                    columnVisibilityModel={{
                                        // Hide columns status and traderName, the other columns will remain visible
                                        id: false,
                                    }}
                                />
                            </div>
                        }
                        {/* <Table name={datasource.Information} data={dataFile} rows={rows} columns={columns} /> */}
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
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" 
                                                checked={columns.active[index]} 
                                                onClick={() => {editColumns(index)}}/>
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
