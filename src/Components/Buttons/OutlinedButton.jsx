import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const OutlinedButton = styled(Button)({
    color: 'black',
    border: '1px solid black', // Explicit border definition
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      border: '1px solid black' // Must redefine for hover state
    }
  });

export default OutlinedButton;

