import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { content } from "utils/notification"
import { Store } from 'react-notifications-component'

import BlankReportIcon from 'resources/icons/blankReport.svg'
import { Mode } from '@mui/icons-material'
import ModelCard from './component/ModelCard'
export default function ML() {
    const nav = useNavigate()
    return (
        <div>
            <div className='m-2 mt-4 mb-4'>
                <h2 class="ms-4 mt-1 customFontBold PrimaryFontColor size40" >
                    Sample Model
                </h2>
            </div>
            <div className='bg-white p-3'>
                <div>
                    <h3 class="ms-4 mt-1 customFontBold SecondFontColor size40" >
                        Create a new model
                    </h3>
                    <button
                        style={{ height: "120px", width: "120px" }}
                        className=' ms-4 btn btn-lg btn-default m-2  shadow p-3 mb-5 bg-body rounded'
                        onClick={() => {
                            // newReport()
                        }}>
                        <img src={BlankReportIcon} width="180px" height="180px" />
                    </button>
                </div>
                <div>
                    <h3 class="ms-4 mt-1 customFontBold SecondFontColor size40" >
                        Models
                    </h3>

                </div>
                <div className='row m-0 p-0 justify-content-center'>
                    {/* {reports.map(ele =>
                        <div className='col m-0 p-0' style={{ "minWidth": "600px", "maxWidth": "600px" }} >
                            <div className='ms-4 mt-5 pe-4'>
                                <ReportCard data={ele} type="Template" />
                            </div>
                        </div>
                    )} */}
                    <div className='col m-0 p-0'>
                        <ModelCard minwidth="200px" minheight="400px" />
                    </div>
                    <div className='col m-0 p-0'>
                        <ModelCard width="200px" height="200px" />
                    </div>
                    <div className='col m-0 p-0'>
                        <ModelCard width="200px" height="200px" />
                    </div>
                    <div className='col m-0 p-0'>
                        <ModelCard width="200px" height="200px" />
                    </div>
                </div>
            </div></div>
    )
}
