import React from 'react'
import './ImportButton.css'

export default function ImportButton(props) {
    return (
        <button className='btn import_button'>
            <div className='row'>
                <div className='col-4'>
                    <img src={props.image}/>
                </div>
                <div className='col-8 m-auto fs-5'>
                    {props.text}
                </div>
            </div>
        </button>
    )
}
