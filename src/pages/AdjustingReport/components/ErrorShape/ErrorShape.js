import React from 'react'

import warning from "resources/icons/warning.svg"

export default function ErrorShape() {
    return (
        <div>
            <div className='row justify-content-center'>
                Can't build
            </div>
            <div className='row'>
                <img src={warning} />
            </div>

        </div>
    )
}
