import React, { useEffect, useState, useRef } from 'react'

import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { GetDataSourcesListInformationInWorkSpace } from '../../api/DataSources'
import DataSourceBox from './component/DataSourceBox'
import add_round from "resources/icons/add_round.svg"
import edit from "resources/icons/edit.svg"
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"
import { useLocation, useNavigate } from "react-router-dom";
import ShareDataSourcesPopUp from "../DataSources/component/ShareDataSourcesPopUp"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
export default function DataSources() {
    const [datasourceslist, setDatasourceslist] = useState([])
    const location = useLocation().pathname
    let RId = location.split('/')[3]
    const [showSharePopUp, setshowSharePopUp] = useState(false)
    const currentProject = localStorage.getItem("currentProject")
    useEffect(() => {
        // console.log("Lấy data nè")
        // get list people
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
                    <h1 className='ps-5 pt-4 customFontBold SecondFontColor' >User Sources</h1>
                        <div className='row mt-4 m-0 p-0'>
                            <ScrollMenu>
                                {datasourceslist.map((ele, index) => (
                                        <div className='ms-4'>
                                            <DataSourceBox
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
                <div className='row mt-3'>
                    <h1 className='ps-5 customFontBold SecondFontColor' >Samples</h1>
                    <div className='row mt-4 m-0 p-0'>
                        <ScrollMenu>  
                            {datasourceslist.map((ele, index) => (
                                <div className='ms-4'>
                                    <DataSourceBox
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
            </div>
            </div>
                    
                
            
     
           
       

    )
}
// import React, { useEffect, useState } from 'react'

// import { blue_cloud } from "../../utils/color"
// import { deep_blue_primary } from "../../utils/color"
// import avt_people from "resources/icons/avt_people.svg"


// import PeopleCard from "components/PeopleCard/PeopleCard"


// import { getListPeople } from '../../api/People'


// export default function DataSources() {

//     let getEmail = localStorage.getItem("email") ?? ""
//     //console.log(getEmail)
//     const [people, setPeople] = useState([])
//     useEffect(() => {
//         // get list people

//         getListPeople()
//             .then(res => {
//                 setPeople(res.data)
//                 console.log(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })

//     }, [])
//     return (
//         <div>
//             <h2 class="ms-4" style={{ color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> People:</h2>
//             <div className='rounded-5 bg-white'>
//                 <div className='row m-0 p-0 bg-light'>
//                     <div className='col-4 m-0 p-0 '>
                        

//                     </div>
//                     <div className='col-8 m-0 p-0' >
                       

//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }