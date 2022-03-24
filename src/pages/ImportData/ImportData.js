import React, { useState } from 'react'

import SelectData from './Children/SelectData'
import EditData from './Children/EditData'
import { ImportDataApi } from 'api/DataSources'
import { useNavigate } from 'react-router-dom'

import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"

export default function ImportData() {
    const [dataFile, setDataFile] = useState([])
    const [fileInformation, setFileInformation] = useState()

    const [step, setStep] = useState(1)

    const navigate = useNavigate()
    const onloadComplete = () => {
        // navigate to next step, execute data file
        setStep(2)
    }

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
        // send it to server
        ImportDataApi(name, data)
            .then(res => {
                Store.addNotification(content("Success", "Import data successfully", "success"), {
                    duration: 5000
                })
                navigate("/datasources")
                setStep(1)
            })
            .catch(err => {
                Store.addNotification(content("Warning", err.response.data, "danger"))
                return
            })

    }

    switch (step) {
        case 1:
            return (
                <SelectData setDataFile={setDataFile} setFileInformation={setFileInformation} onloadComplete={onloadComplete} />
            )
        case 2:
            return (
                <EditData dataFile={dataFile} fileInformation={fileInformation} submit={submit} />
            )
        default:
            break;
    }
}
