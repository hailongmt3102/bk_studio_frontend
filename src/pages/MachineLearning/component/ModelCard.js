import ML from "resources/icons/ML.svg"
import { useNavigate } from 'react-router-dom'
import edit from 'resources/icons/edit.svg'
import delete_icon from 'resources/icons/delete.svg'
import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from "../../../components/ThreeDotButton"
import React, { useContext } from 'react'
import { localizationContext } from 'App'
export default function ModelCard(props) {
    const localization = useContext(localizationContext)
    const nav = useNavigate()
    const option_list = ["Rename", "Delete"]
    const icons_list = [edit, delete_icon]
    return (
        <div className='m-2  p-3 shadow border border-light level1 ' style={{ "borderRadius": "20px" }}>
            <div className="row text-end">
                <ThreeDotButton
                    title={'adđ'}
                    items={option_list}
                    icons_list={icons_list}
                    icon={three_dot}
                    onClick={(val) => {
                        if (val === 'Delete'){
                            props.deleteModel(props.info.Id)
                        }
                    }} />
            </div>
            <div className="row p-4">
                <div className='col-3 m-auto'>
                    <img src={ML} onClick={() => {
                        nav("/machinelearning/modelDetail/" + props.info.Id, {
                            state: {
                                MId: props.info.Id,
                                input: props.info.Input,
                                output: props.info.Output,
                                MName: props.info.Name,
                                Api: props.info.Api,
                            }
                        })
                    }} height="120px" width="120px" />
                </div>
                <div className='col-9 m-auto'>
                    <div className='ms-5 SecondFontColor customFontBold size30'>{props.info.Name}</div>
                    <div className=' mt-3 ms-5 size18'><span>{localization.createBy} </span> {props.info.Author.slice(0, 18)}...</div>
                    <div className='ms-5 size18 pb-4'><span>{localization.lastModi}  </span> {props.info.LastModified && props.info.LastModified.substring(0, 10)}</div>

                </div>
            </div>
        </div>
    )
}
