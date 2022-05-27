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
import { modifyModel, canModifyModel } from "api/ML_API"
import { Form } from 'react-bootstrap';
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
    const [MName, setMName] = useState("")
    const [MDescription, setMDescription] = useState("")

    const nav = useNavigate()
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    const [rowsOut, setRowsOut] = useState([])
    const [columnsOut, setColumnsOut] = useState([])
    const [MId, setMId] = useState(-1)

    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });
    const setIsLoading = useContext(loadingContext)
    const parseInputModel = () => {
        let jsonData = JSON.parse(location.state.input)
        console.log(JSON.parse(location.state.input))

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
    const parseOutputModel = () => {
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

    const switchToEditMode = async () => {
        setIsLoading(true)

        try {
            await canModifyModel(MId)
            nav("/machinelearning/modelDetail/" + MId + "/edit", {
                state: {
                    MId: MId,
                    input: location.state.input,
                    output: location.state.output,
                    MName: MName,
                    Api: location.state.Api,
                    MDescription : MDescription
                }
            })
        } catch (error) {
            Store.addNotification(content("Warning", error.response.data, "danger"))

        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (location.state) {
            setMName(location.state.MName)
            setMId(location.state.MId)
            setMDescription(location.state.MDescription ? location.state.MDescription : "")
            try {
                parseInputModel()
                parseOutputModel()
            } catch (error) {
            }

        } else {
            nav("/machinelearning")
            return
        }
    }, [])


    const editButton = () => {
        return <button className='btn-lg btn-success text-center border-0'
            style={{ background: "#3B97C6" }}
            onClick={
                () => {
                    switchToEditMode()
                }
            }
        >
            <div className='row  p-1 pe-2 ps-2 text-center'>
                <div className='col-9  text-center'>
                    <div className='col-2'>Edit</div>
                </div>
            </div>
        </button>
    }

    return (
        <div>
            <div className='row m-2 mt-4 mb-4'>
                <div class="col  mt-1 customFontBold PrimaryFontColor size40" >
                    {MName}
                </div>
                <div className='col m-0 p-0 text-end'>
                    {
                        editButton()
                    }
                </div>
                <div className='col-1 '>
                    <button className='btn-lg btn-success text-center border-0'
                        onClick={
                            () => {
                                nav("/machinelearning/testModel", {
                                    state: {
                                        rows: rows,
                                        columns: columns,
                                        MName: MName,
                                        Api: location.state.Api
                                    }
                                })
                            }
                        }
                    >
                        <div className='row  p-1 text-center'>
                            <div className='col-9  text-center'>
                                <div className='col-2'>Apply</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                Description:
            </div>
            <Form.Group className="mb-3 ms-3" controlId="exampleForm.ControlTextarea1" >
                <Form.Control as="textarea" rows={6} style={{ "overflow": "auto", "resize": "none" }} value={MDescription} onChange={(event) => {
                    // setprojectInformation({ ...projectInformation, Description: event.target.value })
                }} />
            </Form.Group>
            <div className='bg-white p-3'>
                <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Test data:
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
                <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Output:
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
