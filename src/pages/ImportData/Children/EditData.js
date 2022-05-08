import { useEffect, useState } from 'react';

import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid';
import { useDemoData } from "@mui/x-data-grid-generator";
import { TextField } from '@mui/material';

export default function EditData(props) {
    useEffect(() => {
        setColumnProperties({
            data: Object.keys(props.dataFile[0]),
            active: new Array(Object.keys(props.dataFile[0]).length).fill(true)
        })

        if (props.dataFile.length == 0) return

        const keys = Object.keys(props.dataFile[0])

        let columns = keys.map(key => {
            if (key != "")
                return {
                    field: key,
                    headerName: key,
                    editable: false,
                }
        })
        setColumns(columns)
        // set row data
        let rows = props.dataFile.map((row, index) => {
            return { ...row, id: index }
        })
        setRows(rows)

    }, [props.dataFile])

    // rows, columns of table 1
    const [columnProperties, setColumnProperties] = useState({
        data: [],
        active: []
    })
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])


    const editColumns = (index) => {
        setColumnProperties({
            ...columnProperties, active: columnProperties.active.map((element, i) => {
                if (i === index) return !element
                else return element
            })
        })
    }

    const { loading } = useDemoData({
        rowLength: 4,
        maxColumns: 6
    });


    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    return (
        <div>
            <div>
                <div className='row'>
                    <h2 className='m-3 col PrimaryFontColor size40 customFontBold '>
                        Review data source
                    </h2>
                    <div className='col'>
                        <button className='btn btn-success' onClick={() => { props.submit(props.fileInformation.name, columnProperties) }}>
                            Finish
                        </button>
                    </div>

                </div>
                <div className='bg-white row m-2'>
                    <div className='col-9'>
                        <TextField
                            id="standard-textarea"
                            variant="standard"
                            value={props.fileInformation.name}
                            onChange={(e) => {
                                props.setFileInformation({ ...props.fileInformation, name: e.target.value.replace(/[\s\.]/g, "_") })
                            }}
                        />
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
                        />
                    </div>
                    <div className='col-3'>
                        <div className='mt-4 mb-4 customFontBold size32 PrimaryFontColor'>Properties</div>
                        <h6>{props.fileInformation.name}</h6>
                        <ul className="list-group bd-none">
                            {
                                Object.keys(props.dataFile[0]).map((field, index) => {
                                    return (
                                        <li key={index} class="list-group-item border-0 row">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                                                    onChange={() => { }}
                                                    checked={columnProperties.active[index]}
                                                    onClick={() => { editColumns(index) }}
                                                />
                                                <label class="form-check-label" for="flexSwitchCheckChecked">{field}</label>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
