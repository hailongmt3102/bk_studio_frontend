import { useEffect, useState } from 'react'

import { ImportDataApi } from 'api/DataSources'
import { useLocation, useNavigate } from 'react-router-dom'
import EditData from './Children/EditData'
import SelectData from './Children/SelectData'

import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"

export default function ImportData() {
    const location = useLocation()
    const isModel = location.state ? location.state.isModel : false

    const [dataFile, setDataFile] = useState([])
    const [fileInformation, setFileInformation] = useState()

    const [step, setStep] = useState(1)

    const navigate = useNavigate()
    const onloadComplete = () => {
        if (!isModel) {
            setStep(2)
        }
        // navigate to next step, execute data file
    }

    useEffect(() => {
        try {
            if (isModel) {
                if (dataFile.length != 0) {
                    const keys = Object.keys(dataFile[0])

                    let rows = dataFile.map((row, index) => {
                        return { ...row, id: index }
                    })

                    let columns = keys.map((key) => {
                        return {
                            field: key,
                            headerName: key,
                            editable: false,
                        }
                    })

                    if (location.state.isEditModel) {
                        // navigate to edit model page
                        let edited = location.state.isEditInput ? { input: JSON.stringify(rows.slice(0,50)) } : { output: JSON.stringify(rows.slice(0,50)) }
                        navigate("/machinelearning/modelDetail/" + location.state.MId + "/edit", {
                            state: {
                                ...location.state,
                                ...edited
                            }
                        })
                    } else {
                        navigate("/machinelearning/predict", {
                            state: {
                                rows: rows,
                                columns: columns
                            }
                        })
                    }
                }
            }
        } catch (error) {

        }
    }, [dataFile])

    let currentProjectId = localStorage.getItem("currentProject")

    // send data to server
    const submit = (name, columns) => {
        console.log("submit")
        // filter data  
        let data = dataFile.map(row => {
            columns.active.map((state, index) => {
                if (!state) delete row[columns.data[index]]
            })
            return row
        })
        if (currentProjectId != null) {
            // send it to server
            ImportDataApi(name, data, currentProjectId)
                .then(res => {
                    Store.addNotification(content("Success", "Imported data", "success"), {
                        duration: 5000
                    })
                    navigate("/pDetail/" + currentProjectId)
                    setStep(1)
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"), {
                        duration: 10000
                    })
                    return
                })
        }
    }

    switch (step) {
        case 1:
            return (
                <SelectData setDataFile={setDataFile} setFileInformation={setFileInformation} onloadComplete={onloadComplete} />
            )
        case 2:
            return (
                <EditData dataFile={dataFile} fileInformation={fileInformation} submit={submit} setFileInformation={setFileInformation} />
            )
        default:
            break;
    }
}
