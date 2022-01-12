import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import ReportImg from 'resources/images/report.png'

export default function Gallery(props) {
    return (
        <div>
            <h1>Report Gallery</h1>
            <div className='bg-white m-2 p-4'>
                <Link to={"1"}>
                    <img src={ReportImg} />
                </Link>
            </div>

        </div>
    )
}
