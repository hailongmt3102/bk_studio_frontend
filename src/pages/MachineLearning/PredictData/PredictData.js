import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid';
import { useDemoData } from "@mui/x-data-grid-generator";
import { bayesModelAPI, fetchAPI } from "api/ML_API";
import { useContext, useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import { useLocation, useNavigate } from 'react-router-dom';
import { content } from 'utils/notification';
import { loadingContext } from 'App'
import back from "resources/icons/back_round_deep_blue.svg";
import DNameInputPopUp from "./component/DNameInputPopUp"
import { ImportDataApi } from 'api/DataSources'

export default function PredictData() {
    const setIsLoading = useContext(loadingContext)
    const nav = useNavigate()
    const location = useLocation()
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [MName, setMName] = useState("")
    // const { loading } = useDemoData({
    //     // dataSet: 'Commodity',
    //     rowLength: 4,
    //     maxColumns: 6
    // });

    useEffect(() => {
        if (location.state) {
            setColumns(location.state.columns)
            setRows(location.state.rows)
            setMName(location.state.MName)
        } else {
            nav("/machinelearning")
        }
    }, [])

    const [OutputRows, setOutputRows] = useState([])
    const [OutputColumns, setOutputColumns] = useState([])

    const predictHandle = () => {
        setIsLoading(true)
        fetchAPI(rows.map(ele => {
            delete ele.id
            return ele
        }), location.state.Api)
            .then(response => {
                var rowData = JSON.parse(response)
                console.log(JSON.stringify(rowData))

                if (rowData.length == 0) return
                const keys = Object.keys(rowData[0])
                let Rows = rowData.map((row, index) => {
                    return { ...row, id: index }
                })
                setOutputRows(Rows)
                let Columns = keys.map((key) => {
                    return {
                        field: key,
                        headerName: key,
                        editable: false,
                    }
                })
                setOutputColumns(Columns)
                // setlistCompany(response.data)
                setIsLoading(false)
            })
            .catch(
                err => {
                    setIsLoading(false)
                    Store.addNotification(content("Fail", "Predict fail, please check this model carefully", "danger"))
                    return
                }
            )
    }
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const saveNewData = (name) => {
        let currentProjectId = localStorage.getItem("currentProject")
        if (currentProjectId != null) {
            // send it to server
            ImportDataApi(name, OutputRows, currentProjectId)
                .then(res => {
                    setShowNewUserModel(false)
                    Store.addNotification(content("Success", "Imported data", "success"), {
                        duration: 5000
                    })


                })
                .catch(err => {
                    setShowNewUserModel(false)
                    Store.addNotification(content("Fail", err.response.data, "danger"), {
                        duration: 10000
                    })
                })
        }
    }

    const [shownewUserModel, setShowNewUserModel] = useState(false)

    return (
        <div>
            <DNameInputPopUp
                show={shownewUserModel}
                handleClose={() => {
                    setShowNewUserModel(false)
                }}
                onComplete={saveNewData}
            />
            <div className='row m-2 mt-4 mb-4'>
                <div className="row ms-2 m-0 p-0" >
                    <div className="col-5">
                        <div className="row">
                            <div className="col-1 m-0 p-0 mt-1">
                                <button type="button" class="btn btn-sm" onClick={() => { nav(-1) }}>
                                    <img src={back} />
                                </button>
                            </div>
                            <div className="col-10 m-0 p-0" >
                                <div className="ms-1 PrimaryFontColor customFontBold size32">{MName}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col text-end'>
                        <button className='btn-lg btn-success text-center border-0 me-4'
                            onClick={() => {
                                predictHandle()
                                // nav("/machinelearning/testModel") 
                            }}
                        >
                            <div className='row p-1 text-center'>
                                <div className='col-9  text-center'>
                                    <div className='col-2'>Predict</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            <div className='bg-white p-3'>
                <div className=' ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Test data:

                </div>
                <div className=' ms-4 me-4' style={{ height: 400 }}>
                    <DataGrid
                        // loading={loading}
                        rows={rows}
                        columns={columns}
                        columnVisibilityModel={{
                            id: false,
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                        editMode="cell"
                    />
                </div>
                <div className='row mt-3 m-0 p-0'>
                    <div className='col ms-4  mt-1 customFontBold SecondFontColor size40'>
                        Output:
                    </div>
                    <div className='col text-end'>
                        <button className='btn-lg btn-info text-center border-0 me-4'
                            onClick={() => {
                                setShowNewUserModel(true)
                            }}
                        >
                            <div className='row p-1 text-center'>
                                <div className=''>Save as Data source</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className=' ms-4 me-4' style={{ height: 400 }}>
                    <DataGrid
                        // loading={loading}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        rows={OutputRows}
                        columns={OutputColumns}
                        columnVisibilityModel={{
                            id: false,
                        }}
                    // experimentalFeatures={{ newEditingApi: true }}
                    // editMode="cell"
                    // onCellEditStop={handleRowEditStop}
                    />
                </div>

            </div>
        </div >
    )
}
