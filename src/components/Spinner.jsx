import * as React from 'react';
import { useSelector } from 'react-redux';

// material
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// selector
import { isLoadingSelector } from 'state/app/appSelector';

export default function SimpleBackdrop() {
  const isLoading = useSelector(isLoadingSelector);
  
  const handleClose = () => {
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
