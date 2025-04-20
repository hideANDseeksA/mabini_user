import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Your existing styled button
const BlackContainedButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
  '&:active': {
    backgroundColor: '#555',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[600],
  }
}));

// New LoadingButton component that uses BlackContainedButton
export const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <BlackContainedButton
      {...props}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {children}
    </BlackContainedButton>
  );
};

// Keep exporting the base button as default
export default BlackContainedButton;