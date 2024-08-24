import { Button, Container, Grid, TextField, Typography } from '@mui/material';

interface FormType {
    formType: 'Sign Up' | 'Sign In';
    email: string;
    password: string;
    handleSubmit: (e: React.FormEvent) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    emailError: string;
    passwordError: string;
    submitError: string;
}

const Form: React.FC<FormType> = ({ formType, email, password, handleSubmit, setEmail, setPassword, emailError, passwordError, submitError }) => {
    return (
        <Container component="main" maxWidth="xs">
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <Typography component="h1" variant="h5">
                    {formType}
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
                            error={!!emailError}
                            helperText={emailError}
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
                            {formType}
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Form;