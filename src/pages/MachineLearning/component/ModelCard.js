import React from 'react'
import ML from "resources/icons/ML.svg"
export default function ModelCard() {
    return (
        <div className='row m-2 p-4  shadow border border-light' style={{ "borderRadius": "20px" }}>
            <div className='col-2'>
                <img src={ML} height="100%" width="100%" />
            </div>
            <div className='col-10 m-auto'>
                <div className='SecondFontColor customFontBold size20 '>Classifying Online Shopper Intention</div>
                <div className='mt-3 size18'>Data source: online_shopper_intention</div>
            </div>
        </div>
    )
}
