import { useLocation, useNavigate } from 'react-router-dom'
import { content } from 'utils/notification'
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid'
import { useEffect, useState, useContext } from 'react'
import { Store } from 'react-notifications-component'
import { useDemoData } from "@mui/x-data-grid-generator";
import { getDataSourcesInformationByDId, showDataSourceContent } from "api/DataSources"
import { loadingContext } from 'App'
export default function ModelDetail() {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    const location = useLocation()
    var DId = 0;
    const nav = useNavigate()
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [datasource, setDatasource] = useState([])
    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });
    const setIsLoading = useContext(loadingContext)
    useEffect(() => {
        if (location.state) {
            DId = location.state.DId
        } else {
            nav("/machinelearning")
        }
        setIsLoading(true)
        getDataSourcesInformationByDId(DId)
            .then(res => {
                setDatasource(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        showDataSourceContent(DId)
            .then(res => {
                setIsLoading(false)
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
                setIsLoading(false)
                Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
    }, [])

    return (
        <div>
            <div className='row m-2 mt-4 mb-4'>
                <div class="col  mt-1 customFontBold PrimaryFontColor size40" >
                    Sample Model
                </div>
                <div className='col text-end'>
                    <button className='btn-lg btn-success text-center border-0' style={{ backgroundColor: "#3B97C6" }}
                        onClick={
                            () => {
                                console.log("conchonam")
                                nav("/machinelearning/testModel", {
                                    state: {
                                        rows: rows,
                                        columns: columns
                                    }
                                })
                            }
                        }
                    // onClick={() => {
                    //     nav("/machinelearning/modelDetail/" + props.info.Id, {
                    //         state: {
                    //             "DId": props.info.TestId
                    //         }
                    //     })
                    // }}
                    >
                        <div className='row p-2 text-center'>
                            <div className='col-9  text-center'>
                                <div className='col-2'>Apply</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Test data:
                </div>
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
                    // editMode="cell"
                    // onCellEditStop={handleRowEditStop}
                    />
                </div>
                <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Output:
                </div>

            </div>
        </div >
    )
}
