import React, { useRef, useState , useCallback } from 'react'

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
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import CircleModel from './AddShapeModel/CircleModel';

export default function EditBar(props) {
    // variable for add shape button
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    const onSubmit = (query) => {
        console.log(query)
    }
    //
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
                <div className="col-6 row">
                    <div className="col p-0">
                        <button className="btn">
                            <img src={plus}></img>
                            <p className="p-0 m-0">add data</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={dataBoard}></img>
                            <p className="p-0 m-0">add databoard</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={addImage}></img>
                            <p className="p-0 m-0">add image</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={addText}></img>
                            <p className="p-0 m-0">add text</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <DropdownMenu
                            trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
                                <button className='btn'
                                    type="button"
                                    {...providedProps}
                                    ref={triggerRef}
                                >
                                    <img src={addShape}></img>
                                    <p className="p-0 m-0">add shape</p>
                                </button>
                            )}
                        >
                            <DropdownItemGroup>
                                <DropdownItem onClick={openModal}>Doughnut chart</DropdownItem>
                            </DropdownItemGroup>
                        </DropdownMenu>

                        <CircleModel isOpen={isOpen} closeModal={closeModal} dataSource={props.dataSource} addShape={props.addShape}/>

                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={undo}></img>
                            <p className="p-0 m-0">undo</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={redo}></img>
                            <p className="p-0 m-0">redo</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={comment}></img>
                            <p className="p-0 m-0">comment</p>
                        </button>
                    </div>
                </div>

                <div className="col-2"></div>

                <div className="col-4 row">
                    <div className="col p-0">
                        <button className="btn">
                            <img src={copy}></img>
                            <p className="p-0 m-0">create a copy</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={save}></img>
                            <p className="p-0 m-0">save</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={share}></img>
                            <p className="p-0 m-0">share</p>
                        </button>
                    </div>

                    <div className="col p-0">
                        <button className="btn">
                            <img src={shareWith}></img>
                            <p className="p-0 m-0">share with</p>
                        </button>
                    </div>

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
