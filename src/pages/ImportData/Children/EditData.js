import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import edit from "resources/icons/edit.svg"
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid';
import { useDemoData } from "@mui/x-data-grid-generator";



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
                    <div className='col mt-3  text-end'>
                        <button className='btn btn-success me-3 p-2' onClick={() => { props.submit(props.fileInformation.name, columnProperties) }}>
                            <div className='size22 m-1 ms-2 me-2'>Finish</div>
                        </button>
                    </div>
                    <div className='col-3'>

                    </div>

                </div>
                <div className='bg-white row m-2'>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-3'>
                                <Form.Control size="sm" type="text" value={props.fileInformation.name} onChange={(e) => {
                                    props.setFileInformation({ ...props.fileInformation, name: e.target.value.replace(/[\s\.]/g, "_") })
                                }}
                                    className="border-0 "
                                    style={{
                                        fontSize: "28px",
                                        color: "#0089ED"
                                    }}
                                />
                            </div>
                            <div className='col-9 mt-2'>
                                <img src={edit} height="25px" width="25px" />
                            </div>
                        </div>
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
                        <div className='mt-4 ps-3  mb-4 customFontBold size32 PrimaryFontColor'>Properties</div>
                        {/* <div className='SecondFontColor size30'>{props.fileInformation.name}</div> */}
                        <ul className="list-group bd-none ps-3">
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
