import React, { useState } from 'react';
import { Button, TextField, MenuItem, Typography } from '@mui/material';
import '../styles/Create.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../store/actions/errorActions';
import { RootState } from '../store/store';

const apiUrl = process.env.REACT_APP_API_URL;

interface CreateRequestProps {
  requestType: 'order' | 'delivery';
}

const CreateRequest: React.FC<CreateRequestProps> = ({ requestType }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [parcelType, setParcelType] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    try{
      event.preventDefault(); 
        const requestResponse = await fetch(`${apiUrl}/request/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_email: userInfo.email,
          request: {
            request_type: requestType,
            from_city: fromCity,
            to_city: toCity,
            parcel_type: parcelType,
            dispatch_date: dispatchDate,
            description
          }
        })
    });

    const requestData = await requestResponse.json();
    if("error" in requestData) throw new Error(requestData.error);

    setFromCity('');
    setToCity('');
    setParcelType('');
    setDispatchDate('');
    setDescription('');

    console.log(requestData);
    } catch(error){
      dispatch(setError({ error: error instanceof Error ? error.message : "Something went wrong" }))
    }    
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '1000px', marginTop: '2rem', marginInline: 'auto' }}>
      <Typography component='h1' variant='h5' style={{ marginBottom: '1rem' }}>
        Create {requestType === 'order' ? 'Order' : 'Delivery'} Request
      </Typography>

      <TextField
        label='City From'
        value={fromCity}
        onChange={(e) => setFromCity(e.target.value)}
        required
      />
      <TextField
        label='City To'
        value={toCity}
        onChange={(e) => setToCity(e.target.value)}
        required
      />
      {requestType === 'order' && (
        <>
          <TextField
            select
            label='Parcel Type'
            value={parcelType}
            onChange={(e) => setParcelType(e.target.value)}
            required
          >
            <MenuItem value='Gadgets'>Gadgets</MenuItem>
            <MenuItem value='Drinks'>Drinks</MenuItem>
            <MenuItem value='Clothes'>Clothes</MenuItem>
            <MenuItem value='Medicines'>Medicines</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </TextField>
          <TextField
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </>
      )}
      <TextField
        type='date'
        label='Date of Dispatch'
        value={dispatchDate}
        onChange={(e) => setDispatchDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button type='submit' variant='contained'>
        Submit
      </Button>
    </form>
  );
};

export default CreateRequest;
