import React from 'react'
import ReactFileReader from 'react-file-reader'
import ImportFileImage from 'resources/images/importFile.png'
import json_file from 'resources/icons/json_file.svg'
import db from "resources/icons/db.svg"
import ImportButton from '../Components/ImportButton'
import { Roboto, Poppins } from "../../../utils/font"
import { deep_blue_primary } from "../../../utils/color"
export default function SelectData(props) {

    const executeStringResult = (result) => {
        let data = []
        let dataSheet = result.split('\n').length === 2 ? result.split('\r') : result.split('\n')
        if (dataSheet.length === 0) return
        // find the sign to split string
        let divider = dataSheet[0].includes(',') ? ',' : ';'
        let keys = dataSheet[0].split(divider)
        console.log(dataSheet[1])
        keys.map((ele, index) => ele.includes('\"') ? keys[index] = ele.substring(1, ele.length - 1) : ele)
        console.log(keys)
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
        console.log(data)
        props.setDataFile(data)
        // void callback
        props.onloadComplete()
    }

    const handleFiles = (file) => {
        // check file format
        if (!file[0].name.includes('csv')) {
            alert("Invalid format, expected: '.csv'")
        } else {
            // valid format
            // store file information
            props.setFileInformation({ ...file[0], name: file[0].name.replaceAll('.', '_') })
            var reader = new FileReader();
            reader.readAsText(file[0]);
            console.log(file[0])
            reader.onloadend = e => {
                // set data when loaded
                executeStringResult(reader.result)
            }
        }
    }
    return (
        <div>
            <div>
                <div>
                    <h2 class="ms-4 mt-2" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}>
                        Import data:
                    </h2>
                </div>
                <div className='row ms-4 p-4 m-0 p-0 bg-white'>
                    <div className='col-4 m-0 p-0' style={{ width: "240px" }}>
                        <ReactFileReader handleFiles={(file) => { handleFiles(file) }} fileTypes={'.csv'}>
                            <ImportButton text="Import file" image={ImportFileImage} />
                        </ReactFileReader>
                    </div>
                    <div className='col-4 ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <ReactFileReader handleFiles={(file) => { handleFiles(file) }} fileTypes={'.json'}>
                            <ImportButton text="Import json file" image={json_file} />
                        </ReactFileReader>
                    </div>
                    <div className='col-4 ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <ImportButton text="Connect to database" image={db} onClick={()=>{}} />
                    </div>
                </div>

            </div>
        </div>
    )
}
