import React from 'react'
import { Link } from 'react-router-dom'
import BlankReportIcon from 'resources/icons/blankReport.svg'

export default function CreateReport() {
    return (
        <div>
            <div className='m-2 mt-4 mb-4'>
                <h1>Create a report</h1>
            </div>
            <div className='bg-white p-3'>
                <div>
                    <h2>From a blank</h2>
                    <Link to="/project/gallery/1/edit">
                        <button className='btn btn-default m-2 p-2 shadow p-3 mb-5 bg-body rounded'>
                            <img src={BlankReportIcon} />
                        </button>
                    </Link>
                </div>
                <div>
                    <h2>From a template</h2>
                </div>
            </div>
        </div>
    )
}
