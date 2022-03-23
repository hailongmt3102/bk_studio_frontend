import React from 'react'
import default_report_img from "../resources/icons/default_report_img.svg"


export default function ReportCard(props) {
    return (
        <div className="row m-0 p-0 mt-4 mb-4  shadow border border-light" style={{"borderRadius":"20px"}}>
            <div className='col m-0 p-0' >
                <img src={default_report_img} height="300" width="300"/>
            </div>
            <div className='col m-auto m-0 p-0'>
                <div className='row'>
                    {props.data.Hastag}
                </div>
                <div className='row'>
                    Id: {props.data.Id}
                </div>
                <div className='row'>
                    Created by: {props.data.Author.slice(0,20)}...
                </div>
                <div className='row'>
                    Created Date: {props.data.CreateTime}
                </div>
                <div className='row'>
                    Modified Date: {props.data.LastModified}
                </div>
            </div>
        </div>
    )
}
