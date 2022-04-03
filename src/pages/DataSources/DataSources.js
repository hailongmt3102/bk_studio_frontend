import React, { useEffect, useState } from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { Form } from 'react-bootstrap'
import add_round from "resources/icons/add_round.svg"
import edit from "resources/icons/edit.svg"
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"
import excel_icon from "resources/icons/excel_icon.svg"

import three_dot from "resources/icons/three-dot.svg"
import { orange } from "../../utils/color"
import ThreeDotButton from 'components/ThreeDotButton'
import CustomDropdownButton from 'pages/EditReport/components/CustomDropdownButton'
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import { Rename, GetDataSourcesListInformationInWorkSpace, deleteDatasource } from '../../api/DataSources'



const orangeStyle = {
    color: "#FF7F0D",
}
const option_list = ["Share", "Rename", "Download", "Delete"]

export default function DataSources() {
    const [datasourceslist, setDatasourceslist] = useState([])
    useEffect(() => {
        console.log("Lấy data nè")
        // get list people
        GetDataSourcesListInformationInWorkSpace()
            .then(res => {
                setDatasourceslist(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const deleteHandle = (id) => {
        deleteDatasource(id)
            .then(res => {
                Store.addNotification(content("Success", "Deleted Datasource", "success"))
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(err => {
                Store.addNotification(content("Fail", "Delete Fail", "danger"))
                console.log(err.response.data)
            })
    }

    const RenameHandle = (id,newname) => {
        Rename(id, {
            "newName":newname
        })
            .then(res => {
                console.log(res.data)
                Store.addNotification(content("Success", "Renamed", "success"))
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(err => {
                Store.addNotification(content("Fail", "Rename Fail", "danger"))
                console.log(err.response.data)
            })
    }
    const [pressRename, setPressRename] = useState(false)
   
    const setNewName = (value, index) => {
        setDatasourceslist([...datasourceslist.splice(0,index), {...datasourceslist[index],Information: value}, ...datasourceslist.splice(index+1) ])
        
    }
    return (
        <div>
            <div className='d-flex flex-row pt-2'>

                <h2 class="ms-4 mt-1" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> Data Sources:</h2>
                <button className='btn btn-default btn-lg ms-3 p-0'
                    onClick={() => {
                        //setShowPModel(true)
                    }}
                >
                    <img src={add_round} width="40px" height="40px" />
                </button>



            </div>

            <div className='row bg-light'>
                <div className='col-6 m-4 bg-white'>
                    <h1 className='m-2 mt-4' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>User Sources</h1>
                    <div className='row'>
                        {
                            datasourceslist.map((ele, index) => {
                                return <div className='col-3 ms-4 mt-3 pt-2 mb-5' style={{ "height": "200px", width: "400px", "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
                                    <div className='row ms-3' style={{ "paddingLeft": "310px" }}>
                                        <ThreeDotButton title={'adđ'}
                                            items={option_list}
                                            icon={three_dot}
                                            icons_list={[share_blue, edit, download_blue, delete_icon]}
                                            onClick={(val) => {
                                                if (val == "Delete") {
                                                    deleteHandle(ele.Id)
                                                }
                                                else if (val === "Rename") {
                                                    setPressRename(true)
                                                }
                                            }} />
                                    </div>
                                    <div className="row m-0 p-0">
                                        <div className="col-4 m-0 p-0" style={{ fontFamily: "Roboto" }}>
                                            <img src={excel_icon} height="120px" width="100%" />
                                        </div>
                                        <div class="col-8 m-0 p-0" style={{ fontFamily: "Roboto" }}>
                                            <div class="row m-0 p-0" style={{ fontFamily: "Roboto", color: blue_cloud, fontSize: "28px" }}>
                                                {
                                                    pressRename == false ? <p><span>{ele.Information}</span></p> : 
                                                    // <newNameTextField/>
                                                        <Form.Group className='m-0 p-0 ms-2 pe-2'>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder=""
                                                                value={ele.Information}
                                                                onChange={(e) => {
                                                                    setNewName(e.target.value, index)
                                                                }}
                                                            />
                                                        </Form.Group>
                                                }
                                            </div>
                                            <div class="row  m-0 p-0 mt-1" style={{ fontFamily: "Roboto" }}>
                                                <p><span style={{ "color": "#868585" }}>date created: </span>{ele.CreateTime}</p>
                                            </div>
                                            <div class="row m-0 p-0" style={{ fontFamily: "Roboto" }}>
                                                <p><span style={{ "color": "#868585" }}>last modified: </span>{ele.LastModified}</p>
                                            </div>
                                            {
                                                pressRename == false ? null :
                                                    <div className='d-flex justify-content-center'>
                                                        <button
                                                            onClick={() => {
                                                                RenameHandle(ele.Id, ele.Information)
                                                            }} type="button" class="btn btn-primary btn-sm">
                                                            Save
                                                        </button>
                                                    </div>
                                            }
                                           
                                        </div>

                                    </div>
                                </div>
                            })

                        }
                    </div>
                </div>
                <div className='col-5 m-4 bg-white'>

                    <h1 className='m-2 mt-4' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Sample</h1>
                    {/* <div className='col-3 ms-4 mt-3 pt-2' style={{ "height": "190px", width: "370px", "border-radius": "20px", "backgroundColor": "#F7F7F7" }}>
                        <div className='row' style={{ "paddingLeft": "310px" }}>

                            <ThreeDotButton title={'adđ'} items={option_list} icon={three_dot} onClick={(val) => { }} />
                        </div>
                        <div className="row ms-2">
                            <div class="col-2 d-flex me-3 ms-2" style={{ fontFamily: "Roboto" }}>
                                <img src={excel_icon} />
                            </div>
                            <div class="col-5 ms-4 text-center" style={{ fontFamily: "Roboto" }}>
                                <div class="col-4" style={{ fontFamily: "Roboto", color: blue_cloud }}>
                                    <h2>Iris.csv</h2>
                                </div>
                                <div class="col-5 mt-1" style={{ fontFamily: "Roboto" }}>
                                    datecreated:10/10/2021
                                </div>
                                <div class="col-5" style={{ fontFamily: "Roboto" }}>
                                    lastmodified:10/10/2021
                                </div>


                            </div>

                        </div>
                    </div> */}

                </div>

            </div>
        </div>

    )
}