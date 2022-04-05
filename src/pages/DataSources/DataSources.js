import React, { useEffect, useState } from 'react'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import { GetDataSourcesListInformationInWorkSpace } from '../../api/DataSources'
import DataSourceBox from './component/DataSourceBox'
import add_round from "resources/icons/add_round.svg"
import edit from "resources/icons/edit.svg"
import delete_icon from "resources/icons/delete.svg"
import download_blue from "resources/icons/download_blue.svg"
import share_blue from "resources/icons/share_blue.svg"

const orangeStyle = {
    color: "#FF7F0D",
}


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
    const option_list = ["Share", "Rename", "Download", "Delete"]
    const icon_list = [share_blue, edit, download_blue, delete_icon]
    return (
        <div>
            <div className='d-flex flex-row pt-2'>

                <h2 class="ms-4 mt-1" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> Data Sources:</h2>
                {/* <button className='btn btn-default btn-lg ms-3 p-0'
                    onClick={() => {
                        //setShowPModel(true)
                    }}
                >
                    <img src={add_round} width="40px" height="40px" />
                </button> */}



            </div>

            <div className='row bg-light'>
                <div className='col-6 m-4 bg-white'>
                    <h1 className='m-2 mt-4' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>User Sources</h1>
                    <div className='row'>
                        {
                            datasourceslist.map((ele, index) => {
                                return <DataSourceBox
                                    option_list={option_list}
                                    icon_list={icon_list}
                                    setDatasourceslist={setDatasourceslist}
                                    datasourceslist={datasourceslist}
                                    ele={ele}
                                    index={index} />
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