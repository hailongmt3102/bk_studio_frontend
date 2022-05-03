import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Table from '../ImportData/Components/Table'
import { getDataSourcesInformationByDId, showDataSourceContent } from "api/DataSources"
import { deep_blue_primary } from "../../utils/color"
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid-pro';
import { DataGridPro } from '@mui/x-data-grid-pro';
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


    //KT inclue updateContent
    // Object.keys(updateContent).includes(id)
    //if k inclue => push() : 
    // setUpdateContent({
    //         ...updateContent, {
    //         [id]: {
    //             [field]: value
    //         }
    //     }
    // })
    //else include rồi => setUpdateContent({
    //         ...updateContent, 
    //         [id]: {...updateContent[id], 
    //             [field]: value
    //         }
    //     
    // })

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
    // const handleRowEditStart = (params, event) => {
    //     console.log("Chạy start")
    //     event.defaultMuiPrevented = true;
    // };

    const handleRowEditStop = (params, event) => {
        console.log("Hàng ", params.id);
        console.log("Field  ", params.field);
        console.log("Value ", event.target.value);
        event.defaultMuiPrevented = true;
    };


    const EditUI = () => {
        return <div>
            <div className='row m-0 p-0'>
                <h2 class="col-8  mt-2" >
                    <div className='ms-4 customFontBold size40 PrimaryFontColor'>Edit data source:</div>
                </h2>

                <div className='col-1 text-end'>
                    <button className='me-2 btn btn-success' onClick={() => { }}>
                        Finish
                    </button>
                </div>
                <div className='col-3'></div>

            </div>
            <div className='bg-white row m-2'>
                <div className='col-9'>
                    {
                        <div style={{ height: 700, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns}
                                columnVisibilityModel={{
                                    // Hide columns status and traderName, the other columns will remain visible
                                    id: false,
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                                editMode="row"

                                onRowEditStop={handleRowEditStop}

                            // onCellEditStop={(params, event) => {
                            //     if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                            //         event.defaultMuiPrevented = true;
                            //         console.log("param", params)
                            //         console.log("event", event.target)
                            //     }

                            // }}

                            />
                        </div>
                    }
                    {/* <Table name={datasource.Information} data={dataFile} rows={rows} columns={columns} /> */}
                </div>
                <div className='col-3'>
                    <div className='mt-4 ms-4 mb-4 customFontBold size32 PrimaryFontColor'>Properties</div>
                    {
                        columns.map((ele, index) =>
                            index !== 0 && <div className='mt-3 ms-4  size18 '>{ele.field}</div>)
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
