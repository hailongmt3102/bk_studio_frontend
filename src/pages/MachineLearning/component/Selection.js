import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import { Button } from 'react-bootstrap';
export default function Selection(props) {
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <div
        ><Dialog
            open={props.showDialog}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                {/* <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle> */}
                <DialogContent className='p-5'>
                    <div className='row'>

                        <Button variant="outline-primary"
                            onClick={() => {
                                props.selectDataSource()
                            }}
                        >
                            <div className='p-3'>Select from Data sources</div>
                        </Button>
                    </div>
                    <div className='row mt-3'>

                        <Button variant="outline-primary" onClick={() => {
                            props.openFile()
                        }}
                        >
                            <div className='p-3'>Import data</div>
                        </Button>
                    </div>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={props.handleCloseNo} autoFocus>
                        No
                    </Button>
                    <Button onClick={props.handleCloseYes}>Yes</Button>

                </DialogActions> */}
            </Dialog></div>
    )
}
