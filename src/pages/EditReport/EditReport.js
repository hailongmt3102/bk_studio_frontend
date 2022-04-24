import React, { useState, useEffect, useRef } from "react";
import Content from "./components/Content";
import MenuBar from "./components/MenuBar";
import ToolBar from "./components/Bar/ToolBar";
import "./EditReport.css";
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Form } from 'react-bootstrap'
import back from "resources/icons/back_round_deep_blue.svg"
import align_left from "resources/icons/align_left.svg"
import align_right from "resources/icons/align_right.svg"
import align_center from "resources/icons/align_center.svg"
import align_justify from "resources/icons/align_justify.svg"
import bold from "resources/icons/bold.svg"
import underline from "resources/icons/underline.svg"
import italic from "resources/icons/italic.svg"
import Autocomplete from '@mui/material/Autocomplete';
import { GetDataSourcesListInformationInProject, getColumnsOfTable } from "api/DataSources"
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import SqlPopUp from "../../components/PopUp/SqlPopUp";
import ShareWithPopUp from "../../components/PopUp/ShareWithPopUp";
import ShareLinkPopUp from "../../components/PopUp/ShareLinkPopUp";
import { createNewReport, createNewComponent, getReportInformation, updateReportInformation, saveAsCopy } from 'api/Report'
import { useLocation, useNavigate } from "react-router-dom";
import { deep_blue_primary } from "utils/color";
import { textStyleDefault, widthDefault, heightDefault, frameStyleDefault, positionDefault } from 'utils/shape'
import { Rnd } from "react-rnd";


export default function EditReport(props) {

    const location = useLocation().pathname
    const navigate = useNavigate()
    const nav = useNavigate()
    let RId = location.split('/')[3]
    const currentProject = localStorage.getItem("currentProject")
    const contentRef = useRef(null)


    const updateSubmit = async () => {
        try {
            await updateReportInformation(currentProject, RId, {
                "Hastag": reportInformation.Hastag,
                "Description": "",
                "Name": reportInformation.Name
            })
            saveAllShapeComponents()
            Store.addNotification(content("Success", "Saved", "success"))
        }
        catch (err) {
            Store.addNotification(content("Fail", "Fail update", "danger"))
            console.log(err.response.data)
        }
    }

    const [reportInformation, setReportInformation] = useState(
        {
            "Id": 0,
            "PId": 0,
            "Hastag": "",
            "Author": ".",
            "CreateTime": "",
            "LastModified": "",
            "Description": "",
            "TId": null,
            "Type": "",
            "Name": ""
        }
    )

    const getDataFields = async (PId) => {
        try {
            let dataSourceList = await GetDataSourcesListInformationInProject({
                PId: PId
            })
            // get all field for each table
            let result = {}
            for (let i = 0; i < dataSourceList.data.length; i++) {
                let columns = await getColumnsOfTable(dataSourceList.data[i].Information)
                result[dataSourceList.data[i].Information] = columns.data.Columns.filter(ele => ele != "DataSource_Id")
            }
            setDataSource(result)
        } catch (err) {
            console.log("list datasource", err)
        }
    }

    useEffect(() => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            //GET INFORMATION CUA PROJECT 
            getReportInformation(currentProject, RId)
                .then(res => {
                    setReportInformation(res.data)
                    //console.log("report in4:", reportInformation)
                })
                .catch(err => {
                    Store.addNotification(content("Access fail", err.response.data, "danger"))

                })
        }

        if (currentProject != null) {
            getDataFields(currentProject)
        }
    }, [])

    const saveACopyHandle = () => {
        saveAsCopy(currentProject, RId)
            .then(res => {
                console.log(res.data)
                nav(`/project/gallery/${res.data.Id}/edit`)
                window.location.reload()
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
            })

    }

    const newFileSubmit = () => {
        createNewReport(localStorage.getItem("currentProject"),
            {
                Hastag: "",
                Description: "",
                Name: "New Report"
            })
            .then(res => {
                console.log(res.data)
                nav(`/project/gallery/${res.data.Id}/edit`)
                window.location.reload()
            })
            .catch(err => {
                Store.addNotification(content("Access fail", err.response.data, "danger"))
            })
    }

    // list data sources of the report
    const [dataSource, setDataSource] = useState({})

    const [key, setKey] = useState('Data');
    const fonts = ['Roboto', 'Poppins'];
    const size = ['14', '16', "32", '45'];
    const [showSqlPopUp, setshowSqlPopUp] = useState(false)
    const [popUpType, setPopUpType] = useState("")


    const showSqlPopUpFunction = (type) => {
        setshowSqlPopUp(true)
        setPopUpType(type)
    }

    const createNewComponentInReport = (query) => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject != null) {
            let RId = location.split('/')[3]
            let newShape = {
                Title: "example",
                Type: componentType,
                QueryCommand: query.replaceAll('\n', " "),
                Height: heightDefault,
                Width: widthDefault,
                Position: JSON.stringify(positionDefault),
                TitleTheme: "",
                TextTheme: JSON.stringify(textStyleDefault),
                FrameTheme: JSON.stringify(frameStyleDefault)
            }
            createNewComponent(currentProject, RId, newShape)
                .then(res => {
                    alert(res.data)
                    sendNewComponentInfoToContent(newShape)
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }
    }

    const [tabData, setTabData] = useState({
        data: "",
        style: {
            font: "Roboto",
            size: 14,
            decoration: "",
            alignment: "",
            fill: "",
            stroke: ""
        }
    })

    // after create new component by sql popup, send it to content
    // content will be get new data from server and render new shape 
    const sendNewComponentInfoToContent = (newComponent) => {
        contentRef.current.pushNewComponent(newComponent)
    }

    // trigger on change of tabData
    useEffect(() => {
        console.log(tabData)
    }, [tabData])

    // render components
    const tab_component = () => {
        return <div className="col-2 ">
            <Tabs className="p-2" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab className="p-4" eventKey="Data" label="Data">
                    <h4>Script</h4>
                    <div className="m-4">SELECT* FROM </div>
                    <div className="mt-3">
                        <h4>Data sources:</h4>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <h4>Field:</h4>
                        </div>
                        <div className="col">
                            <h4>Type</h4>
                        </div>
                    </div>
                </Tab>
                <Tab className="p-4" eventKey="Format" label="Style">
                    <div className="mt-2">Text</div>
                    <div className="row mt-2">
                        <div className="col">
                            <Autocomplete
                                id="custom-input-demo"
                                options={fonts}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="mt-2">Size</div>
                    <div className="row mt-2">
                        <div className="col">
                            <Autocomplete
                                id="custom-input-demo"
                                options={size}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="row m-2 m-0 p-0 mt-2  h-100  align-items-center">
                        <div className="col-1 m-0 p-0 text-center" >
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => { }}><img src={bold} height="15px" width="15px" /></button>
                        </div>
                        <div className="col-1 m-0 p-0 ms-5" onClick={() => { }}>
                            <button type="button" class="btn m-0 p-0 btn-sm ms-2" onClick={() => { }}> <img src={italic} height="30px" width="30px" /></button>
                        </div>
                        <div className="col-1 m-0 p-0 ms-5" onClick={() => { }}>
                            <button type="button" class="btn m-0 p-0 btn-sm ms-2" onClick={() => { }}> <img src={underline} height="20px" width="20px" /></button>
                        </div>

                    </div>
                    <div>Alignment</div>
                    <div className="row m-3">
                        <div className="col">
                            <img src={align_left} height="20px" width="20px" />
                        </div>
                        <div className="col">
                            <img src={align_right} height="20px" width="20px" />
                        </div>
                        <div className="col">
                            <img src={align_center} height="20px" width="20px" />
                        </div>
                        <div className="col">
                            <img src={align_justify} height="20px" width="20px" />
                        </div>

                    </div>
                    <div>Fill</div>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                    />

                    <div>Stroke</div>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                    />
                </Tab>
            </Tabs>
        </div>
    }

    const [componentType, setComponentType] = useState("")

    const componentTypeHandle = (type) => {
        setComponentType(type)
    }

    const [showSharePopUp, setshowSharePopUp] = useState(false)
    const [showShareLinkPopUp, setshowShareLinkPopUp] = useState(false)

    // ref to content component of report
    const saveAllShapeComponents = () => {
        contentRef.current.saveAllShape()
    }
    const pasteShape = () => {
        contentRef.current.pasteShape()
    }
    const deleteShape = () => {
        contentRef.current.deleteShape()
    }

    const listPopUp = () => {
        return <div>
            <SqlPopUp
                type={popUpType}
                show={showSqlPopUp}
                handleClose={() => {
                    setshowSqlPopUp(false)
                }}
                onComplete={(sql) => {
                    // setAppendPeopleList(appendPeopleList + 1)
                    createNewComponentInReport(sql)
                }}
                dataSource={dataSource}
            />
            <ShareWithPopUp
                currentProject={currentProject}
                RId={RId}
                show={showSharePopUp}
                handleOpen={() => {
                    setshowSharePopUp(true)
                }}
                handleClose={() => {
                    setshowSharePopUp(false)
                }}

            />
            <ShareLinkPopUp
                currentProject={currentProject}
                RId={RId}
                show={showShareLinkPopUp}
                handleOpen={() => {
                    setshowShareLinkPopUp(true)
                }}
                handleClose={() => {
                    setshowShareLinkPopUp(false)
                }}

            />
        </div>
    }


    const EditPageUI = () => {
        return <div>
            {listPopUp()}
            <div className="row">
                {tab_component()}
                <div className="col-10 h-200">
                    <div className="rightColumn p-3">
                        <div className="row m-0 p-0">
                            <div className="col-7 m-0 p-0">
                                <div className="row m-0 p-0" >
                                    <div className="col-1 m-0 p-0 mt-1">
                                        <button type="button" class="btn btn-sm" onClick={() => { navigate(-1) }}>
                                            <img src={back} />
                                        </button>
                                    </div>
                                    <div className="col-8 m-0 p-0" >
                                        <Form.Control type="text" value={reportInformation.Name} onChange={(event) => {
                                            setReportInformation({ ...reportInformation, Name: event.target.value })

                                        }}
                                            className="border-0 mb-2 m-0 p-0"
                                            placeholder="Report Name"
                                            style={{
                                                fontSize: "32px",
                                                backgroundColor: "#F7F7F7",
                                                color: deep_blue_primary,
                                                fontFamily: "Poppins",
                                                fontWeight: "bold"
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row ms-5 m-0 p-0 text-center">
                                    <div className="col-5">
                                        <Form.Control type="text" value={reportInformation.Hastag} onChange={(event) => {
                                            setReportInformation({ ...reportInformation, Hastag: event.target.value })

                                        }}
                                            className="text-primary border-0  m-0 p-0 ms-4"
                                            placeholder="#Hastag"
                                            style={{
                                                fontSize: "22px",
                                                backgroundColor: "#F7F7F7",
                                                fontFamily: "Poppins",
                                                fontWeight: "bold"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MenuBar
                            newFileSubmit={newFileSubmit}
                            updateSubmit={updateSubmit}
                            showSqlPopUpFunction={showSqlPopUpFunction}
                            componentTypeHandle={componentTypeHandle}
                            saveAllShapeComponents={saveAllShapeComponents}
                            pasteShape={pasteShape}
                            deleteShape={deleteShape}
                        />

                        <ToolBar
                            OpenSharePopUp={() => setshowSharePopUp(true)}
                            OpenShareLinkPopUp={() => setshowShareLinkPopUp(true)}
                            saveACopyHandle={() => saveACopyHandle()}
                        />
                        <div className=" content" ref={contentBoxRef}>
                            <Content
                                RId={RId}
                                ref={contentRef}
                                setTabData={setTabData}
                                tabData={tabData}
                                createNewComponentInReport={createNewComponentInReport}
                                showingMouseDrag={addShapeType != null}
                                mouseDragValue={dragAreaLocation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const ViewPageUI = () => {
        return <div className="row">

            <div className="leftColumn p-3">
                <div className="row m-0 p-0">
                    <div className="col-7 m-0 p-0">
                        <div className="row m-0 p-0" >
                            <div className="col-1 m-0 p-0 mt-1">
                                <button type="button" class="btn btn-sm" onClick={() => { navigate(-1) }}>
                                    <img src={back} />
                                </button>
                            </div>
                            <div className="col-8 m-0 p-0" >
                                <div className="ms-1 PrimaryFontColor customFontBold size32"> {reportInformation.Name} </div>
                            </div>
                        </div>
                        <div className="row m-0 p-0">
                            <div className="col-1">

                            </div>
                            <div className=" col-10 SecondFontColor customFontBold size24">
                                {reportInformation.Hastag}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className=" col-10 ">
                        <div className="content">
                            <Content
                                RId={RId}
                                ref={contentRef}
                                setTabData={setTabData}
                                tabData={tabData}
                                createNewComponentInReport={createNewComponentInReport}
                            />
                        </div>
                    </div>
                    <div className="col-2 content p-4 ">

                        <h3 className="PrimaryFontColor size32 customFontBold" >
                            Detail:
                        </h3>
                        <div className="row mt-5 ">
                            <div className="col PrimaryFontColor size16 customFontBold">Id</div>
                            <div className="col">{reportInformation.Id} </div>
                        </div>
                        <div className="mt-4 PrimaryFontColor size16 customFontBold">Data sources:</div>
                        <div className="row mt-4">
                            <div className="col PrimaryFontColor size16 customFontBold">Created by: </div>
                            <div className="col mt-2">{reportInformation.Author} </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col PrimaryFontColor size16 customFontBold">Last Modified:</div>
                            <div className="col">{reportInformation.LastModified} </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    }

    return (
        <div>
            {props.isEdit === true ? EditPageUI() : ViewPageUI()}
        </div>

    );
}
