import { useContext, useRef, useState } from 'react'
import { Store } from 'react-notifications-component'
import db from "resources/icons/db.svg"
import json_file from 'resources/icons/json_file.svg'
import ImportFileImage from 'resources/images/importFile.png'
import { content } from "utils/notification"
import * as XLSX from "xlsx"
import { localizationContext } from '../../../App'
import ImportButton from '../Components/ImportButton'
import { getAPI } from 'api/ML_API'
import AddPopUp from "../Components/AddPopUp";
import Papa from "papaparse";



export default function SelectData(props) {
    const localization = useContext(localizationContext)



    const [csvList, setCsvlist] = useState([])

    const handleOnChange = (e) => {
        let files = e.target.files;
        if (!e.target.files[0].name.includes('.csv')) {
            alert("invalid format, expected : .csv")
            return
        }
        // props.setFileInformation({ ...file, name: file.name.replaceAll('.', '_') })
        // const fileReader = new FileReader();
        // fileReader.onload = function (event) {
        //     const csvOutput = event.target.result;
        //     executeStringResult(csvOutput)
        // };
        // fileReader.readAsText(file);

        // const files = e.target.files;
        // console.log(files);
        if (files) {
            // console.log(files[0]);
            const file = files[0]
            props.setFileInformation({ ...file, name: file.name.replaceAll('.', '_') })
            Papa.parse(file, {
                complete: function (results) {
                    console.log("Finished:", results.data);
                    setCsvlist(results.data)
                    const key = results.data[0]
                    const data = results.data.slice(1).map(row => row.reduce((pre, cur, index) => { return { ...pre, [key[index]]: cur } }, {}))
                    console.log(data)
                    props.setDataFile([...data])
                    props.onloadComplete()
                }
            }
            )


        }
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
                // console.log(data)

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

    const fetchFromAPI = async (name, api) => {
        try {
            let response = await getAPI(api)
            props.setFileInformation({ name: name })
            props.setDataFile(response)
            props.onloadComplete()
        } catch (error) {
            Store.addNotification(content("Warning", "Some thing went wrong from your api link\nPlease check carefully", "danger"))
        }
    }

    const [show, setShow] = useState(false)

    const submitAPIHandle = (name, url) => {
        setShow(false)

        fetchFromAPI(name, url)
    }
    // const executeStringResult = (result) => {
    //     if (!result) {
    //         Store.addNotification(content("Warning", "Some thing went wrong from your data source\nPlease check carefully", "danger"))
    //         return
    //     }
    //     let data = []
    //     let endline = "\n"
    //     if (/\r\n/.test(result)) endline = "\r\n"
    //     else if (/\r/.test(result)) endline = "\r"
    //     let dataSheet = result.split(endline)
    //     if (dataSheet.length === 0) return
    //     // find the sign to split string
    //     let divider = dataSheet[0].includes(',') ? ',' : ';'
    //     let keys = dataSheet[0].split(divider).filter(key => key != "")
    //     keys.map((ele, index) => ele.includes('\"') ? keys[index] = ele.substring(1, ele.length - 1) : ele)
    //     dataSheet.map((row, index) => {
    //         if (row.includes(divider)) {
    //             if (index !== 0) {
    //                 let rows = {}
    //                 row.split(divider).map((ele, index) => {
    //                     rows[keys[index]] = ele.includes('\"') ? ele.substring(1, ele.length - 1) : ele
    //                 })
    //                 data.push(rows)
    //             }
    //         }
    //     })
    //     props.setDataFile([...data])
    //     props.onloadComplete()
    // }
    return (
        <div>
            <AddPopUp
                show={show}
                handleClose={() => {
                    setShow(false)
                }}
                onComplete={submitAPIHandle}
            />
            <div>
                <div>
                    <h2 class="ms-4 mt-2 PrimaryFontColor size40 customFontBold" >
                        {localStorage.getItem("currentProjectName") ? localStorage.getItem("currentProjectName") + "- " : ""}{localization.importData}
                    </h2>
                </div>
                <div className='row p-4 ms-4 p-4 m-0 p-0 customforeground'>
                    <div className='col-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            ref={inputFile}
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                            style={{ display: "none" }}
                        />
                        <ImportButton text={localization.importCSV} image={ImportFileImage} onClick={() => {
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
                        <ImportButton text={localization.importXLSX} image={ImportFileImage} onClick={() => {
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
                        <ImportButton text={localization.importJSOM} image={json_file} onClick={() => {
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
                        <ImportButton text={localization.connectToDB} image={db} onClick={() => {
                            // openFile()
                            setShow(true)

                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
