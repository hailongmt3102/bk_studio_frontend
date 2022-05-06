import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import back from "resources/icons/back_round_deep_blue.svg";
import Selection from "../component/Selection";
export default function TestModel() {
    const nav = useNavigate()
    const [showDialog, setShowDialog] = useState(false)
    const handleOpen = () => {
        setShowDialog(true)
    }
    const handleClose = () => {
        setShowDialog(false)
    }
    return (

        <div>
            <Selection showDialog={showDialog} />

            <div className="row ms-2 m-0 p-0" >
                <div className="col-5">
                    <div className="row">
                        <div className="col-1 m-0 p-0 mt-1">
                            <button type="button" class="btn btn-sm" onClick={() => { nav(-1) }}>
                                <img src={back} />
                            </button>
                        </div>
                        <div className="col-10 m-0 p-0" >
                            <div className="ms-1 PrimaryFontColor customFontBold size32"> Sample Model</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className='row'>
                    <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Test data:
                    </div>
                    <div className='col'>
                        <button className=' btn-lg btn-success text-center border-0' style={{ backgroundColor: "#3B97C6" }}
                            onClick={() => { setShowDialog(true) }}
                        >
                            <div className='row p-2 text-center'>
                                <div className='col-9  text-center'>
                                    <div className='col-2'>Change</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col ms-4 mt-1 customFontBold SecondFontColor size40'>
                        Output:
                    </div>
                    <div className='col'>
                        <button className=' btn-lg btn-success text-center border-0 p-3' style={{ backgroundColor: "#3B97C6" }}
                        // onClick={() => { props.updateSubmit() }}
                        >
                            <div>Save as datasource</div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
