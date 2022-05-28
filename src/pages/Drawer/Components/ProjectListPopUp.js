import React, { useState, useEffect } from 'react'
import ConfirmDialog from "components/ConfirmDialog";
import { getListProject } from 'api/Project';
import { Store } from 'react-notifications-component'
import { content } from "utils/notification"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SwitchSvg from 'resources/icons/drawerIcons/switch.svg'
import CheckedSvg from 'resources/icons/drawerIcons/checked.svg'
export default function ProjectListPopUp(props) {
    console.log(props.projectList)
    console.log("cur", props.curProject, props)
    return (
        <div>
            <Dialog
                maxWidth="lg"
                open={props.showPopUp}
                onClose={props.handleCloseNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className='size22 PrimaryFontColor customFontBold'>{props.title}</div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            props.projectList.map((ele) =>
                                <div className='row text-center mt-4' style={{ width: "300px" }}>
                                    <div className='col'>{ele.Name}</div>
                                    <div className='col'>{ele.Id == props.curProject ?
                                        <img width="20px" height="20px" src={CheckedSvg} /> :
                                        <img width="20px" height="20px" src={SwitchSvg}
                                            onClick={() => {
                                                localStorage.setItem("currentProject", ele.Id)
                                                props.setCurrentProject(ele.Id)
                                            }}
                                        />
                                    }
                                    </div>
                                </div>)
                        }
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    )
}
