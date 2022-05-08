import { useEffect, useState } from 'react'

import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { useLocation } from "react-router-dom"
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import edit from "resources/icons/edit.svg"
import share_blue from "resources/icons/share_blue.svg"
import { GetDataSourcesListInformationInWorkSpace, GetSampleDataSource } from '../../api/DataSources'
import ShareDataSourcesPopUp from "../DataSources/component/ShareDataSourcesPopUp"
import DataSourceBox from './component/DataSourceBox'
export default function DataSources() {
    const location = useLocation()
    const isModel = location.state ? location.state.isModel : false

    const [datasourceslist, setDatasourceslist] = useState([])
    const [sampleList, setSampleList] = useState([])


    const [showSharePopUp, setshowSharePopUp] = useState(false)
    // const currentProject = localStorage.getItem("currentProject")

    useEffect(() => {
        // console.log("Lấy data nè")
        // get list people

        GetSampleDataSource()
            .then(res => {
                setSampleList(res.data)
                //console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        GetDataSourcesListInformationInWorkSpace()
            .then(res => {
                setDatasourceslist(res.data)
                //console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    const option_list = ["Share", "Rename", "Download", "Delete"]
    const icon_list = [share_blue, edit, download_blue, delete_icon]
    const sample_option_list = ["Download"]
    const sample_icon_list = [download_blue]

    const showSharePopUpHandle = (DId) => {
        setshowSharePopUp(true)
        setDId(DId)
    }
    const [DId, setDId] = useState(-1)
    return (
        <div>
            <ShareDataSourcesPopUp
                type="Workspace"
                show={showSharePopUp}
                handleOpen={() => {
                    setshowSharePopUp(true)
                }}
                handleClose={() => {
                    setshowSharePopUp(false)
                }}
                DId={DId}
            />

            <h2 class="ms-5 PrimaryFontColor size40 customFontBold" > Datasources:</h2>
            <div className='bg-white'>
                <div className='row'>
                    <h1 className='ps-5 ms-3 mt-4 customFontBold SecondFontColor' >User Sources</h1>
                    <div className='row mt-4 m-0 p-0'>
                        <ScrollMenu>
                            {datasourceslist.map((ele, index) => (
                                <div className='ms-4 mb-5' style={{ "minWidth": "350px" }}>
                                    <DataSourceBox
                                        isModel={isModel}
                                        option_list={option_list}
                                        icon_list={icon_list}
                                        setDatasourceslist={setDatasourceslist}
                                        datasourceslist={datasourceslist}
                                        showSharePopUpHandle={showSharePopUpHandle}
                                        ele={ele}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </ScrollMenu>
                    </div>
                </div>
                <div className='row mt-3 '>
                    <h1 className='ps-5 ms-3 customFontBold SecondFontColor' >Samples</h1>
                    <div className='row mt-4 m-0 p-0'>
                        <ScrollMenu>
                            {sampleList.map((ele, index) => (
                                <div className='ms-4 mb-5'>
                                    <DataSourceBox
                                        isModel={isModel}
                                        option_list={sample_option_list}
                                        icon_list={sample_icon_list}
                                        setDatasourceslist={setDatasourceslist}
                                        datasourceslist={datasourceslist}
                                        showSharePopUpHandle={showSharePopUpHandle}
                                        ele={ele}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </ScrollMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}
