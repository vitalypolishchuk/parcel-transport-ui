import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const validatePassword = (password: string) => {
        if(password.length < 6) return { error: "Password must be at least 6 characters length" }
        return { error: "" }
    };

    const handleSubmit = (e: React.FormEvent) => {
        try{
            e.preventDefault();
            const { error } = validatePassword(password);
            if(error.length){
                setPasswordError(error);
                return;
            }
            console.log({email, password});

            setEmail('');
            setPassword('');
            setPasswordError('');
            setSubmitError('');
        } catch(error: any){
            setSubmitError(error.message)
        }   
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}>
            <Container component="main" maxWidth="xs">
                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item>
                        <Typography component="h1" variant="h5">
                        Sign Up
                        </Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                            {submitError && <Typography color="error">{submitError}</Typography>}
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
                                Sign Up
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default SignUp;