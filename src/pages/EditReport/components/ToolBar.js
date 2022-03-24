import React from 'react'
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

import CircleModel from './AddShapeModel/CircleModel';
import TableModel from './AddShapeModel/TableModel';

import './css/toolbar.css'
export default function ToolBar(props) {
    return (
        <div>
            <div className="m-auto row toolbar-container" style={{ zIndex: 10 }}>
                <button className="col m-0 p-0 btn" style={{ "minHeight": "50px" }}>
                    <img src={plus} width="20px" height="20px" />
                    <p className="p-0 m-0 text-center">add data</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={dataBoard} width="20px" height="20px" />
                    <p className="p-0 m-0 text-center">add databoard</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={addImage} width="20px" height="20px" />
                    <p className="p-0 m-0">add image</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={addText} width="20px" height="20px" />
                    <p className="p-0 m-0">add text</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <CustomDropdownButton title="add shape" icon={addShape} items={["Doughnut", "Table"]} onClick={(val) => {
                        // openModal(val)
                    }} />
                    {/* <CircleModel show={modelState["Doughnut"]} handleClose={() => { closeModal("Doughnut") }} dataSource={props.dataSource} addShape={props.addShape} />
                    <TableModel show={modelState["Table"]} handleClose={() => { closeModal("Table") }} dataSource={props.dataSource} addShape={props.addShape} /> */}
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={undo} width="20px" height="20px" />
                    <p className="p-0 m-0">undo</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={redo} width="20px" height="20px" />
                    <p className="p-0 m-0">redo</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={comment} width="20px" height="20px" />
                    <p className="p-0 m-0">comment</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        props.saveAsACopy()
                    }}>
                    <img src={copy} width="20px" height="20px" />
                    <p className="p-0 m-0">create a copy</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={save} width="20px" height="20px" />
                    <p className="p-0 m-0">save</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={share} width="20px" height="20px" />
                    <p className="p-0 m-0">share</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={shareWith} width="20px" height="20px" />
                    <p className="p-0 m-0">share with</p>
                </button>
            </div>
        </div>
    )
}
