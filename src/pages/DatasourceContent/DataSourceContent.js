import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Table from '../ImportData/Components/Table'
import { getDataSourcesInformationByDId, showDataSourceContent } from "api/DataSources"
import { deep_blue_primary } from "../../utils/color"
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';

export default function DataSourceContent(props) {
    var location = useLocation()
    const [datasource, setDatasource] = useState([])
    var DId = location.state.Did
    const role = location.state.isEdit ?? false

    // const [dataFile, setDataFile] = useState([])

    const [updateContent, setUpdateContent] = useState({
        "1": {
            "username": "rog1",
            "first_name": "david"
        },
        "2": {
            "username": "mike1",
            "first_name": "roge",
            "last_name": "paul"
        }
    })

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        console.log(rows)
        console.log("colum", columns)
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

                const width = 150

                // TODO : parse type of content and set to Grid UI
                let columns = keys.map(key => {
                    if (key == "DataSource_Id")
                        return {
                            field: 'id',
                            headerName: key,
                            editable: role,
                            width: width
                        }
                    return {
                        field: key,
                        headerName: key,
                        editable: role,
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
    const handleRowEditCommit = React.useCallback(
        (params) => {
            const id = params.id;
            const key = params.field;
            const value = params.value;
            console.log("value", value)
        },
        []
    );

    const EditUI = () => {
        return <div>
            <div className='row'>
                <h2 class="ms-4 mt-2" style={{ color: deep_blue_primary, "fontWeight": "bold", fontSize: "40px" }}>
                    Edit data source:
                </h2>

                <div className='col'>
                    <button className='btn btn-success' onClick={() => { }}>
                        Finish
                    </button>
                </div>

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
                                experimentalFeatures={{ newEditingApi: true }}

                                // onCellEditStop={(params, event) => {
                                //     // if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                                //     //     event.defaultMuiPrevented = true;
                                //     // }
                                //     console.log("param", params)
                                //     console.log("event", event)
                                // }}
                                onCellEd
                                onCellEditCommit={() => handleRowEditCommit}
                            />
                        </div>
                    }
                    {/* <Table name={datasource.Information} data={dataFile} rows={rows} columns={columns} /> */}
                </div>
                <div className='col-3'>
                    <h4>Properties</h4>
                    {
                        columns.map((ele, index) =>
                            index !== 0 && <div>{ele.field}</div>)
                    }
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
    }
    return (

        <div>
            {
                EditUI()
            }
        </div>
    )
}
