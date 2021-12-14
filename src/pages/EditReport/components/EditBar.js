import React, { useState, useCallback, useEffect } from 'react'
import CustomDropdownButton from './CustomDropdownButton'

import plus from "resources/icons/plus.svg";
import dataBoard from "resources/icons/dataBoard.svg";
import addImage from "resources/icons/addImage.svg";
import addText from "resources/icons/addText.svg";
import addShape from "resources/icons/addShape.svg";
import undo from "resources/icons/undo.svg";
import redo from "resources/icons/redo.svg";
import comment from "resources/icons/comment.svg";
import copy from "resources/icons/copy.svg";
import save from "resources/icons/save.svg";
import share from "resources/icons/share.svg";
import shareWith from "resources/icons/addPeople.svg";
import view from "resources/icons/eye.svg";
import CircleModel from './addShapeModel/CircleModel';
import TableModel from './addShapeModel/TableModel';

export default function EditBar(props) {

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
    return (
        <div>
            <div className="col">
                <div className="col-6">
                    <div className="row">
                        <button className="col-1 btn">File</button>
                        <button className="col-1 btn">Edit</button>
                        <button className="col-1 btn">View</button>
                        <button className="col-1 btn">Insert</button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-8 row">
                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={plus}></img>
                            <p className="p-0 m-0">add data</p>
                        </button>
                    </div>

                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={dataBoard}></img>
                            <p className="p-0 m-0">add databoard</p>
                        </button>
                    </div>

                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={addImage}></img>
                            <p className="p-0 m-0">add image</p>
                        </button>
                    </div>

                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={addText}></img>
                            <p className="p-0 m-0">add text</p>
                        </button>
                    </div>

                    <div className="col-1 p-0">
                        <CustomDropdownButton title="add shape" icon={addShape} items={["Doughnut", "Table"]} onClick={(val) => {
                            openModal(val)
                        }} />
                        <CircleModel show={modelState["Doughnut"]} handleClose={() => { closeModal("Doughnut") }} dataSource={props.dataSource} addShape={props.addShape} />
                        <TableModel show={modelState["Table"]} handleClose={() => { closeModal("Table") }} dataSource={props.dataSource} addShape={props.addShape} />
                    </div>

                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={undo}></img>
                            <p className="p-0 m-0">undo</p>
                        </button>

                    </div>

                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={redo}></img>
                            <p className="p-0 m-0">redo</p>
                        </button>
                    </div>

                    <div className="col-1 p-0">
                        <button className="btn">
                            <img src={comment}></img>
                            <p className="p-0 m-0">comment</p>
                        </button>
                    </div>
                </div>

                {/* <div className="col-2"></div> */}

                <div className="col-4 row">
                    <div className="col-2 p-0">
                        <button className="btn">
                            <img src={copy}></img>
                            <p className="p-0 m-0">create a copy</p>
                        </button>
                    </div>

                    <div className="col-2 p-0">
                        <button className="btn">
                            <img src={save}></img>
                            <p className="p-0 m-0">save</p>
                        </button>
                    </div>

                    <div className="col-2 p-0">
                        <button className="btn">
                            <img src={share}></img>
                            <p className="p-0 m-0">share</p>
                        </button>
                    </div>

                    <div className="col-2 p-0">
                        <button className="btn">
                            <img src={shareWith}></img>
                            <p className="p-0 m-0">share with</p>
                        </button>
                    </div>
                    <div className='col-1'></div>

                    <div className="col p-1">
                        <button className="btn btn-success">
                            <div className="row">
                                <img className="col" src={view}></img>
                                <p className="col p-0 mx-2 m-auto">view </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
