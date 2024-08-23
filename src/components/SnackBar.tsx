import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearError } from '../store/actions/errorActions';
import { Error } from '../types/Common';

const ErrorSnackbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [currentError, setCurrentError] = useState<Error | null>(null);
    const errors = useSelector((state: RootState) => state.error.errors);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errors.length > 0) {
            setCurrentError(errors[0]);
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [errors]);

    const handleClose = () => {
        if(!currentError) return;
        dispatch(clearError(currentError.id as string));
        setCurrentError(null);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error">
                {currentError?.error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
