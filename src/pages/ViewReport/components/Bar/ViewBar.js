import React from 'react'
import { Link } from 'react-router-dom'

export default function ViewBar() {
    return (
        <div>
            <Link to='edit'>
                <button className='btn btn-primary'>Edit report</button>
            </Link>
        </div>
    )
}
