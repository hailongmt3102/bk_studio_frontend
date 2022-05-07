import {
    DataGrid
} from '@mui/x-data-grid';
import { useDemoData } from "@mui/x-data-grid-generator";
import { getDataSourcesInformationByDId, showDataSourceContent } from "api/DataSources";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import Table from '../Components/Table'

export default function ReviewTestData(props) {
    const location = useLocation()
    const nav = useNavigate()
    const Id = location.state ? location.state.Did : -1

    const [datasource, setDatasource] = useState([])
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])

    useEffect(() => {
        if (Id == -1) {
            nav("/machinelearning")
            return
        }

        getDataSourcesInformationByDId(Id)
            .then(res => {
                setDatasource(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        showDataSourceContent(Id)
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
                            editable: false,
                            width: width
                        }
                    return {
                        field: key,
                        headerName: key,
                        editable: false,
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




    const editColumns = (index) => {
        setColumns({
            ...columns, active: columns.active.map((element, i) => {
                if (i === index) return !element
                else return element
            })
        })
    }

    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });

    return (
        <div>
            <div>
                <div className='row'>
                    <h2 className='m-3 col PrimaryFontColor size40 customFontBold '>
                        Review data source
                    </h2>
                    <div className='col'>
                        <button className='btn btn-success' onClick={() => { 
                            nav("/machinelearning/predict",  {
                                state: {
                                    rows: rows,
                                    columns: columns
                                }
                            })
                        }}>
                            Finish
                        </button>
                    </div>

                </div>
                <div className='bg-white row m-2'>
                    <div className='col-9'>
                        <div style={{ height: 700, width: '100%' }}>
                            {/* <Table name={props.fileInformation.name} data={props.dataFile} rows={rows} columns={columns} /> */}
                            <DataGrid
                                loading={loading}
                                rows={rows}
                                columns={columns}
                                columnVisibilityModel={{
                                    id: false,
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                                editMode="cell"
                            />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='mt-4 mb-4 customFontBold size32 PrimaryFontColor'>Properties</div>
                        <ul className="list-group bd-none">

                            {

                                // Object.keys(props.dataFile[0]).map((field, index) => {
                                //     return (
                                //         <li key={index} class="list-group-item border-0 row">
                                //             <div class="form-check form-switch">
                                //                 <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={() => { }} checked={columns.active[index]} onClick={() => { editColumns(index) }} />
                                //                 <label class="form-check-label" for="flexSwitchCheckChecked">{field}</label>
                                //             </div>
                                //         </li>
                                //     )
                                // })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
