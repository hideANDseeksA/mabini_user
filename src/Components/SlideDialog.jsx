import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SlideDialog = ({
  open,
  onClose,
  title,
  content,
  actions,
  transitionComponent = Transition,
  keepMounted = true,
  ariaDescription = 'alert-dialog-slide-description',
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={transitionComponent}
      keepMounted={keepMounted}
      onClose={onClose}
      aria-describedby={ariaDescription}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          padding: { xs: '16px', sm: '24px' },
          width: { xs: '90%', sm: 'auto' },
          maxWidth: '600px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: 'center',
          }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          textAlign: 'center',
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      >
        {typeof content === 'string' ? (
          <DialogContentText id={ariaDescription}>
            {content}
          </DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{
            justifyContent: 'center',
            padding: { xs: '8px', sm: '16px' },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default SlideDialog;