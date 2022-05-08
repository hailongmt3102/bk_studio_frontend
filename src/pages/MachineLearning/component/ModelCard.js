import ML from "resources/icons/ML.svg"
import { useNavigate } from 'react-router-dom'
export default function ModelCard(props) {
    const nav = useNavigate()
    return (
        <div className='m-2  p-4 shadow border border-light' style={{ "borderRadius": "20px" }}>
            <div className="row p-4">
                <div className='col-2'>
                    <img src={ML} onClick={() => {
                        nav("/machinelearning/modelDetail/" + props.info.Id, {
                            state: {
                                "DId": props.info.TestId
                            }
                        })
                    }} height="100%" width="100%" />
                </div>
                <div className='col-10 m-auto'>
                    <div className='ms-4 SecondFontColor customFontBold size40'>{props.info.Name}</div>
                    <div className='ms-4 mt-3 size18'><span>Test data source: </span> {props.info.TestName}</div>
                    <div className='ms-4 size18'><span>Modified Date: </span> {props.info.LastModified}</div>
                    <div className='ms-4 size18'><span>Created By: </span> {props.info.Author}</div>
                </div>
            </div>
        </div>
    )
}
