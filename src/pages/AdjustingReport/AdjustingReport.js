import { getColumnsOfTable, GetDataSourcesListInformationInProject, QueryData as QueryDataApi } from "api/DataSources";
import { createNewComponent as createNewComponentApi, createNewReport, deleteReport, deleteShape as deleteShapeApi, getAllComponent, getAllDatasourceNameInReport, getReportInformation, saveAsCopy, saveAsTemplate, updateAComponent, updateReportInformation } from 'api/Report';
import { createAReportByTemplate, deleteTemplate, getAllDatasourceNameInTemplate } from "api/Templates";
import TabComponent from "pages/AdjustingReport/components/tabComponent/TabComponent";
import { useContext, useEffect, useRef, useState } from "react";
import { Form } from 'react-bootstrap';
import { Store } from 'react-notifications-component';
import { useLocation, useNavigate } from "react-router-dom";
import back from "resources/icons/back_round_deep_blue.svg";
import { deep_blue_primary } from "utils/color";
import { content } from "utils/notification";
import { frameStyleDefault, heightDefault, positionDefault, textStyleDefault, widthDefault } from 'utils/shape';
import MenuBar from "./components/Bar/MenuBar";
import ToolBar from "./components/Bar/ToolBar";
import Content from "./components/Content";
import ShareLinkPopUp from "./components/PopUp/ShareLinkPopUp";
import ShareWithPopUp from "./components/PopUp/ShareWithPopUp";
import ConfirmDialog from "components/ConfirmDialog";
import './AdjustingReport.css';
import SqlPopUp from "./components/PopUp/SqlPopUp";
import { getInformationByPId } from "api/Project"
import { loadingContext } from 'App';
import * as htmlToImage from 'html-to-image';
import { shapeBackgroundColors, shapeBorderColors } from 'utils/color';
import { ConstructionOutlined } from "@mui/icons-material";
import jsPDF from "jspdf";
// import { updateAvatar } from 'api/Account'
// import { dataURLtoFile } from 'utils/utils'


// declare some chart type of this app 
const shapeTypes = ["Table", "Pie Chart", "Doughnut Chart", "Line Chart", "Bar Chart"]

export default function AdjustingReport(props) {
    const setIsLoading = useContext(loadingContext)
    const location = useLocation()

    // some hiddenInfo of this report

    const reportLink = window.location.href

    // console.log("path", reportLink)

    const [RId, setRId] = useState(0)
    const [currentProject, setCurrentProject] = useState(0)
    const [isTemplate, setIsTemplate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)


    const nav = useNavigate()
    const contentWrappingBox = useRef(null)
    const contentRef = useRef()
    const openImageRef = useRef()
    const [cursor, setCursor] = useState("default")


    // list data sources of the report
    const [dataSource, setDataSource] = useState({})


    const [showSqlPopUp, setShowSqlPopUp] = useState(false)
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

    const [showSharePopUp, setShowSharePopUp] = useState(false)
    const [showShareLinkPopUp, setShowShareLinkPopUp] = useState(false)

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

    const [keydown, setKeydown] = useState({ previous: "", current: "" })

    const [currentColorIndex, setCurrentColorIndex] = useState(0)

    const EditStyle = (newStyle) => {
        setTabData({ ...tabData, style: newStyle })
    }

    useEffect(() => {
        console.log("tab data changed ", tabData)

        if (followingIndexComponent < 0 || followingIndexComponent >= shapeComponents.length) {
            return
        }
        updateShapeComponent(followingIndexComponent, {
            ...shapeComponents[followingIndexComponent],
            TextTheme: {
                ...shapeComponents[followingIndexComponent].TextTheme,
                alignment: tabData.style.alignment,
                decoration: tabData.style.decoration,
                font: tabData.style.font,
                size: tabData.style.size,
                color: tabData.style.fill,
            },
            FrameTheme: {
                ...shapeComponents[followingIndexComponent].FrameTheme,
                color: tabData.style.stroke
            }
        })
    }, [tabData])

    useEffect(() => {
        console.log(shapeComponents)
    }, [shapeComponents])


    // ** ---------------------------------------------------------------------------------------------
    // ** some function get info of this report
    // ** get report information
    const getReportInfo = async () => {
        try {
            let res = await getReportInformation(currentProject, RId, isTemplate)
            setReportInformation(res.data)
        } catch (error) {
            Store.addNotification(content("Fail", error, "danger"))
            // console.log("Get report info fail, error", error)
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
                try {
                    let columns = await getColumnsOfTable(dataSourceList.data[i].Information)
                    result[dataSourceList.data[i].Information] = columns.data.Columns.filter(ele => ele != "DataSource_Id")
                }
                catch (e) {
                    console.log(e)
                }

            }
            setDataSource(result)
        } catch (error) {
            Store.addNotification(content("Fail", error, "danger"))
            // console.log("list datasource", err)
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
                // console.log("ketqua", res.data)
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
                // alert(err.response.data)
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
                nav('/templates')
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
            })

    }


    const updateSubmit = async () => {
        setIsLoading(true)
        try {
            let screenShoot = await takeScreenShot()
            // let file = dataURLtoFile(screenShoot, 'image.png');
            // let result = await updateAvatar(file)
            // let imageLink = result.data.length > 0 ? result.data[0].url : null
            await updateReportInformation(currentProject, RId, {
                "Hastag": reportInformation.Hastag,
                "Description": "",
                "Name": reportInformation.Name,
                "Image": screenShoot
                // "Image": imageLink ? imageLink : reportInformation.Image
            })
            saveAllShapeComponents()
            Store.addNotification(content("Success", "Saved", "success"))
            setIsLoading(false)
        }
        catch (err) {
            Store.addNotification(content("Fail", "Fail update", "danger"))
            // console.log(err.response.data)
            setIsLoading(false)
        }
    }

    const showSqlPopUpFunction = (type) => {
        setShowSqlPopUp(true)
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
    const fetchAllShapesFromServer = async (currentProject,RId,  isTemplate) => {
        let colorIndex = currentColorIndex;
        if (currentProject == null) return
        try {
            let componentResult = (await getAllComponent(currentProject, RId, isTemplate)).data
            let queryResult
            for (let i = 0; i < componentResult.length; i++) {
                componentResult[i].Position = JSON.parse(componentResult[i].Position)
                componentResult[i].TextTheme = JSON.parse(componentResult[i].TextTheme)
                componentResult[i].FrameTheme = JSON.parse(componentResult[i].FrameTheme)
                // don't need to fetch data from query command
                if (!checkNeedToQueryData(componentResult[i].Type)) {
                    continue
                }
                // fetch data
                queryResult = await queryDataOfAShape(componentResult[i].QueryCommand)
                if (queryResult == null) {
                    // error to query data of this shape
                    componentResult[i].TypeParsed = "Error"
                } else {
                    try {
                        let { parseResult, _colorIndex } = parseDataQueried(componentResult[i].Type, queryResult, colorIndex)

                        colorIndex = _colorIndex
                        // parse them json data from server
                        componentResult[i] = { ...componentResult[i], ...parseResult }
                    }
                    catch (err) {
                        // eror parse
                        componentResult[i] = { Type: "Unknown" }
                    }
                }
            }
            setCurrentColorIndex(colorIndex)
            return componentResult
        }
        catch (err) {
            Store.addNotification(content("Fail", "Fetch component fail:  " + err, "danger"))
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
            // Store.addNotification(content("Fail", "Query data fail.error: " + err, "danger"))
            console.log("Query data fail. error: ", err, " \n Query Command :  ", query)
            return null
        }
    }



    // ** parse data after query complete 
    const parseDataQueried = (type, queryResult, currentIndexOfShapeColor) => {
        console.log(currentIndexOfShapeColor)
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
                            backgroundColor: arrayData[keys[0]].map((_, index) => shapeBackgroundColors[(index + currentIndexOfShapeColor) % shapeBackgroundColors.length]),
                            borderColor: arrayData[keys[0]].map((_, index) => shapeBorderColors[(index + currentIndexOfShapeColor) % shapeBorderColors.length]),
                            borderWidth: 1,
                        }
                    ]
                }
                result.pieData = pieData
                currentIndexOfShapeColor += arrayData[keys[0]].length
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
                            backgroundColor: arrayData[keys[0]].map((_, index) => shapeBackgroundColors[(index + currentIndexOfShapeColor) % shapeBackgroundColors.length]),
                            borderColor: arrayData[keys[0]].map((_, index) => shapeBorderColors[(index + currentIndexOfShapeColor) % shapeBorderColors.length]),
                            borderWidth: 1,
                        }
                    ]
                }
                currentIndexOfShapeColor += arrayData[keys[0]].length
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
                    xAxisName: keys.length > 0 ? keys[0] : "",
                    yAxisName: keys.slice(1),
                    maxIndex: arrayData[keys[1]].indexOf(Math.max(...arrayData[keys[1]])),
                    minIndex: arrayData[keys[1]].indexOf(Math.min(...arrayData[keys[1]])),
                    datasets: keys.slice(1).map((key, index) => {
                        return {
                            label: key,
                            data: arrayData[key],
                            fill: true,
                            backgroundColor: shapeBackgroundColors[(index + currentIndexOfShapeColor) % shapeBackgroundColors.length],
                            borderColor: shapeBorderColors[(index + currentIndexOfShapeColor) % shapeBorderColors.length]
                        }
                    })
                }
                currentIndexOfShapeColor += keys.length + 1
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
                    xAxisName: keys.length > 0 ? keys[0] : "",
                    yAxisName: keys.slice(1),
                    maxIndex: arrayData[keys[1]].indexOf(Math.max(...arrayData[keys[1]])),
                    minIndex: arrayData[keys[1]].indexOf(Math.min(...arrayData[keys[1]])),
                    max: Math.max(...arrayData[keys[1]]),
                    max: Math.min(...arrayData[keys[1]]),
                    labels: arrayData[keys[0]],
                    datasets: keys.slice(1).map((key, index) => {
                        return {
                            label: key,
                            data: arrayData[key],
                            fill: true,
                            backgroundColor: shapeBackgroundColors[(index + currentIndexOfShapeColor) % shapeBackgroundColors.length],
                            borderColor: shapeBorderColors[(index + currentIndexOfShapeColor) % shapeBorderColors.length]
                        }
                    })
                }
                currentIndexOfShapeColor += keys.length + 1
                break;
            default:
                console.log("Unresolve shape type : ", props.data.Type)
                break
        }
        return { parseResult: result, _colorIndex: currentIndexOfShapeColor }
    }

    // ** combine all function relative to getting content of report
    const getReportContent = async (PId, RId, isTemplate) => {
        let res = await fetchAllShapesFromServer(PId, RId, isTemplate)
        setShapeComponent(res)
        // console.log(res)
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
            if (checkNeedToQueryData(component.Type)) {
                // fetch data
                let queryResult = await queryDataOfAShape(component.QueryCommand)
                let { parseResult, _colorIndex } = parseDataQueried(component.Type, queryResult, currentColorIndex)
                setCurrentColorIndex(currentColorIndex + _colorIndex)
                if (queryResult == null) {
                    component.TypeParsed = "Error"
                } else {
                    component = { ...component, ...parseResult }
                }
            }
            component.Position = JSON.parse(component.Position)
            component.TextTheme = JSON.parse(component.TextTheme)
            component.FrameTheme = JSON.parse(component.FrameTheme)
            setShapeComponent([...shapeComponents, component])
        } catch (err) {
            Store.addNotification(content("Fail", "Adding new component error :" + err, "danger"))
            console.log("adding new component error : ", err)
        }
    }

    const updateQueryOfAComponent = async (query, name) => {
        if (followingIndexComponent == -1 || followingIndexComponent > shapeComponents.length - 1) return
        let index = followingIndexComponent
        try {
            if (checkNeedToQueryData(shapeComponents[index].Type)) {
                // fetch data
                let queryResult = await queryDataOfAShape(query)
                let { parseResult } = parseDataQueried(shapeComponents[index].Type, queryResult, 0)
                if (queryResult == null) {
                    // error to query data of this shape
                    parseResult.TypeParsed = "Error"
                } else {
                    // parse them json data from server
                    setShapeComponent([...shapeComponents.slice(0, index), { ...shapeComponents[index], ...parseResult, QueryCommand: query, Title: name }, ...shapeComponents.slice(index + 1)])
                    saveAShapeComponent({
                        ...shapeComponents[index],
                        Title: name,
                        QueryCommand: query
                    })
                }
            }

        } catch (err) {
            Store.addNotification(content("Fail", "Update a component error : " + err, "danger"))
            // console.log("update a component error : ", err)
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
            Store.addNotification(content("Fail", "Create new shape error : " + error, "danger"))
            console.log("Create new shape error : ", error)
        }
    }

    const saveAllShapeComponents = async () => {
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
                // Store.addNotification(content("Fail", "Save shape error :" + error, "danger"))
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
                Position: typeof (componentData.Position) == typeof ("") ? componentData.Position : JSON.stringify(componentData.Position),
                TitleTheme: componentData.TitleTheme,
                TextTheme: typeof (componentData.TextTheme) == typeof ("") ? componentData.TextTheme : JSON.stringify(componentData.TextTheme),
                FrameTheme: typeof (componentData.FrameTheme) == typeof ("") ? componentData.FrameTheme : JSON.stringify(componentData.FrameTheme)
            })
        } catch (error) {
            Store.addNotification(content("Fail", "Save shape error :" + error, "danger"))
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
            Store.addNotification(content("Fail", "Paste error" + err, "danger"))
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
            Store.addNotification(content("Fail", "Delete shape error : " + error, "danger"))
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
                executeWhenDragged()
                setDragAreaLocation(defaultLocation)
            })
        })
    }


    // ** when drag complete
    const executeWhenDragged = () => {
        console.log(dragAreaLocation)
        switch (addShapeType) {
            case "text":
                createTextComponent()
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
            executeWhenClickOutside(e)
        }
    }

    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

    // ** check menu status and create relative information
    const executeWhenClickOutside = (event) => {
        let rect = event.target.getBoundingClientRect();
        let pos = { x: event.clientX - rect.left, y: event.clientY - rect.top }
        setClickPosition(pos)
        switch (addShapeType) {
            case "text":
                createTextComponent(pos)
                break
            case "image":
                if (openImageRef) openImageRef.current.click()
                break
            default:
                break
        }
    }

    // ** create text component
    const createTextComponent = async (position) => {
        try {
            let newTextShape = {
                Title: "Title",
                Type: "Text",
                QueryCommand: "",
                Height: 100,
                Width: 300,
                Position: JSON.stringify(position),
                TitleTheme: "",
                TextTheme: JSON.stringify(textStyleDefault),
                FrameTheme: JSON.stringify(frameStyleDefault)
            }
            await createNewComponent(newTextShape)
        }
        catch (err) {
            Store.addNotification(content("Fail", "Create Text Error" + err, "danger"))
            console.log(err)
        }
    }

    // ** create image component
    const createImageComponent = async (position, base64data) => {
        try {
            let newImageShape = {
                Title: "Title",
                Type: "Image",
                QueryCommand: base64data,
                Height: 100,
                Width: 300,
                Position: JSON.stringify(position),
                TitleTheme: "",
                TextTheme: JSON.stringify(textStyleDefault),
                FrameTheme: JSON.stringify(frameStyleDefault)
            }
            await createNewComponent(newImageShape)
        }
        catch (err) {
            Store.addNotification(content("Fail", "Create Image Error" + err, "danger"))
            console.log(err)
        }
    }


    // ** trigger when select image complete when adding image component
    const onSelectImage = (event) => {
        let file = event.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.onloadend = function () {
                createImageComponent(clickPosition, reader.result)
            }
            reader.readAsDataURL(file);
            openImageRef.current.value = null
        }
    }


    const [listDataSourcesName, setListDataSourcesName] = useState([])

    const onChangeFocusShape = (index) => {
        if (index < shapeComponents.length && index >= 0) {
            let shapeData = shapeComponents[index]
            let tab = {
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
                    fill: shapeData.TextTheme.color,
                    stroke: shapeData.FrameTheme.color
                }
            }
            setTabData(tab)
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

    const _handleKeyDown = (key) => {
        setKeydown(prev => { return { previous: prev.current, current: key.key } })
    }


    useEffect(() => {
        if (keydown.current == "Delete") {
            deleteShape()
        } else if (keydown.previous == "Control" && (keydown.current == "C" || keydown.current == "c")) {
            copyShape()
        }
        else if (keydown.previous == "Control" && (keydown.current == "V" || keydown.current == "v")) {
            pasteShape()
        }
    }, [keydown])

    const [PName, setPName] = useState("")
    const getAllData = async ( currentProject, RId, isTemplate) => {
        setIsLoading(true)
        getReportInfo()
        getDataFields()
        await getReportContent(currentProject, RId, isTemplate)
        getInformationByPId(currentProject)
            .then(res => {
                setPName(res.data.Name)
                console.log("PName", res.data.Name)
            })
            .catch(err => {
                // setIsLoading(false)
                // Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
        if (!isTemplate) {
            getAllDatasourceNameInReport(currentProject, RId)
                .then(res => {
                    setListDataSourcesName(res.data)
                    setIsLoading(false)
                    // console.log("listdata", res.data)
                })
                .catch(err => {
                    setIsLoading(false)
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }
        else {
            getAllDatasourceNameInTemplate(RId)
                .then(res => {
                    setListDataSourcesName(res.data)
                    setIsLoading(false)
                    // console.log("listdata", res.data)
                })
                .catch(err => {
                    setIsLoading(false)
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }

    }


    useEffect(() => {
        //check state

        if (location.state == null) {
            // state is nul
            // let get some parameter to render this report in view mode
            
            return
        }
        else {
            setRId(location.state.RId)
            setCurrentProject(location.state.PId)
            setIsTemplate(location.state.Type == "Template")
            setIsEdit(location.state.Permission == "Edit" && !isTemplate)
        }
        getAllData(location.state.PId, location.state.RId, location.state.Type == "Template")

        var keydown = document.addEventListener("keydown", _handleKeyDown);
        return () => {
            document.removeEventListener("keydown", keydown)
        }
    }, [])

    // trigger on change of tabData
    // useEffect(() => {
    //     console.log(addShapeType)
    // }, [addShapeType])

    // trigger on change focus component
    useEffect(() => {
        onChangeFocusShape(followingIndexComponent);
    }, [followingIndexComponent])

    useEffect(() => {
        switch (addShapeType) {
            case "text":
                setCursor("crosshair")
                break
            case "image":
                setCursor("grabbing")
                break
            default:
                setCursor("default")
                break
        }
    }, [addShapeType])




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
                Permission: "View",
                PName: PName
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


    const takeScreenShot = async () => {
        var node = document.getElementById('bkstudiocontent')
        try {
            let dataUrl = await htmlToImage.toPng(node, { height: 1300, width: 1900 })
            return dataUrl
        } catch (error) {
            Store.addNotification(content("Fail", 'Oops, something went wrong!', "danger"))
            console.error('oops, something went wrong!', error);
            return ""
        }
    }


    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const handleCloseYes = () => {
        saveATemplateHandle()
        // console.log("close ne")
    }
    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: true })
    }

    const savePDF = async () => {
        setIsLoading(true)
        try {
            let imgData = await takeScreenShot()
            const pdf = new jsPDF('l', 'mm', [297, 210])
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', -50, -20, width + 40, height)
            var blob = pdf.output("blob");
            window.open(URL.createObjectURL(blob));
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            Store.addNotification(content("Warning", "Please try again", "warning"))
        }
    }

    const EditUI = () => {
        return <div style={{ cursor: cursor }}>
            <input ref={openImageRef} type={"file"} style={{ display: "none" }} accept="image/*" onChange={(e) => {
                onSelectImage(e)
            }} />
            <div>
                {/* some popup */}
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    title="Are you sure you want to save this report as template ?"
                    handleCloseYes={() => handleCloseYes()}
                    handleCloseNo={() => handleCloseNo()}
                />
                <SqlPopUp
                    type={popUpType}
                    show={showSqlPopUp}
                    handleClose={() => {
                        setShowSqlPopUp(false)
                    }}
                    onComplete={buildQueryComplete}
                    dataSource={dataSource}
                />

                <ShareWithPopUp
                    currentProject={currentProject}
                    RId={RId}
                    show={showSharePopUp}
                    handleOpen={() => {
                        setShowSharePopUp(true)
                    }}
                    handleClose={() => {
                        setShowSharePopUp(false)
                    }}
                />
                <ShareLinkPopUp
                    reportLink={reportLink}
                    show={showShareLinkPopUp}
                    handleOpen={() => {
                        setShowShareLinkPopUp(true)
                    }}
                    handleClose={() => {
                        setShowShareLinkPopUp(false)
                    }}

                />
            </div>
            <div className=" row m-0 p-0">
                <div className="col-2 m-0 p-0"></div>
                <div className="col-2 rightColumn customFontBold size22"
                // onClick={() => {
                //     nav(`/pDetail/${currentProject}`)
                // }}
                >
                    {localStorage.getItem("currentProjectName") ? localStorage.getItem("currentProjectName") + ": " : ""}
                </div>
                <div className="col-8 "></div>
            </div>
            <div className="row">

                <TabComponent
                    EditStyle={EditStyle}
                    data={tabData}
                    dataSource={dataSource}
                    updateQueryOfAComponent={updateQueryOfAComponent}
                />
                <div className="col-10 h-200">
                    <div className="rightColumn p-2">
                        <div className="row m-0 p-0">
                            <div className="col-7 m-0 p-0">
                                <div className="row m-0 p-0" >
                                    <div className="col-1 m-0 p-0 mt-1">
                                        <button type="button" class="btn btn-sm" onClick={() => { nav(-1) }}>
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
                            OpenSharePopUp={() => setShowSharePopUp(true)}
                            OpenShareLinkPopUp={() => setShowShareLinkPopUp(true)}
                            addShapeType={addShapeType}
                            setAddShapeType={setAddShapeType}
                            isEdit={isEdit}
                            saveACopyHandle={() => saveACopyHandle()}
                            saveATemplateHandle={() => handleOpen()}
                            savePDF={savePDF}
                        />

                        <div className="content"
                            id="bkstudiocontent"
                            onClick={(e) => triggerClickContentBackground(e)}
                            ref={contentWrappingBox}
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
        </div >
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
                // console.log("thanhcong", res.data)
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
                props.handleClose()
            })
    }

    const ViewPageUI = () => {
        return <div>
            <div className="row">
                <div className=" row ">
                    <div className="col-2 rightColumn customFontBold size22 ">
                        <div className="ms-3">{localStorage.getItem("currentProjectName") ? localStorage.getItem("currentProjectName") + ": " : ""}
                        </div>
                    </div>
                    <div className="col-10 "></div>
                </div>
                <div className="leftColumn p-3">
                    <div className="row m-0 p-0">
                        <div className="col-8 m-0 p-0">
                            <div className="row m-0 p-0" >
                                <div className="col-1 m-0 p-0 mt-1">
                                    <button type="button" class="btn btn-sm" onClick={() => { nav(-1) }}>
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
                                    <div className="col">{ reportInformation.LastModified ? reportInformation.LastModified.substring(0, 10) : ""} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    }

    return (
        <div className="bg-light">
            {
                isEdit === true ? EditUI() : ViewPageUI()
            }
        </div>
    )
}
