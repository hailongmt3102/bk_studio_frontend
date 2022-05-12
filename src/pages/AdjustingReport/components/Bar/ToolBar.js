import React from 'react'

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



import "./css/toolbar.css"
export default function ToolBar(props) {
    return (
        <div>
            <div className="m-auto row toolbar-container" style={{ zIndex: 10 }}>
                <button
                    className="col m-0 p-0 btn"
                    style={{ "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit)
                            props.setAddShapeType("none")
                    }}
                >
                    <img src={plus} width="20px" height="20px" />
                    <p className="p-0 m-0 text-center">add data</p>
                </button>
                <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit)
                            props.setAddShapeType("none")
                    }}
                >
                    <img src={dataBoard} width="20px" height="20px" />
                    <p className="p-0 m-0 text-center">add chart</p>
                </button>
                <button
                    className={props.addShapeType == "image" ? "col m-0 p-0 btn btn-sm customshine" : "col m-0 p-0 btn btn-sm"}
                    onClick={() => {
                        if (props.isEdit)
                            props.setAddShapeType("image")
                    }}
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                >
                    <img src={addImage} width="20px" height="20px" />
                    <p className="p-0 m-0">add image</p>
                </button>
                <button
                    className={props.addShapeType == "text" ? "col m-0 p-0 btn btn-sm customshine" : "col m-0 p-0 btn btn-sm"}
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit)
                            props.setAddShapeType("text")
                    }}
                >
                    <img src={addText} width="20px" height="20px" />
                    <p className="p-0 m-0">add text</p>
                </button>
                {/* <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit)
                            props.setAddShapeType("none")
                    }}
                >

                </button> */}
                {/* <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={undo} width="20px" height="20px" />
                    <p className="p-0 m-0">undo</p>
                </button>
                <button className="col m-0 p-0 btn btn-sm" style={{ "minWidth": "80px", "minHeight": "50px" }}>
                    <img src={redo} width="20px" height="20px" />
                    <p className="p-0 m-0">redo</p>
                </button> */}
                <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit) {
                            props.saveATemplateHandle()
                            props.setAddShapeType("none")
                        }
                    }}>
                    <img src={comment} width="20px" height="20px" />
                    <p className="p-0 m-0">save as template</p>
                </button>
                <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit) {
                            props.saveACopyHandle()
                            props.setAddShapeType("none")
                        }
                    }}>
                    <img src={copy} width="20px" height="20px" />
                    <p className="p-0 m-0">create a copy</p>
                </button>
                <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit)
                            props.setAddShapeType("none")
                    }}
                >
                    <img src={save} width="20px" height="20px" />
                    <p className="p-0 m-0">save</p>
                </button>
                <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit) {
                            props.OpenShareLinkPopUp()
                            props.setAddShapeType("none")
                        }
                    }}
                >
                    <img src={share} width="20px" height="20px" />
                    <p className="p-0 m-0">share</p>
                </button>
                <button
                    className="col m-0 p-0 btn btn-sm"
                    style={{ "minWidth": "80px", "minHeight": "50px" }}
                    onClick={() => {
                        if (props.isEdit) {
                            props.OpenSharePopUp()
                            props.setAddShapeType("none")
                        }
                    }}
                >
                    <img src={shareWith} width="20px" height="20px" />
                    <p className="p-0 m-0">share with</p>
                </button>
            </div>
        </div>
    )
}
