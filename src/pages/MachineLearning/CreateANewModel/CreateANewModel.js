import { useState } from 'react';
import { Form } from 'react-bootstrap';
import save_white from "resources/icons/save_white.svg";
export default function CreateANewModel(props) {

    const [model, setModel] = useState({
        Name: "Name",
        Link: "abc.com"
    })
    return (
        <div>
            <div className='row m-2 mt-4 mb-4'>
                <div class="col  mt-1 customFontBold PrimaryFontColor size40" >
                    Create a new Model
                </div>
                <div className='col text-end'>
                    <button className='btn-lg btn-success text-center border-0' style={{ backgroundColor: "#3B97C6" }}
                    // onClick={() => { props.updateSubmit() }}
                    >
                        <div className='row p-2 text-center'>
                            <div className='col-2 text-center me-1'>
                                <img src={save_white} width="20px" height="20px" />
                            </div>
                            <div className='col-9  text-center'>
                                <div className='col-2'>Save</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className="row">
                    <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Name
                    </div>
                    <div className='col ms-4 mt-1 me-5'>
                        <Form.Control size="lg" type="text" value={model.Name} onChange={(event) => {
                            setModel({ ...model, Name: event.target.value })
                        }}
                            className="border-0"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Link API
                    </div>
                    <div className='col ms-4 mt-1 me-5'>
                        <Form.Control size="lg" type="text" value={model.Link} onChange={(event) => {
                            setModel({ ...model, Link: event.target.value })
                        }}
                            className="border-0"
                        />
                    </div>
                </div>
                <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Input:
                </div>
                <div className='ms-4 mt-1 customFontBold SecondFontColor size40'>
                    Output:
                </div>
            </div>
        </div >
    )
}
