import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { fetchRequests } from "../api/requests/thunks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Request } from "../types/Request";

function Requests() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requests: Request[] = useSelector((state: RootState) => state.requests);
    const [sortedRequests, setSortedRequests] = useState<Request[]>([]);
    const [sortBy, setSortBy] = useState<'dispatch-date' | 'creation-date'>('dispatch-date');
    
    // Sort by creation date
    const sortByCreationDate = (requests: Request[]) => {
        return [...requests].sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return dateB - dateA; // Descending order, latest first
        });
    };
    
    // Sort by dispatch date
    const sortByDispatchDate = (requests: Request[]) => {
        return [...requests].sort((a, b) => {
            const dateA = new Date(a.dispatchDate).getTime();
            const dateB = new Date(b.dispatchDate).getTime();
            return dateB - dateA; // Descending order, latest first
        });
    };
    
    // Apply sorting whenever the requests array or sortBy changes
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
    }, []);

    const handleSortToggle = () => {
        setSortBy(prevSortBy => prevSortBy === 'creation-date' ? 'dispatch-date' : 'creation-date');
    };

    return (
        <>
            {/* Sort buttons above the table */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', marginTop: '2rem' }}>
            <IconButton onClick={handleSortToggle} aria-label="sort">
                <SortIcon />
            </IconButton>
            </div>

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
                                <TableCell>{request.description}</TableCell>
                                <TableCell>{new Date(request.createdAt as string).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Requests;