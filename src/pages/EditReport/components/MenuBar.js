import React, { useState, useCallback, useEffect } from 'react'
import ThreeDotButton from 'components/ThreeDotButton'
import view from "resources/icons/eye.svg";
import save_white from "resources/icons/save_white.svg";
export default function MenuBar(props) {

    // variable for add shape button
    const [modelState, setModelState] = useState({
        "Doughnut": false,
        "Table": false
    })
    const openModal = (name) => {
        setModelState({ ...modelState, [name]: true })
    };
    const closeModal = (name) => {
        setModelState({ ...modelState, [name]: false })
    };
    const option_list = ["Edit Project", "Delete Project"]
    return (
        <div>
            <div className="row justify-content-center m-0 p-0">
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        <ThreeDotButton className="col-1 p-4 btn" style={{ "minHeight": "80px", "text-align": "center" }} title={'File'} items={option_list} onClick={(val) => {
                        }} />
                    </div>
                </div>
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        <ThreeDotButton className="col-1 p-4 btn" style={{ "minHeight": "80px", "text-align": "center" }} title={'Edit'} items={option_list} onClick={(val) => {
                        }} />
                    </div>
                </div>
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        <ThreeDotButton className="col-1 p-4 btn" style={{ "minHeight": "80px", "text-align": "center" }} title={'View'} items={option_list} onClick={(val) => {
                        }} />
                    </div>
                </div>
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        <ThreeDotButton className="col-1 p-4 btn" style={{ "minHeight": "80px", "text-align": "center" }} title={'Insert'} items={option_list} onClick={(val) => {
                        }} />
                    </div>
                </div>
                <div className='col-5 m-0 p-0'></div>
                <div className='col-3 m-0 p-0'>
                    <button className='btn-lg btn-success text-center border-0 ms-5'>
                        <div className='row p-2 text-center'>
                            <div className='col-2 text-center me-1'>
                                <img src={view} width="20px" height="20px" />
                            </div>
                            <div className='col-9'>
                                <div className='col-2'>View</div>
                            </div>
                        </div>
                    </button>
                    <button className='btn-lg btn-success text-center border-0 ms-3' style={{ backgroundColor: "#3B97C6" }}
                        onClick={() => { }}>
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
            <hr></hr>

        </div >
    )
}
