import { useLocation, useNavigate } from 'react-router-dom'
import { content } from 'utils/notification'
import save_white from "resources/icons/save_white.svg";
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid'
import { useEffect, useState, useContext } from 'react'
import { Store } from 'react-notifications-component'
import { useDemoData } from "@mui/x-data-grid-generator";
import { getDataSourcesInformationByDId, showDataSourceContent } from "api/DataSources"
import { loadingContext } from 'App'
import Selection from "../component/Selection";
export default function EditModel() {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    const location = useLocation()

    const [MName, setMName] = useState("")
    const nav = useNavigate()
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [rowsOut, setRowsOut] = useState([])
    const [columnsOut, setColumnsOut] = useState([])

    const selectDataSource = () => {
        // navigate to datasource page
        // nav("/datasources", {
        //     state: {
        //         isModel: true,
        //     }
        // })
    }

    const openFile = () => {
        // open file
        // nav("/project/import", {
        //     state: {
        //         isModel: true,
        //     }
        // })
    }

    const [showDialog, setShowDialog] = useState(false)
    const handleClose = () => {
        setShowDialog(false)
    }

    console.log(location.state)
    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });
    const setIsLoading = useContext(loadingContext)
    const fetchInput = () => {
        let jsonData = JSON.parse(location.state.input)
        // console.log(JSON.parse(location.state.input))

        if (jsonData.length == 0) return
        const keys = Object.keys(jsonData[0])
        // parse keys to columns data
        const width = 150
        // TODO : parse type of content and set to Grid UI
        let columns = keys.map(key => {
            return {
                field: key,
                headerName: key,
                editable: false,
                width: width
            }
        })
        setColumns(columns)
        let rows = jsonData.map((row, index) => {
            return { ...row, id: index }
        })
        setRows(rows)

    }
    const fetchOutput = () => {
        let jsonData = JSON.parse(location.state.output)
        console.log(JSON.parse(location.state.output))

        if (jsonData.length == 0) return
        const keys = Object.keys(jsonData[0])
        // parse keys to columns data
        const width = 150
        // TODO : parse type of content and set to Grid UI
        let columns = keys.map(key => {
            return {
                field: key,
                headerName: key,
                editable: false,
                width: width
            }
        })
        setColumnsOut(columns)
        let rows = jsonData.map((row, index) => {
            return { ...row, id: index }
        })
        setRowsOut(rows)

    }
    useEffect(() => {
        if (location.state) {
            setMName(location.state.MName)
            fetchInput()
            fetchOutput()
        } else {
            nav("/machinelearning")
            return
        }
    }, [])


    const ChangeInputHandle = () => {
        setShowDialog(true)
    }

    const ChangeOutHandle = () => {
        setShowDialog(true)
    }


    const changeButton = (f) => {
        return <button className='btn-lg btn-success text-center border-0'
            style={{ background: "#3B97C6" }}
            onClick={
                () => {
                    f()
                }
            }
        >
            <div className='row  p-1 pe-2 ps-2 text-center'>
                <div className='col-9  text-center'>
                    <div className='col-2'>Change</div>
                </div>
            </div>
        </button>
    }


    return (
        <div>
            <Selection showDialog={showDialog} handleClose={handleClose} selectDataSource={selectDataSource} openFile={openFile} />
            <div className='row m-2 mt-4 mb-4'>
                <div class="col  mt-1 customFontBold PrimaryFontColor size40" >
                    {MName}
                </div>

                <div className='col-1 '>
                    <button className='btn-lg btn-success text-center border-0'
                    // 
                    >
                        <div className='row  p-1 text-center'>
                            <div className='col-2 text-center me-1'>
                                <img src={save_white} width="20px" height="20px" />
                            </div>
                            <div className='col-9  text-center'>
                                <div className='col-2 ms-2'>Save</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className='row'>
                    <div className='col-2 ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Test data:
                    </div>
                    <div className='col'>
                        {changeButton(ChangeInputHandle)}
                    </div>
                </div>
                <div style={{ height: 300, width: '100%' }}>
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
                <div className='row mt-3'>
                    <div className='col-2 ms-4  customFontBold SecondFontColor size40'>
                        Output:
                    </div>
                    <div className='col'>
                        {changeButton(ChangeOutHandle)}
                    </div>
                </div>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        loading={loading}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        rows={rowsOut}
                        columns={columnsOut}
                        columnVisibilityModel={{
                            id: false,
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                    // editMode="cell"
                    // onCellEditStop={handleRowEditStop}
                    />
                </div>

            </div>
        </div >
    )
}
