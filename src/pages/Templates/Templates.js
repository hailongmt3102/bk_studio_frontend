import { getAllTemplate } from "api/Templates"
import { loadingContext } from 'App'
import ReportCard from "components/ReportCard/ReportCard"
import { useContext, useEffect, useState } from 'react'
import { Store } from 'react-notifications-component'
import { localizationContext } from '../../App'
import { deep_blue_primary } from "../../utils/color"
import { content } from "../../utils/notification"
export default function Template(props) {
    const localization = useContext(localizationContext)
    const [reports, setReports] = useState([])
    const setIsLoading = useContext(loadingContext)


    const deleteAReport = (index) => {
        setReports([...reports.slice(0, index), ...reports.slice(index + 1)])
    }
    useEffect(() => {
        setIsLoading(true)
        getAllTemplate()
            .then(res => {
                console.log(res.data)
                setReports(res.data.reverse())
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                Store.addNotification(content("Fail", err.response.data, "danger"))
                return
            })
    }, [])

    return (
        <div>
            <h2 class="ms-4 mt-2 PrimaryFontColor" style={{ "fontWeight": "bold", fontSize: "40px" }}>
                {localization.templates}
            </h2>

            <div className='customforeground'>
                <div className='row m-0 p-0 justify-content-center'>
                    {reports.map((ele, index) =>
                        <div className='col m-0 p-0' style={{ "minWidth": "600px", "maxWidth": "600px" }} >
                            <div className='ms-4 mt-5 pe-4'>
                                <ReportCard data={ele} type="Template" deleteAReport={() => deleteAReport(index)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}