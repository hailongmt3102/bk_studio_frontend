import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid'
import { useDemoData } from "@mui/x-data-grid-generator";
import back from "resources/icons/back_round_deep_blue.svg";
import Selection from "../component/Selection";
export default function TestModel() {
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });
    const location = useLocation()
    const nav = useNavigate()
    const [showDialog, setShowDialog] = useState(false)
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [MName, setMName] = useState("")
    useEffect(() => {
        if (location.state) {
            setRows(location.state.rows)
            console.log(location.state.rows)
            setColumns(location.state.columns)
            console.log(location.state.columns)
            setMName(location.state.MName)
        } else {
            nav("/machinelearning")
        }
    }, [])
    const handleOpen = () => {
        setShowDialog(true)
    }

    const handleClose = () => {
        setShowDialog(false)
    }

    const selectDataSource = () => {
        // navigate to datasource page
        nav("/datasources", {
            state: {
                isModel: true,
            }
        })
    }

    const openFile = () => {
        // open file
        nav("/project/import", {
            state: {
                isModel: true,
            }
        })
    }


    return (


        <div>
            <Selection showDialog={showDialog} handleClose={handleClose} selectDataSource={selectDataSource} openFile={openFile} />

            <div className="row ms-2 m-0 p-0" >
                <div className="col-5">
                    <div className="row">
                        <div className="col-1 m-0 p-0 mt-1">
                            <button type="button" class="btn btn-sm" onClick={() => { nav(-1) }}>
                                <img src={back} />
                            </button>
                        </div>
                        <div className="col-10 m-0 p-0" >
                            <div className="ms-1 PrimaryFontColor customFontBold size32"> {MName}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className='row'>
                    <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Test data:
                    </div>
                    <div className='col-1 m-0 p-0 text-end'>
                        <button className=' btn-lg btn-success text-center border-0' style={{ backgroundColor: "#3B97C6" }}
                            onClick={() => { setShowDialog(true) }}
                        >
                            <div className='row p-1 text-center'>
                                <div className='col-9  text-center'>
                                    <div className='col-2'>Change</div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className='col-1 m-0 p-0 text-start'>
                        <button className='ms-2 pe-5 btn-lg btn-success text-center border-0'
                            onClick={
                                () => {
                                    console.log("conchonam")
                                    nav("/machinelearning/predict", {
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
                            <div className='row p-1 text-center'>
                                <div className='col-9  text-center'>
                                    <div className='col-3 ms-4 text-center'>Next</div>
                                </div>
                            </div>
                        </button>
                    </div>

                </div>

                <div style={{ height: 400, width: '100%' }}>
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
                {/* <div className='row'>
                    <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Output:
                    </div>
                    <div className='col'>
                        <button className=' btn-lg btn-success text-center border-0 p-3' style={{ backgroundColor: "#3B97C6" }}
                        // onClick={() => { props.updateSubmit() }}
                        >
                            <div>Save as datasource</div>
                        </button>
                    </div>
                </div> */}
            </div>
        </div >
    )
}
