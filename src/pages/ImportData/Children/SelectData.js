import React, { useRef, useState } from 'react'
import ImportFileImage from 'resources/images/importFile.png'
import json_file from 'resources/icons/json_file.svg'
import db from "resources/icons/db.svg"
import ImportButton from '../Components/ImportButton'
import * as XLSX from "xlsx";
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
        console.log(data)
        props.setDataFile([...data])
        props.onloadComplete()
    }

    const handleOnChange = (e) => {
        let file = e.target.files[0];
        if (!file.name.includes('.csv')) {
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

    const JsonHandleOnChange = (e) => {
        let file = e.target.files[0];
        if (!file.name.includes('.json')) {
            alert("invalid format, expected : .json")
            return
        }
        props.setFileInformation({ ...file, name: file.name.replaceAll('.', '_') })
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const jsonOutput = event.target.result;
            props.setDataFile(JSON.parse(jsonOutput))
            props.onloadComplete()
        };
        fileReader.readAsText(file);
    };

    const [items, setItems] = useState([]);

    const readExcel = (file) => {
        props.setFileInformation({ ...file, name: file.name.replaceAll('.', '_') })
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                props.setDataFile(data)
                props.onloadComplete()
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
    };



    const inputFile = useRef(null)
    const inputXLSXFile = useRef(null)
    const inputJsonFile = useRef(null)

    return (
        <div>
            <div>
                <div>
                    <h2 class="ms-4 mt-2 PrimaryFontColor size40 customFontBold" >
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
                            inputFile.current.click()
                        }} />
                    </div>
                    <div className='col-4  ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            ref={inputXLSXFile}
                            type={"file"}
                            id={"xlxsFileInput"}
                            accept={".xlsx"}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                            }}
                            style={{ display: "none" }}
                        />
                        <ImportButton text="Import xlsx file" image={ImportFileImage} onClick={() => {
                            inputXLSXFile.current.click()
                        }} />
                    </div>
                    <div className='col-4 ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            ref={inputJsonFile}
                            type={"file"}
                            id={"jsonFileInput"}
                            accept={".json"}
                            onChange={JsonHandleOnChange}
                            style={{ display: "none" }}
                        />
                        <ImportButton text="Import json file" image={json_file} onClick={() => {
                            inputJsonFile.current.click()
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
                        {/* <div>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }}
                            />

                            <table class="table container">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((d) => (
                                        <tr key={d.Item}>
                                            <th>{d.Item}</th>
                                            <td>{d.Description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
