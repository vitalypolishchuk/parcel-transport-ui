import { useEffect, useState } from "react";
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import { deleteRequest, editRequest, fetchRequests } from "../api/requests/thunks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Request } from "../types/Request";

function Requests() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requests: Request[] = useSelector((state: RootState) => state.requests);
    const [sortedRequests, setSortedRequests] = useState<Request[]>([]);
    const [sortBy, setSortBy] = useState<'dispatch-date' | 'creation-date'>('creation-date');
    const [openDialog, setOpenDialog] = useState(false);
    const [editRequestData, setEditRequestData] = useState<{ id: string, description: string } | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const sortByCreationDate = (requests: Request[]) => {
        return [...requests].sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return dateB - dateA;
        });
    };

    const sortByDispatchDate = (requests: Request[]) => {
        return [...requests].sort((a, b) => {
            const dateA = new Date(a.dispatchDate).getTime();
            const dateB = new Date(b.dispatchDate).getTime();
            return dateB - dateA;
        });
    };

    useEffect(() => {
        let sortedRequests: Request[] = [];
        if (sortBy === 'creation-date') {
            sortedRequests = sortByCreationDate(requests);
        } else {
            sortedRequests = sortByDispatchDate(requests);
        }
        setSortedRequests(sortedRequests);
    }, [requests, sortBy]);

    useEffect(() => {
        fetchRequests(navigate, dispatch);
    }, [dispatch, navigate]);

    const handleOpenDialog = (id: string, description: string) => {
        setEditRequestData({id, description});
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setEditRequestData(null);
        setOpenDialog(false);
    };

    const handleDeleteRequest = async (id: string) => {
        await deleteRequest(id, navigate, dispatch)
    };

    const handleSaveRequest = async () => {
        await editRequest(editRequestData!.id, editRequestData!.description, navigate, dispatch)
        handleCloseDialog();
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Request Type</TableCell>
                            <TableCell>From City</TableCell>
                            <TableCell>To City</TableCell>
                            <TableCell>Parcel Type</TableCell>
                            <TableCell>
                                <Button onClick={() => setSortBy('dispatch-date')}>
                                    Dispatch Date
                                </Button>
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>
                                <Button onClick={() => setSortBy('creation-date')}>
                                    Creation Date
                                </Button>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRequests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{request.requestType}</TableCell>
                                <TableCell>{request.fromCity}</TableCell>
                                <TableCell>{request.toCity}</TableCell>
                                <TableCell>{request.parcelType || 'N/A'}</TableCell>
                                <TableCell>{new Date(request.dispatchDate).toLocaleDateString()}</TableCell>
                                <TableCell>{request.description || 'N/A'}</TableCell>
                                <TableCell>{new Date(request.createdAt as string).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenDialog(request.id, request.description)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteRequest(request.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Request</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Description"
                        value={editRequestData?.description || ''}
                        onChange={(e) => setEditRequestData((prev) => ({...prev, description: e.target.value} as { id: string, description: string }))}
                        fullWidth
                    />
                    {/* Add other fields as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveRequest}>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
}

export default Requests;
