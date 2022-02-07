import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'


export default function Header() {
    var url = useLocation().pathname
    const [visible, setVisible] = useState(true)

    useEffect(() => {

    })
    return (
        <div className='row'>
            <div className='col-10'>
            </div>
            <div className='col-2'>
                
            </div>
        </div>
    );

}
