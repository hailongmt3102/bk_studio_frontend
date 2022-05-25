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
import { modifyModel } from "api/ML_API";

import { loadingContext } from 'App'
import Selection from "../component/Selection";
import { Form } from 'react-bootstrap';
import edit from "resources/icons/edit.svg"
import back from "resources/icons/back_round_deep_blue.svg";
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
    const [Api, setApi] = useState("")

    const nav = useNavigate()
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [rowsOut, setRowsOut] = useState([])
    const [columnsOut, setColumnsOut] = useState([])
    const [isEditInput, setIsEditInput] = useState(true)

    const selectDataSource = () => {
        nav("/datasources", {
            state: {
                ...location.state,
                isModel: true,
                isEditModel: true,
                isEditInput: isEditInput
            }
        })
    }

    const openFile = () => {
        // open file
        nav("/project/import", {
            state: {
                ...location.state,
                isModel: true,
                isEditModel: true,
                isEditInput: isEditInput
            }
        })
    }

    const [showDialog, setShowDialog] = useState(false)
    const handleClose = () => {
        setShowDialog(false)
    }

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
            setApi(location.state.Api)
            try {
                fetchInput()
                fetchOutput()
            } catch (error) {
            }

        } else {
            nav("/machinelearning")
            return
        }
    }, [])


    const ChangeInputHandle = () => {
        setShowDialog(true)
        setIsEditInput(true)
    }

    const ChangeOutHandle = () => {
        setShowDialog(true)
        setIsEditInput(false)
    }


    const saveModel = () => {
        const Id = location.state.MId
        const input = JSON.stringify(rows)
        const output = JSON.stringify(rowsOut)

        modifyModel(Id, {
            Name: MName,
            Api: Api,
            Input: input,
            output: output
        })
            .then(res => {
                Store.addNotification(content("Success", "Edited", "success"))
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
            })
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
            <div className='row  pe-2 ps-2 text-center'>
                <div className='col-9  text-center'>
                    <div className='col-2'>Change</div>
                </div>
            </div>
        </button>
    }


    return (
        <div>
            <Selection showDialog={showDialog} handleClose={handleClose} selectDataSource={selectDataSource} openFile={openFile} />

            <div className='row ms-2 me-4'>
                <div className="col-4 m-0 p-0 mt-1">
                    <div className='row'>
                        <div className='col-1 m-auto '>
                            <button type="button" class="btn btn-sm " onClick={() => { nav(-1) }}>
                                <img src={back} />
                            </button>
                        </div>
                        <div className='col-8'>
                            <Form.Control size="sm" type="text" value={MName} onChange={(e) => {
                                setMName(e.target.value)
                            }}
                                className="border-0 ms-2 "
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "40px",
                                    color: "#034078",
                                    background: "#F8F9FA"
                                }}
                            />
                        </div>
                        <div className='col-3 mt-3'>
                            <img src={edit} height="40px" width="40px" />
                        </div>

                    </div>
                </div>
                <div className='col-7 '>
                </div>
                <div className='col-1 mt-4'>
                    <button className='btn-lg btn-success text-center border-0'
                        onClick={() => {
                            saveModel()
                        }}
                    >
                        <div className='row   p-1 text-center'>
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

            <div className='bg-white p-2 mt-3'>
                <div className='row m-0 p-0'>
                    <div className='col-2 ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Api:
                    </div>
                    <div className=' m-0 p-0 col-5 mt-3 text-center'>
                        <Form.Control size="lg" type="text" placeholder='Enter api' value={Api} onChange={(e) => {
                            setApi(e.target.value)
                        }}
                            className="p-3 ms-2 "
                            style={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: "#034078",
                                background: "#F8F9FA"
                            }}
                        />
                    </div>
                    <div className='col-5'></div>
                </div>
                <div className='row'>
                    <div className='col-2 ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Test data:
                    </div>
                    <div className='col m-auto mt-3'>
                        {changeButton(ChangeInputHandle)}
                    </div>
                </div>


                <div className="mt-4 ms-3" style={{ height: 300 }}>
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
                <div className='mt-4 ms-3' style={{ height: 300 }}>
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
                <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Description:
                </div>
                <Form.Group className="mb-3 ms-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Control as="textarea" rows={6} style={{ "overflow": "auto", "resize": "none" }} value="" onChange={(event) => {
                        // setprojectInformation({ ...projectInformation, Description: event.target.value })
                    }} />
                </Form.Group>

            </div>
        </div >
    )
}
