import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Gallery(props) {
    useEffect(() => {
        // load page
        props.setState("project")
    }, [])


    return (
        <div>
            <h1>Gallery page</h1>
            <Link to={"1"}> report 1</Link>
        </div>
    )
}
