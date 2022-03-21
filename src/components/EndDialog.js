import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ClearIcon from '@mui/icons-material/Clear';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EndDialog = (props) => {
  const [showDialog, setShowDialog] = useState(false)

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSaveSession = () => {
    handleCloseDialog()
    saveSession()
  }

  return (
    <div style={{height: '100%'}}>
      <Button 
      color='error' variant="contained" endIcon={<ClearIcon />}
      fullWidth onClick={handleShowDialog}  sx={{ height: '100%' }}>
        End Session
      </Button>
      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"End Session"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will end the current session now and save all collected data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleCloseDialog} endIcon={<ClearIcon />}>Cancel</Button>
          <Button color='success' onClick={handleSaveSession} endIcon={<SaveOutlinedIcon />}>End and Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EndDialog.propTypes = {
  handleSaveSession: PropTypes.func.isRequired,
}