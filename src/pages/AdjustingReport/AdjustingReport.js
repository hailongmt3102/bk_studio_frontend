import { getColumnsOfTable, GetDataSourcesListInformationInProject, QueryData as QueryDataApi } from "api/DataSources";
import { createNewComponent as createNewComponentApi, createNewReport, deleteShape as deleteShapeApi, getAllComponent, getReportInformation, updateAComponent, updateReportInformation, saveAsCopy, saveAsTemplate, getAllDatasourceNameInReport, deleteReport } from 'api/Report';
import { createAReportByTemplate, deleteTemplate, getAllDatasourceNameInTemplate } from "api/Templates"
import TabComponent from "pages/AdjustingReport/components/tabComponent/TabComponent";
import { useEffect, useRef, useState } from "react";
import { Form } from 'react-bootstrap';
import { Store } from 'react-notifications-component';
import { useLocation, useNavigate } from "react-router-dom";
import back from "resources/icons/back_round_deep_blue.svg";
import { deep_blue_primary } from "utils/color";
import { content } from "utils/notification";
import { frameStyleDefault, heightDefault, positionDefault, textStyleDefault, widthDefault } from 'utils/shape';
import ToolBar from "./components/Bar/ToolBar";
import Content from "./components/Content";
import MenuBar from "./components/Bar/MenuBar";
import ShareLinkPopUp from "./components/PopUp/ShareLinkPopUp";
import ShareWithPopUp from "./components/PopUp/ShareWithPopUp";

import SqlPopUp from "./components/PopUp/SqlPopUp";
import './AdjustingReport.css';
import Button from '@mui/material/Button';

import { shapeBackgroundColors, shapeBorderColors } from 'utils/color';
import { WindowRounded } from "@mui/icons-material";

// declare some chart type of this app 
const shapeTypes = ["Table", "Pie Chart", "Doughnut Chart", "Line Chart", "Bar Chart"]

export default function AdjustingReport(props) {
    const location = useLocation()

    // some hiddenInfo of this report

    const RId = location.state.RId
    const currentProject = location.state.PId
    const isTemplate = location.state.Type == "Template"
    const isEdit = location.state.Permission == "Edit" && !isTemplate

    const navigate = useNavigate()
    const nav = useNavigate()
    const contentWrappingBox = useRef(null)
    const contentRef = useRef()

    // list data sources of the report
    const [dataSource, setDataSource] = useState({})

    const [key, setKey] = useState('Data');

    const [showSqlPopUp, setshowSqlPopUp] = useState(false)
    const [popUpType, setPopUpType] = useState("")

    const [tabData, setTabData] = useState({
        active: false,
        data: {
            title: "",
            script: "",
            dataSource: "",
        },
        style: {
            font: "Roboto",
            size: 14,
            decoration: "",
            alignment: "",
            fill: "",
            stroke: ""
        }
    })

    const [componentType, setComponentType] = useState("")

    const [showSharePopUp, setshowSharePopUp] = useState(false)
    const [showShareLinkPopUp, setshowShareLinkPopUp] = useState(false)

    const defaultLocation = {
        size: {
            width: 0,
            height: 0
        },
        position: {
            x: 0, y: 0
        }
    }
    const [dragAreaLocation, setDragAreaLocation] = useState(defaultLocation)
    const [addShapeType, setAddShapeType] = useState(null)

    // const report shapes
    const [shapeComponents, setShapeComponent] = useState([])

    const [followingIndexComponent, setFollowingIndexComponent] = useState(-1)
    const [copyIndexComponent, setCopyIndexComponent] = useState(-1)


    // ** ---------------------------------------------------------------------------------------------
    // ** some function get info of this report
    // ** get report information
    const getReportInfo = async () => {
        try {
            let res = await getReportInformation(currentProject, RId, isTemplate)
            setReportInformation(res.data)
        } catch (error) {
            console.log("Get report info fail, error", error)
        }
    }

    // ** get data source fields of this report
    const getDataFields = async () => {
        try {
            let dataSourceList = await GetDataSourcesListInformationInProject({
                PId: currentProject
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
    // ** ---------------------------------------------------------------------------------------------





    // ** ---------------------------------------------------------------------------------------------
    // ** declare some function for pop up layout
    const newFileHandle = () => {
        createNewReport(currentProject,
            {
                Hastag: "",
                Description: "",
                Name: "New Report"
            })
            .then(res => {
                console.log("ketqua", res.data)
                nav('/project/gallery/' + res.data.Id + '/edit', {
                    state: {
                        PId: currentProject,
                        Type: "Report",
                        RId: res.data.Id,
                        Permission: 'Edit'
                    }
                })
                window.location.reload()
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    const saveACopyHandle = () => {
        saveAsCopy(currentProject, RId)
            .then(res => {
                // console.log(res.data)
                nav('/project/gallery/' + res.data.Id + '/edit', {
                    state: {
                        PId: currentProject,
                        Type: "Report",
                        RId: res.data.Id,
                        Permission: 'Edit'
                    }
                })
                window.location.reload()

            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
            })

    }

    const saveATemplateHandle = () => {
        saveAsTemplate(currentProject, RId)
            .then(res => {
                // console.log(res.data)
                nav('/project/templates')
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
            })

    }


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

    const showSqlPopUpFunction = (type) => {
        setshowSqlPopUp(true)
        setPopUpType(type)
    }

    const componentTypeHandle = (type) => {
        setComponentType(type)
    }

    // ** declare function to sql query popup
    const buildQueryComplete = (title, query) => {
        if (currentProject != null) {
            let newShape = {
                Title: title,
                Type: componentType,
                QueryCommand: query.replaceAll('\n', " "),
                Height: heightDefault,
                Width: widthDefault,
                Position: JSON.stringify(positionDefault),
                TitleTheme: "",
                TextTheme: JSON.stringify(textStyleDefault),
                FrameTheme: JSON.stringify(frameStyleDefault)
            }
            createNewComponent(newShape)
        }
    }
    // ** ---------------------------------------------------------------------------------------------




    // ** ---------------------------------------------------------------------------------------------
    // ** declare some function for render report shapes
    const checkNeedToQueryData = (type) => {
        return shapeTypes.includes(type)
    }

    // ** get all shape from server
    const fetchAllShapesFromServer = async () => {
        if (currentProject == null) return
        try {
            let componentResult = (await getAllComponent(currentProject, RId, isTemplate)).data
            let queryResult, parseResult
            for (let i = 0; i < componentResult.length; i++) {
                // don't need to fetch data from query command
                if (!checkNeedToQueryData(componentResult[i].Type)) continue
                // fetch data
                queryResult = await queryDataOfAShape(componentResult[i].QueryCommand)
                if (queryResult == null) {
                    // error to query data of this shape
                    componentResult[i].Type = "Error"
                    componentResult[i].Position = JSON.parse(componentResult[i].Position)
                } else {
                    try {
                        parseResult = parseDataQueried(componentResult[i].Type, queryResult)
                        // parse them json data from server
                        componentResult[i].Position = JSON.parse(componentResult[i].Position)
                        componentResult[i].TextTheme = JSON.parse(componentResult[i].TextTheme)
                        componentResult[i].FrameTheme = JSON.parse(componentResult[i].FrameTheme)
                        componentResult[i] = { ...componentResult[i], ...parseResult }
                    }
                    catch (err) {
                        // eror parse
                        componentResult[i] = { Type: "Unknown" }
                    }
                }
            }
            return componentResult
        }
        catch (err) {
            console.log("Fetch component fail:  ", err)
            return []
        }
    }

    // ** for each shape, query it's data
    const queryDataOfAShape = async (query) => {
        try {
            return await QueryDataApi(query, isTemplate)
        }
        catch (err) {
            console.log("Query data fail. error: ", err, " \n Query Command :  ", query)
            return null
        }
    }

    // ** parse data after query complete 
    const parseDataQueried = (type, queryResult) => {
        let keys, result = {}, arrayData
        switch (type) {
            case "Table":
                result.data = queryResult.data
                break
            case "Pie Chart":
                keys = Object.keys(queryResult.data[0])
                if (keys.length < 2) return

                // convert data to array
                arrayData = {}
                keys.map(key => arrayData[key] = [])

                queryResult.data.map(row => {
                    keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                })

                let pieData = {
                    labels: arrayData[keys[0]],
                    datasets: [
                        {
                            label: result.title,
                            data: arrayData[keys[1]],
                            backgroundColor: arrayData[keys[0]].map((_, index) => shapeBackgroundColors[index % shapeBackgroundColors.length]),
                            borderColor: arrayData[keys[0]].map((_, index) => shapeBorderColors[index % shapeBorderColors.length]),
                            borderWidth: 1,
                        }
                    ]
                }
                result.pieData = pieData
                break
            case "Doughnut Chart":
                keys = Object.keys(queryResult.data[0])
                if (keys.length < 2) return

                // convert data to array
                arrayData = {}
                keys.map(key => arrayData[key] = [])

                queryResult.data.map(row => {
                    keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                })

                let doughnutData = {
                    labels: arrayData[keys[0]],
                    datasets: [
                        {
                            label: result.title,
                            data: arrayData[keys[1]],
                            backgroundColor: arrayData[keys[0]].map((_, index) => shapeBackgroundColors[index % shapeBackgroundColors.length]),
                            borderColor: arrayData[keys[0]].map((_, index) => shapeBorderColors[index % shapeBorderColors.length]),
                            borderWidth: 1,
                        }
                    ]
                }
                result.doughnutData = doughnutData
                break
            case "Line Chart":
                if (queryResult.data.length == 0) return
                keys = Object.keys(queryResult.data[0])
                if (keys.length == 0) return

                // convert data to array
                arrayData = {}
                keys.map(key => arrayData[key] = [])

                queryResult.data.map(row => {
                    keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                })

                result.lineData = {
                    labels: arrayData[keys[0]],
                    datasets: keys.slice(1).map((key, index) => {
                        return {
                            label: key,
                            data: arrayData[key],
                            fill: true,
                            backgroundColor: shapeBackgroundColors[index % shapeBackgroundColors.length],
                            borderColor: shapeBorderColors[index % shapeBorderColors.length]
                        }
                    })
                }
                break;
            case "Bar Chart":
                if (queryResult.data.length == 0) return
                keys = Object.keys(queryResult.data[0])
                if (keys.length == 0) return
                // convert data to array
                arrayData = {}
                keys.map(key => arrayData[key] = [])

                queryResult.data.map(row => {
                    keys.map((key, index) => index == 0 ? arrayData[key].push(row[key]) : arrayData[key].push(parseInt(row[key])))
                })

                result.barData = {
                    labels: arrayData[keys[0]],
                    datasets: keys.slice(1).map((key, index) => {
                        return {
                            label: key,
                            data: arrayData[key],
                            fill: true,
                            backgroundColor: shapeBackgroundColors[index % shapeBackgroundColors.length],
                            borderColor: shapeBorderColors[index % shapeBorderColors.length]
                        }
                    })
                }

                break;
            default:
                console.log("Unresolve shape type : ", props.data.Type)
                break
        }
        return result
    }

    // ** combine all function relative to getting content of report
    const getReportContent = async () => {
        let res = await fetchAllShapesFromServer()
        setShapeComponent(res)
        console.log(res)
    }
    // ** ---------------------------------------------------------------------------------------------




    // ** ---------------------------------------------------------------------------------------------
    // ** declare some function to action with report content
    // ** function to resize or drag shape element
    const updateShapeComponent = (index, data) => {
        if (isEdit)
            setShapeComponent([...shapeComponents.slice(0, index), data, ...shapeComponents.slice(index + 1)])
    }

    // ** push new component 
    const pushNewComponentToUI = async (component) => {
        try {
            let parseResult = {}
            if (checkNeedToQueryData(component.Type)) {
                // fetch data
                let queryResult = await queryDataOfAShape(component.QueryCommand)
                parseResult = parseDataQueried(component.Type, queryResult)
                if (queryResult == null) {
                    // error to query data of this shape
                    component.Type = "Error"
                    component.Position = JSON.parse(component.Position)
                } else {
                    // parse them json data from server
                    component.Position = JSON.parse(component.Position)
                    component.TextTheme = JSON.parse(component.TextTheme)
                    component.FrameTheme = JSON.parse(component.FrameTheme)
                    component = { ...component, ...parseResult }
                }
            }
            console.log(shapeComponents, 1)
            setShapeComponent([...shapeComponents, component])
        } catch (err) {
            console.log("adding new component error : ", err)
        }
    }

    const updateQueryOfAComponent = async (query) => {
        if (followingIndexComponent == -1 || followingIndexComponent > shapeComponents.length - 1) return
        let index = followingIndexComponent
        try {
            let parseResult = {}
            if (checkNeedToQueryData(shapeComponents[index].Type)) {
                // fetch data
                let queryResult = await queryDataOfAShape(query)
                parseResult = parseDataQueried(shapeComponents[index].Type, queryResult)
                let newTypeParse = queryResult == null ? "Error" : shapeComponents[index].Type
                if (queryResult == null) {
                    // error to query data of this shape
                    parseResult.Type = "Error"
                } else {
                    // parse them json data from server
                    setShapeComponent([...shapeComponents.slice(0, index), { ...shapeComponents[index], ...parseResult, QueryCommand: query, Type: newTypeParse }, ...shapeComponents.slice(index + 1)])
                    saveAShapeComponent({
                        ...shapeComponents[index],
                        QueryCommand: query
                    })
                }
            }

        } catch (err) {
            console.log("update a component error : ", err)
        }
    }

    const removeComponentInUI = (index) => {
        setShapeComponent([...shapeComponents.slice(0, index), ...shapeComponents.slice(index + 1)])
    }

    // ** send api create new component 
    const createNewComponent = async (data) => {
        try {
            let res = await createNewComponentApi(currentProject, RId, data)
            // parse this response from server and build shape 
            await pushNewComponentToUI(res.data)
        } catch (error) {
            console.log("Create new shape error : ", error)
        }
    }

    const saveAllShapeComponents =  async () => {
        console.log(shapeComponents)
        let componentData
        for (let i = 0; i < shapeComponents.length; i++) {
            componentData = shapeComponents[i]
            try {
                await updateAComponent(currentProject, RId, {
                    CId: componentData.Id,
                    Title: componentData.Title,
                    Type: componentData.Type,
                    QueryCommand: componentData.QueryCommand,
                    Height: parseInt(componentData.Height),
                    Width: parseInt(componentData.Width),
                    Position: JSON.stringify(componentData.Position),
                    TitleTheme: componentData.TitleTheme,
                    TextTheme: JSON.stringify(componentData.TextTheme),
                    FrameTheme: JSON.stringify(componentData.FrameTheme)
                })
            } catch (error) {
                console.log("Save shape error :", componentData.Id, " \n Error: ", error)
            }
        }
    }

    const saveAShapeComponent = async (componentData) => {
        try {
            await updateAComponent(currentProject, RId, {
                CId: componentData.Id,
                Title: componentData.Title,
                Type: componentData.Type,
                QueryCommand: componentData.QueryCommand,
                Height: parseInt(componentData.Height),
                Width: parseInt(componentData.Width),
                Position: JSON.stringify(componentData.Position),
                TitleTheme: componentData.TitleTheme,
                TextTheme: JSON.stringify(componentData.TextTheme),
                FrameTheme: JSON.stringify(componentData.FrameTheme)
            })
        } catch (error) {
            console.log("Save shape error :", componentData.Id, " \n Error: ", error)
        }
    }

    const copyShape = () => {
        if (followingIndexComponent != -1)
            setCopyIndexComponent(followingIndexComponent)
    }

    const pasteShape = () => {
        if (currentProject == null || copyIndexComponent == -1) return
        try {
            let selectedShape = shapeComponents[followingIndexComponent]
            let newShape = {
                Title: selectedShape.Title,
                Type: selectedShape.Type,
                QueryCommand: selectedShape.QueryCommand,
                Height: selectedShape.Height,
                Width: selectedShape.Width,
                Position: JSON.stringify({ x: selectedShape.Position.x + 50, y: selectedShape.Position.y + 50 }),
                TitleTheme: "",
                TextTheme: JSON.stringify(selectedShape.TextTheme),
                FrameTheme: JSON.stringify(selectedShape.FrameTheme)
            }
            createNewComponent(newShape)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteShape = async () => {
        if (followingIndexComponent == -1) return
        try {
            await deleteShapeApi(currentProject, RId, parseInt(shapeComponents[followingIndexComponent].Id))
            removeComponentInUI(followingIndexComponent)
            if (followingIndexComponent == copyIndexComponent) setCopyIndexComponent(-1)
            setFollowingIndexComponent(-1)
        } catch (error) {
            console.log("Delete shape error : ", error)
        }
    }
    // ** ---------------------------------------------------------------------------------------------




    //!  NOT WORKING
    //! start
    // ** ---------------------------------------------------------------------------------------------
    // ** create some function to add non query shape in report
    // ** create some mouse event to draw drag area
    const adjustedMouseEvent = () => {
        const canvas = contentWrappingBox.current
        if (canvas == null) return
        let position
        const onMouseMove = (e) => {
            // if (shapeTypeVariable == null) return
            const size = {
                width: e.offsetX - position.x,
                height: e.offsetY - position.y,
            }
            setDragAreaLocation(prev => ({ ...prev, size }))
        }
        canvas.addEventListener("mousedown", (e) => {
            position = {
                x: e.offsetX,
                y: e.offsetY
            }
            setDragAreaLocation(prev => ({ ...prev, position }))
            canvas.addEventListener("mousemove", onMouseMove)
            canvas.addEventListener("mouseup", () => {
                canvas.removeEventListener("mousemove", onMouseMove)
                // if (shapeTypeVariable == null) return
                executeWhenDragged({ ...dragAreaLocation })
                setDragAreaLocation(defaultLocation)
            })
        })

        console.log("added mouse event")
    }

    // ** when drag complete
    const executeWhenDragged = (dragInfo) => {
        console.log(dragInfo)
        switch (addShapeType) {
            case "text":
                createTextComponent(dragInfo)
                break
            default:
                break
        }
    }


    // ** ---------------------------------------------------------------------------------------------
    //! end




    // ** ---------------------------------------------------------------------------------------------
    // ** trigger click outside of component 
    // ** can create new component 
    const triggerClickContentBackground = (e) => {
        if (contentRef == null) return
        if (contentRef.current && !contentRef.current.contains(e.target)) {
            setFollowingIndexComponent(-1)
            // executeWhenClickOutside(e)
        }
    }

    // ** check menu status and create relative information
    const executeWhenClickOutside = (position) => {
        console.log(position)
        switch (addShapeType) {
            case "text":
                createTextComponent()
                break
            default:
                break
        }
    }

    // ** create text component
    const createTextComponent = async () => {
        try {
            // let newShape = {
            //     Title: "Title",
            //     Type: componentType,
            //     QueryCommand: "",
            //     Height: 100,
            //     Width: 300,
            //     Position: JSON.stringify(info.position),
            //     TitleTheme: "",
            //     TextTheme: JSON.stringify(textStyleDefault),
            //     FrameTheme: JSON.stringify(frameStyleDefault)
            // }
            // await createNewComponent(currentProject, RId, newShape)
            // pushNewComponentToUI(newShape)
        }
        catch (err) {
            console.log(err)
        }
    }

    const onMouseDownHandler = (e) => {

    }

    const onMouseMoveHandler = (e) => {

    }

    const onMouseUpHandler = (e) => {

    }


    const [listDataSourcesName, setListDataSourcesName] = useState([])

    const onChangeFocusShape = (index) => {
        if (index < shapeComponents.length && index >= 0) {
            let shapeData = shapeComponents[index]
            setTabData({
                active: true,
                data: {
                    title: shapeData.Title,
                    script: shapeData.QueryCommand,
                    type: shapeData.Type
                },
                style: {
                    font: shapeData.TextTheme.font,
                    size: shapeData.TextTheme.size,
                    decoration: shapeData.TextTheme.decoration,
                    alignment: shapeData.TextTheme.alignment,
                    fill: shapeData.FrameTheme.color,
                    stroke: ""
                }
            })
        } else {
            setTabData({
                active: false,
                data: {
                    title: "",
                    script: "",
                    type: ""
                },
                style: {
                    font: "",
                    size: "",
                    decoration: "",
                    alignment: "",
                    fill: "",
                    stroke: ""
                }
            })
        }
    }

    useEffect(() => {
        getReportInfo()
        getDataFields()
        getReportContent()
        if (!isTemplate) {
            getAllDatasourceNameInReport(currentProject, RId)
                .then(res => {
                    setListDataSourcesName(res.data)
                    // console.log("listdata", res.data)
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }
        else {
            getAllDatasourceNameInTemplate(RId)
                .then(res => {
                    setListDataSourcesName(res.data)
                    // console.log("listdata", res.data)
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }


        // register mouse event
        // adjustedMouseEvent()
    }, [])

    // trigger on change of tabData
    useEffect(() => {
        console.log(addShapeType)
    }, [addShapeType])

    // trigger on change focus component
    useEffect(() => {
        onChangeFocusShape(followingIndexComponent);
    }, [followingIndexComponent])

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

    const switchToViewMode = () => {
        nav('/project/gallery/' + RId + '/view', {
            state: {
                PId: location.state.PId,
                Type: location.state.Type,
                RId: location.state.RID,
                Permission: "View"
            }
        })
    }


    const deleteHandle = () => {
        if (location.state.Type === "Report") {

            deleteReport(currentProject, RId)
                .then(res => {
                    nav('/project/gallery')
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }
        else
            deleteTemplate(RId)
                .then(res => {
                    nav('/project/gallery')
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })

    }
    const EditUI = () => {
        return <div>
            <div>
                {/* some popup */}

                <SqlPopUp
                    type={popUpType}
                    show={showSqlPopUp}
                    handleClose={() => {
                        setshowSqlPopUp(false)
                    }}
                    onComplete={buildQueryComplete}
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
            <div className="row">
                <TabComponent
                    data={tabData}
                    dataSource={dataSource}
                    updateQueryOfAComponent={updateQueryOfAComponent}
                />
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
                                        {
                                            isEdit ?
                                                <Form.Control type="text" value={reportInformation.Name}
                                                    onChange={(event) => {
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
                                                /> :
                                                <Form.Control type="text" value={reportInformation.Name}
                                                    onChange={(event) => {
                                                        setReportInformation({ ...reportInformation, Name: event.target.value })

                                                    }}
                                                    readOnly
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
                                        }
                                    </div>
                                </div>
                                <div className="row ms-5 m-0 p-0 text-center">
                                    <div className="col-5">
                                        {isEdit ?
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
                                            :
                                            <Form.Control type="text" value={reportInformation.Hastag} onChange={(event) => {
                                                setReportInformation({ ...reportInformation, Hastag: event.target.value })

                                            }}
                                                readOnly
                                                className="text-primary border-0  m-0 p-0 ms-4"
                                                placeholder="#Hastag"
                                                style={{
                                                    fontSize: "22px",
                                                    backgroundColor: "#F7F7F7",
                                                    fontFamily: "Poppins",
                                                    fontWeight: "bold"
                                                }}
                                            />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MenuBar
                            newFileHandle={newFileHandle}
                            updateSubmit={updateSubmit}
                            showSqlPopUpFunction={showSqlPopUpFunction}
                            componentTypeHandle={componentTypeHandle}
                            saveAllShapeComponents={saveAllShapeComponents}
                            pasteShape={pasteShape}
                            deleteShape={deleteShape}
                            copyShape={copyShape}
                            isEdit={isEdit}
                            switchToViewModeHandle={() => { switchToViewMode() }}
                            saveHandle={updateSubmit}
                            deleteHandle={deleteHandle}
                        />

                        <ToolBar
                            OpenSharePopUp={() => setshowSharePopUp(true)}
                            OpenShareLinkPopUp={() => setshowShareLinkPopUp(true)}
                            setAddShapeType={setAddShapeType}
                            isEdit={isEdit}
                            saveACopyHandle={() => saveACopyHandle()}
                            saveATemplateHandle={() => saveATemplateHandle()}
                        />

                        <div className="content"
                            onClick={(e) => triggerClickContentBackground(e)}
                            onMouseDown={onMouseDownHandler}
                            onMouseMove={onMouseMoveHandler}
                            onMouseUp={onMouseUpHandler}
                        >
                            <Content
                                isEdit={isEdit}
                                ref={contentRef}
                                shapeComponents={shapeComponents}
                                updateShapeComponent={updateShapeComponent}
                                followingIndexComponent={followingIndexComponent}
                                setFollowingIndexComponent={setFollowingIndexComponent}
                                showingMouseDrag={addShapeType != null}
                                mouseDragValue={dragAreaLocation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }




    const createAReportByTemplateHandle = () => {
        createAReportByTemplate(RId, {
            ProjectId: currentProject,
        })
            .then(res => {
                nav('/project/gallery/' + res.data.RId + '/edit', {
                    state: {
                        PId: res.data.PId,
                        Type: "Report",
                        RId: res.data.RId,
                        Permission: "Edit"
                    }
                })
                console.log("thanhcong", res.data)
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
                props.handleClose()
            })
    }

    const ViewPageUI = () => {
        return <div className="row">

            <div className="leftColumn p-3">
                <div className="row m-0 p-0">
                    <div className="col-8 m-0 p-0">
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
                            <div className=" col-8 SecondFontColor customFontBold size24">
                                {reportInformation.Hastag}
                            </div>

                        </div>
                    </div>
                    <div className="col-2 mt-5 m-0 p-0 mb-2 text-end pe-5">
                        {
                            isTemplate === true ? <div> <button className='btn-lg btn-success text-center border-0'
                                onClick={() => { createAReportByTemplateHandle() }}>
                                <div>Apply</div>
                            </button></div> : null
                        }
                    </div>
                    <div className="col-2 mt-5 m-0 p-0">

                    </div>


                    <div className="row mt-2">
                        <div className=" col-10 ">
                            <div className="content"
                                onClick={(e) => triggerClickContentBackground(e)}
                                onMouseDown={onMouseDownHandler}
                                onMouseMove={onMouseMoveHandler}
                                onMouseUp={onMouseUpHandler}
                            >
                                <Content
                                    isEdit={isEdit}
                                    ref={contentRef}
                                    shapeComponents={shapeComponents}
                                    updateShapeComponent={updateShapeComponent}
                                    followingIndexComponent={-1}
                                    setFollowingIndexComponent={setFollowingIndexComponent}
                                // showingMouseDrag={addShapeType != null}
                                // mouseDragValue={dragAreaLocation}
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
                            <div className="mt-2">
                                {
                                    listDataSourcesName.map((ele) => ele)
                                }
                            </div>
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
        </div>
    }

    return (
        <div>
            {
                isEdit === true ? EditUI() : ViewPageUI()
            }
        </div>
    )
}
