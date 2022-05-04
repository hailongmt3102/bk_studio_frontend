import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid'
import { useDemoData } from "@mui/x-data-grid-generator";
import { getDataSourcesInformationByDId, showDataSourceContent, updateTableContentApi } from "api/DataSources"
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { content } from 'utils/notification'
import { Store } from 'react-notifications-component'

export default function DataSourceContent(props) {
    var location = useLocation()
    const [datasource, setDatasource] = useState([])
    var DId = location.state.Did
    const role = location.state.isEdit ?? false

    const [updateContent, setUpdateContent] = useState({})
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });

    useEffect(() => {
        getDataSourcesInformationByDId(DId)
            .then(res => {
                setDatasource(res.data)
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

    const handleRowEditStop = (params, event) => {
        let row = params.id
        let field = params.field
        let value = event.target.value
        if (value) {
            setUpdateContent({ ...updateContent, [row]: { ...updateContent[row], [field]: value } })
        }
        // event.defaultMuiPrevented = true;
    };

    const submit = () => {
        let sendInfo = {
            Table: datasource.Information,
            Data: updateContent
        }

        updateTableContentApi(DId, sendInfo)
            .then(res => {
                Store.addNotification(content("Success", res.data, "success"))
                // setTimeout(() => { window.location.reload() }, 1500)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }


    const EditUI = () => {

        return <div>
            <div className='row m-0 p-0'>
                <h2 class="col-8  mt-2" >
                    <div className='ms-4 customFontBold size40 PrimaryFontColor'>Edit data source:</div>
                </h2>
                {
                    role ? <div className='col-1 text-end'>
                        <button className='me-2 btn btn-success' onClick={() => { submit() }}>
                            Finish
                        </button>
                    </div> : null
                }
                <div className='col-3'></div>

            </div>
            <div className='bg-white row m-2'>
                <div className='col-9'>
                    {
                        <div style={{ height: 700, width: '100%' }}>
                            <DataGrid
                                loading={loading}
                                components={{
                                    Toolbar: CustomToolbar
                                }}
                                rows={rows}
                                columns={columns}
                                columnVisibilityModel={{
                                    id: false,
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                                editMode="cell"
                                onCellEditStop={handleRowEditStop}
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
