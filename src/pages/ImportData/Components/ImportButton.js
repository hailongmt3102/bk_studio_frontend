import React from 'react'
import './ImportButton.css'

export default function ImportButton(props) {
    return (
        <button className='btn import_button' style={{"minWidth":"240px", minHeight:"100px"}} onClick={()=>{props.onClick()}}>
            <div className='row'>
                <div className='col-4'>
                    <img src={props.image}/>
                </div>
                <div className='col-8 m-auto text-start' style={{"fontSize": 20}}>
                    {props.text}
                </div>
            </div>
        </button>
    )
}
