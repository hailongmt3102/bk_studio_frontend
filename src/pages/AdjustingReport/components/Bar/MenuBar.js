import React, { useState } from 'react'
import ThreeDotButton from 'components/ThreeDotButton'
import view from "resources/icons/eye.svg";
import undo from "resources/icons/undo.svg";
import redo from "resources/icons/redo.svg";
import new_file from "resources/icons/new_file.svg";
import keo from "resources/icons/keo.svg";
import copy from "resources/icons/copy.svg";
import save_grey from "resources/icons/save_grey.svg";
import save from "resources/icons/save.svg";
import paste from "resources/icons/paste.svg";
import save_white from "resources/icons/save_white.svg";
import open_file from "resources/icons/open_file.svg";
import remove_file from "resources/icons/remove_file.svg";
import done_round from "resources/icons/done_round.svg";
import upload from "resources/icons/upload.svg";
import bar_chart from "resources/icons/bar_chart.svg";
import pie_chart from "resources/icons/pie_chart.svg";
import scat from "resources/icons/scat.svg";
import table from "resources/icons/table.svg";
import edit_grey from "resources/icons/edit_grey.svg";
import print from "resources/icons/print.svg";
import linechart from "resources/icons/linechart.svg";
import donut from "resources/icons/donut.svg";
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
    const file_option = ['New', 'Save', 'Delete']
    // lam them download nếu dc
    const file_option_icon_list = [new_file, save_grey, remove_file]
    const edit_option_icon_list = [copy, paste, done_round]
    const edit_option = ['Copy', 'Paste', 'Delete']
    const function_option = ['SUM', 'MAX', 'MIN', 'AVERAGE']
    const insert_option = ['Table', 'Bar Chart', 'Pie Chart', 'Doughnut Chart', 'Line Chart', 'Scatter Chart']
    const insert_option_icon_list = [table, bar_chart, pie_chart, donut, linechart, scat]


    return (
        <div>
            <div className="row justify-content-center m-0 p-0">
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        {
                            props.isEdit ?
                                <ThreeDotButton className="col-1 p-4 btn" style={{ "minHeight": "80px", "text-align": "center" }} title={'File'} items={file_option} icons_list={file_option_icon_list} onClick={(val) => {
                                    if (val == "New") {
                                        props.newFileHandle()
                                    }
                                    else if (val == "Save") {
                                        props.saveHandle()
                                    }
                                    else if (val == "Delete") {
                                        props.deleteHandle()
                                    }
                                }} />
                                : <button className='btn'>File</button>
                        }
                    </div>
                </div>
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        {
                            props.isEdit ?
                                <ThreeDotButton
                                    className="col-1 p-4 btn"
                                    style={{ "minHeight": "80px", "text-align": "center" }}
                                    title={'Edit'}
                                    items={edit_option}
                                    icons_list={edit_option_icon_list}
                                    onClick={(val) => {
                                        switch (val) {
                                            case 'Copy':
                                                props.copyShape()
                                                break;
                                            case 'Paste':
                                                props.pasteShape()
                                                break
                                            case 'Delete':
                                                props.deleteShape()
                                                break
                                            default:
                                                break
                                        }
                                    }} />
                                : <button className='btn'>File</button>
                        }
                    </div>
                </div>
                {/* <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        {
                            props.isEdit ?
                                <ThreeDotButton className="col-1 p-4 btn" style={{ "minHeight": "80px", "text-align": "center" }} title={'Function'} items={function_option} onClick={(val) => {
                                }} />
                                : <button className='btn'>File</button>
                        }
                    </div>
                </div> */}
                <div className='col-1' >
                    <div className='mt-3 ms-2'>
                        {
                            props.isEdit ?
                                <ThreeDotButton c
                                    lassName="col-1 p-4 btn"
                                    style={{ "minHeight": "80px", "text-align": "center" }}
                                    title={'Insert'}
                                    items={insert_option}
                                    icons_list={insert_option_icon_list}
                                    onClick={(val) => {
                                        props.showSqlPopUpFunction(val)
                                        props.componentTypeHandle(val)
                                    }} />
                                : <button className='btn'>File</button>
                        }
                    </div>
                </div>
                <div className='col-5 m-0 p-0'></div>
                <div className='col-3 m-0 p-0'>
                    <button className='btn-lg btn-success text-center border-0 ms-5'
                        onClick={() => { props.switchToViewModeHandle() }}>
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
                        onClick={() => { props.updateSubmit() }}>
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
