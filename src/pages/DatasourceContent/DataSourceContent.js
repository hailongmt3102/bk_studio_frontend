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
    console.log("role nè", role)
    const [dataFile, setDataFile] = useState([])
    // const [rows, setRows] = useState([])
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
                setDataFile(res.data)

                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        { field: 'age', headerName: 'Age', type: 'number', editable: true },
        {
            field: 'dateCreated',
            headerName: 'Date Created',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'lastLogin',
            headerName: 'Last Login',
            type: 'dateTime',
            width: 220,
            editable: true,
        },
    ];

    const rows = [
        {
            id: 1,
            name: randomTraderName(),
            age: 25,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 2,
            name: randomTraderName(),
            age: 36,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 3,
            name: randomTraderName(),
            age: 19,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 4,
            name: randomTraderName(),
            age: 28,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
        {
            id: 5,
            name: randomTraderName(),
            age: 23,
            dateCreated: randomCreatedDate(),
            lastLogin: randomUpdatedDate(),
        },
    ];




    // useEffect(() => {
    //     setColumns({
    //         data: Object.keys(dataFile),
    //         active: new Array(Object.keys(dataFile).length).fill(true)
    //     })
    //     setRows(Array.from({ length: dataFile.length }, (_, i) => i))
    // }, [])

    // rows, columns of table 1
    // const [columns, setColumns] = useState({
    //     data: [],
    //     active: []
    // })
    // const [rows, setRows] = useState([])


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
                        {
                            role === "edit" ?
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} />
                                </div>
                                : null
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
