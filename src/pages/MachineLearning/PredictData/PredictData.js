import {
    DataGrid
} from '@mui/x-data-grid';
import { useDemoData } from "@mui/x-data-grid-generator";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bayesModelAPI } from "api/ML_API"

export default function PredictData() {
    const nav = useNavigate()
    const location = useLocation()
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])

    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });

    useEffect(() => {
        if (location.state) {
            setColumns(location.state.columns)
            setRows(location.state.rows)
        } else {
            nav("/machinelearning")
        }
    }, [])

    const predictHandle = () => {
        bayesModelAPI(rows)
            .then(response => {
                console.log(response)
                // setlistCompany(response.data)
            })
            .catch(
                err => {
                    // Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                }
            )
    }

    return (
        <div>
            <div className='row m-2 mt-4 mb-4'>
                <div class="col  mt-1 customFontBold PrimaryFontColor size40" >
                    Sample Model
                </div>
                <div className='col text-end'>
                    <button className='btn-lg btn-success text-center border-0' style={{ backgroundColor: "#3B97C6" }}
                        onClick={() => {
                            predictHandle()
                            // nav("/machinelearning/testModel") 
                        }}
                    >
                        <div className='row p-2 text-center'>
                            <div className='col-9  text-center'>
                                <div className='col-2'>Predict</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Test data:
                    <div style={{ height: 700, width: '100%' }}>
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
                <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Output:
                </div>
            </div>
        </div >
    )
}
