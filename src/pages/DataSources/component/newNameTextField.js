import React ,{ useState }from 'react'
import { Form } from 'react-bootstrap'
export default function newNameTextField(props) {


   // const [newName, setNewName] = useState("")
    return (
        <div> <Form.Group className='m-0 p-0 ms-2 pe-2'>
            <Form.Control
                type="text"
                placeholder=""
                // value={newName}
                // onChange={(e) => {
                //     setNewName(e.target.value)
                // }}
            />
        </Form.Group></div>
    )
}
