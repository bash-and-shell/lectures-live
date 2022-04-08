import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const JoinDialog = (props) => {
  const [showDialog, setShowDialog] = useState(false)

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div style={{height: '100%'}}>
      <Button fullWidth variant="contained" onClick={handleShowDialog} endIcon={<InfoOutlinedIcon />} sx={{ height: '100%' }}>
        Display Join Info
      </Button>
      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Please enter this code to join the room"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.room}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

JoinDialog.propTypes = {
  room: PropTypes.string.isRequired
}