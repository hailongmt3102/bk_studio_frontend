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
          {props.title}
        </DialogTitle>
        {
          props.haveContent === true ? <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className='text-center'>{props.content}</div>
            </DialogContentText>
          </DialogContent> : null
        }
        {
          props.haveOK === true ? <DialogActions>
            <Button onClick={props.handleCloseNo} autoFocus>
              OK
            </Button>


          </DialogActions> : <DialogActions>
            <Button onClick={props.handleCloseNo} autoFocus>
              No
            </Button>
            <Button onClick={props.handleCloseYes}>Yes</Button>

          </DialogActions>
        }


      </Dialog>
    </div>
  );
}