import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Message } from '../types/Common';
import { clearMessage } from '../store/actions/messageActions';

const MessageSnackbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
    const messages = useSelector((state: RootState) => state.messages); // Assume this is the state for messages
    const dispatch = useDispatch();

    useEffect(() => {
        if (messages.length > 0) {
            setCurrentMessage(messages[0]);
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [messages]);

    const handleClose = () => {
        if (!currentMessage) return;
        dispatch(clearMessage(currentMessage.id as string));
        setCurrentMessage(null);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={currentMessage?.severity || 'info'}>
                {currentMessage?.text}
            </Alert>
        </Snackbar>
    );
};

export default MessageSnackbar;
