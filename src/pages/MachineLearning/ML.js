import { getAllModel } from 'api/ML_API'
import { localizationContext } from 'App'
import { useContext, useEffect, useState } from 'react'
import { Store } from 'react-notifications-component'
import { useNavigate } from 'react-router-dom'
import BlankReportIcon from 'resources/icons/blankReport.svg'
import { content } from "utils/notification"
import ModelCard from './component/ModelCard'
export default function ML() {
    const nav = useNavigate()
    const [modelList, setModelList] = useState([])
    const localization = useContext(localizationContext)
    useEffect(
        () => {
            getAllModel()
                .then(res => {
                    setModelList(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    Store.addNotification(content("Fail", err.response.data, "danger"))
                    return
                })
        }, []
    )
    return (
        <div>
            <div className='m-2 mt-4 mb-4'>
                <h2 class="ms-4 mt-1 customFontBold PrimaryFontColor size40" >
                    {localization.sampleModel}
                </h2>
            </div>
            <div className='customforeground p-3'>
                <div>
                    <h3 class="ms-4 mt-1 customFontBold SecondFontColor size40" >
                        {localization.createModel}
                    </h3>
                    <button
                        style={{ height: "120px", width: "120px" }}
                        className=' ms-4 btn btn-lg btn-default m-2  shadow p-3 mb-5 level2 rounded'
                        onClick={() => {
                            nav("/machinelearning/modelDetail/" + 5 + "/edit", {
                                state: {
                                    MId: 5,
                                    input: "",
                                    output: "",
                                    MName: "New model",
                                    Api: ""
                                }
                            })
                        }}>
                        <img src={BlankReportIcon} width="180px" height="180px" />
                    </button>
                </div>
                <div>
                    <h3 class="ms-4 mt-1 customFontBold SecondFontColor size40" >
                        {localization.models}
                    </h3>

                </div>
                <div className='row m-0 p-0 justify-content-center'>
                    {modelList.map(ele =>
                        <div className='col m-0 p-0' style={{ "minWidth": "600px", "maxWidth": "600px" }} >
                            <div className='ms-4 mt-4'>
                                <ModelCard info={ele} />
                            </div>
                        </div>
                    )}


                </div>
            </div></div>
    )
}
