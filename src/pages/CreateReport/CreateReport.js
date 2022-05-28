import { createNewReport as CreateReportApi } from 'api/Report'
import { getAllTemplate } from "api/Templates"
import ReportCard from "components/ReportCard/ReportCard"
import { useEffect, useState } from 'react'
import { Store } from 'react-notifications-component'
import { useNavigate } from 'react-router-dom'
import BlankReportIcon from 'resources/icons/blankReport.svg'
import { content } from "utils/notification"
export default function CreateReport() {
    const nav = useNavigate()
    const [reports, setReports] = useState([])
    useEffect(() => {
        getAllTemplate()
            .then(res => {
                console.log(res.data)
                setReports(res.data)
            })
            .catch(err => {
                Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
    }, [])
    const newReport = () => {
        let currentProjectId = localStorage.getItem("currentProject")
        if (currentProjectId != null) {
            CreateReportApi(currentProjectId,
                {
                    Hastag: "",
                    Description: "example",
                    Name: "New Report"
                }
            )
                .then(res => {
                    console.log(res.data.status)
                    nav('/project/gallery/' + res.data.Id + '/edit', {
                        state: {
                            PId: currentProjectId,
                            Type: "Report",
                            RId: res.data.Id,
                            Permission: 'Edit'
                        }
                    })
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))

                })
        } else {
            Store.addNotification(content("Warning", "You must create project first", "warning"))

        }
    }
    return (
        <div>
            <div className='m-2 mb-4'>
                <h5 className='ms-4 mt-2 size22 customFontBold'>{localStorage.getItem("currentProjectName") ? localStorage.getItem("currentProjectName") + ":" : ""}</h5>
                <h2 class="ms-4 mt-1 customFontBold PrimaryFontColor size40" >
                    Create a report
                </h2>
            </div>
            <div className='customforeground p-3'>
                <div>
                    <h3 class="ms-4 mt-1 customFontBold SecondFontColor size40" >
                        From a blank
                    </h3>
                    <button style={{ height: "120px", width: "120px" }} className=' ms-4 btn btn-lg btn-default m-2  shadow p-3 mb-5 level2 rounded' onClick={() => {
                        newReport()
                    }}>
                        <img src={BlankReportIcon} width="180px" height="180px" />
                    </button>
                </div>
                <div>
                    <h3 class="ms-4 mt-1 customFontBold SecondFontColor size40" >
                        From a template
                    </h3>

                </div>
                <div className='row m-0 p-0 justify-content-center'>
                    {reports.map(ele =>
                        <div className='col m-0 p-0' style={{ "minWidth": "600px", "maxWidth": "600px" }} >
                            <div className='ms-4 mt-5 pe-4'>
                                <ReportCard data={ele} type="Template" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
