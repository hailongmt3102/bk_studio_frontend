import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ConfirmDialog(props) {
    return (
        <div>
            <Dialog
                open={props.confirmDialog.isOpen}
                onClose={props.handleCloseNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className='size22'>{props.title}</div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        <div className='text-center customFontBold size22'>{props.content}</div>
                        <div className='mt-5 mb-5'>
                            <span className=" size22">If you don't receive email: {" "}
                                <a className="PrimaryFontColor customFontBold size22" onClick={props.handleCloseYes}>Resend me</a>
                            </span>
                        </div>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    
                </DialogActions> */}



            </Dialog>
        </div>
    );
}