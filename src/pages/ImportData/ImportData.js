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
                <EditData dataFile={dataFile} fileInformation={fileInformation} submit={submit} />
            )
        default:
            break;
    }
}
