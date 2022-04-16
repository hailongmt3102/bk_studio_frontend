import React, { useRef } from 'react'
import ImportFileImage from 'resources/images/importFile.png'
import json_file from 'resources/icons/json_file.svg'
import db from "resources/icons/db.svg"
import ImportButton from '../Components/ImportButton'

import { deep_blue_primary } from "../../../utils/color"
export default function SelectData(props) {
    const executeStringResult = (result) => {
        let data = []
        let endline = "\n"
        if (/\r\n/.test(result)) endline = "\r\n"
        else if (/\r/.test(result)) endline = "\r"
        let dataSheet = result.split(endline)
        if (dataSheet.length === 0) return
        // find the sign to split string
        let divider = dataSheet[0].includes(',') ? ',' : ';'
        let keys = dataSheet[0].split(divider)
        keys.map((ele, index) => ele.includes('\"') ? keys[index] = ele.substring(1, ele.length - 1) : ele)
        dataSheet.map((row, index) => {
            if (row.includes(divider)) {
                if (index !== 0) {
                    let rows = {}
                    row.split(divider).map((ele, index) => {
                        rows[keys[index]] = ele.includes('\"') ? ele.substring(1, ele.length - 1) : ele
                    })
                    data.push(rows)
                }
            }
        })
        props.setDataFile([...data])
        props.onloadComplete()
    }

    const inputFile = useRef(null)
    const handleOnChange = (e) => {
        let file = e.target.files[0];
        if (!file.name.includes('.csv')){
            alert("invalid format, expected : .csv")
            return
        }
        props.setFileInformation({ ...file, name: file.name.replaceAll('.', '_') })
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const csvOutput = event.target.result;
            executeStringResult(csvOutput)
        };
        fileReader.readAsText(file);
    };
    const openFile = () => {
        inputFile.current.click()
    };

    return (
        <div>
            <div>
                <div>
                    <h2 class="ms-4 mt-2" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                        Import data:
                    </h2>
                </div>
                <div className='row p-4 ms-4 p-4 m-0 p-0 bg-white'>
                    <div className='col-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            ref={inputFile}
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                            style={{ display: "none" }}
                        />
                        <ImportButton text="Import csv file" image={ImportFileImage} onClick={() => {
                            openFile()
                        }} />
                    </div>
                    <div className='col-4 ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            type={"file"}
                            id={"jsonFileInput"}
                            accept={".json"}
                            //onChange={handleOnChange}
                            style={{ display: "none" }}
                        />
                        <ImportButton text="Import json file" image={json_file} onClick={() => {
                            //openFile()
                        }} />
                    </div>
                    <div className='col-4 ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            type={"file"}
                            id={"jsonFileInput"}
                            accept={".json"}
                            //onChange={handleOnChange}
                            style={{ display: "none" }}
                        />
                        <ImportButton text="Connect to database" image={db} onClick={() => {
                            // openFile()
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
