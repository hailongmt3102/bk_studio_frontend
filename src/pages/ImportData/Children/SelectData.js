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

import { ScanTableFromSQL } from 'api/DataSources'

export default function SelectData(props) {
    const localization = useContext(localizationContext)



    const [csvList, setCsvlist] = useState([])

    const handleOnChange = (e) => {
        let files = e.target.files;
        if (!e.target.files[0].name.includes('.csv')) {
            alert("invalid format, expected : .csv")
            return
        }
        if (files) {
            // console.log(files[0]);
            const file = files[0]
            props.setFileInformation({ ...file, name: file.name.replace(/[\s\.-]/g, "_") })
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
    const handleReadTextOnChange = (e) => {
        let file = e.target.files[0];

        if (!file.name.includes('.txt')) {
            alert("invalid format, expected : .txt")
            return
        }
        props.setFileInformation({ ...file, name: file.name.replace(/[\s\.-]/g, "_") })
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
            const result = fileReader.result.split('\n');
            console.log("Mang ne", result)
            // console.log("doc dc file", fileReader.result)
            setConnection({ ...connection, host: result[0], port: result[1], user: result[2], password: result[3] })
            // fetchFromTxt()
        }
        fileReader.onerror = () => {
            console.log("Khong thanh cong")
        }
        // console.log("result txt file", fileReader.result)
    };

    const JsonHandleOnChange = (e) => {
        let file = e.target.files[0];
        if (!file.name.includes('.json')) {
            alert("invalid format, expected : .json")
            return
        }
        props.setFileInformation({ ...file, name: file.name.replace(/[\s\.-]/g, "_") })
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
        props.setFileInformation({ ...file, name: file.name.replace(/[\s\.-]/g, "_") })
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
    const inputTxtFile = useRef(null)


    const [connection, setConnection] = useState({
        host: "",
        port: "",
        user: "",
        password: ""
    })

    const fetchFromTxt = () => {

        console.log(connection)

        ScanTableFromSQL({ connectionInfo: connection })
            .then(res => {
                console("gui thanh cong", res.response.data)
                // setIsLoading(false)
                // Store.addNotification(content("Success", "Imported data", "success"), {
                //     duration: 5000
                // })
                // navigate("/pDetail/" + currentProjectId)
                // setStep(1)


                // props.setDataFile(data)
                // props.onloadComplete()
            })
            .catch(err => {
                // setIsLoading(false)
                // Store.addNotification(content("Fail", err.response.data, "danger"), {
                //     duration: 10000
                // })
                // console.log("Loi ne", )
                return
            })
        // let response = await getAPI(api)
        // props.setFileInformation({ name: name })
        // props.setDataFile(response)
        // props.onloadComplete()

    }

    // const fetchFromAPI = async (name, api) => {
    //     try {
    //         let response = await getAPI(api)
    //         props.setFileInformation({ name: name })
    //         props.setDataFile(response)
    //         props.onloadComplete()
    //     } catch (error) {
    //         Store.addNotification(content("Warning", "Some thing went wrong from your api link\nPlease check carefully", "danger"))
    //     }
    // }

    const [show, setShow] = useState(false)

    const submitAPIHandle = (param) => {
        setShow(false)

        // fetchFromAPI(name, url)
        ScanTableFromSQL({ connectionInfo: param })
            .then(res => {
                console("gui thanh cong", res.response.data)
                // setIsLoading(false)
                // Store.addNotification(content("Success", "Imported data", "success"), {
                //     duration: 5000
                // })
                // navigate("/pDetail/" + currentProjectId)
                // setStep(1)


                // props.setDataFile(data)
                // props.onloadComplete()
            })
            .catch(err => {
                // setIsLoading(false)
                // Store.addNotification(content("Fail", err.response.data, "danger"), {
                //     duration: 10000
                // })
                // console.log("Loi ne", )
                return
            })
    }

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
                    <h5 className='ms-4 mt-2 size22 customFontBold'>{localStorage.getItem("currentProjectName") ? localStorage.getItem("currentProjectName") + ":" : ""}</h5>
                    <h2 className="ms-4 mt-2 PrimaryFontColor size40 customFontBold" >
                        {localization.importData}
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
                            style={{ display: "none" }}
                        />
                        <ImportButton text={localization.connectToDB} image={db} onClick={() => {
                            // openFile()
                            setShow(true)

                        }} />
                    </div>
                    <div className='col-4 ms-4 m-0 p-0' style={{ maxWidth: "240px" }}>
                        <input
                            ref={inputTxtFile}
                            type={"file"}
                            id={"configfile"}
                            onChange={handleReadTextOnChange}
                            style={{ display: "none" }}
                        />
                        <ImportButton text="Config file" image={ImportFileImage} onClick={() => {
                            inputTxtFile.current.click()
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
