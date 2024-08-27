import { useNavigate } from 'react-router-dom';
import '../styles/Create.scss';
import { Button, Typography } from "@mui/material";

const SelectRequest: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "2rem" }}>
            <Typography component='h1' variant="h5" style={{ marginBottom: "1rem" }}>
                Please select request type
            </Typography>
            <div className='create-button-group'>
                <Button onClick={() => navigate('order')} className='create-button-order' variant="contained" style={{ marginRight: "50px" }}>Order</Button>
                <Button onClick={() => navigate('delivery')} className='create-button-delivery' variant="contained">Delivery</Button>
            </div>
        </div>
    )
}

export default SelectRequest;