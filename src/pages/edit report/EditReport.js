import React from 'react'
import './EditReport.css'

import plus from 'resources/icons/plus.svg'
import dataBoard from 'resources/icons/dataBoard.svg'
import addImage from 'resources/icons/addImage.svg'
import addText from 'resources/icons/addText.svg'
import addShape from 'resources/icons/addShape.svg'
import undo from 'resources/icons/undo.svg'
import redo from 'resources/icons/redo.svg'
import comment from 'resources/icons/comment.svg'
import copy from 'resources/icons/copy.svg'
import save from 'resources/icons/save.svg'
import share from 'resources/icons/share.svg'
import shareWith from 'resources/icons/addPeople.svg'
import view from 'resources/icons/eye.svg'





export default function EditReport() {
    return (
        <div>
            <div className="row">
                <div className="col-2 bg-info"> menu</div>
                <div className="col-10">
                    <div className="rightColumn p-3">
                        <h2>My report</h2>
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
                                    <button className="btn">
                                        <img src={addShape}></img>
                                        <p className="p-0 m-0">add shape</p>
                                    </button>
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
                                        <img src={shareWith }></img>
                                        <p className="p-0 m-0">share with</p>
                                    </button>
                                </div>

                                <div className="col p-1">
                                    <button className="btn btn-success">
                                        <div className="row">
                                        <img className="col" src={view }></img>
                                        <p className="col p-0 mx-2 m-auto">view  </p>
                                        </div>
                                        
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className="m-2 content">

                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}
