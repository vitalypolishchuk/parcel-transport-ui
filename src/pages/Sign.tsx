import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleLogin } from '../api/auth/thunks';
import { RootState } from '../store/store';
import { setMessage } from '../store/actions/messageActions';

const apiUrl = process.env.REACT_APP_API_URL;

const Sign: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const isSignUp = location.pathname === '/signup';

    useEffect(() => {
        if(userInfo?.email) navigate('/requests');
    }, [userInfo]);

    const validatePassword = (password: string) => {
        if(password.length < 6) return { error: "Password must be at least 6 characters length" }
        return { error: "" }
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try{
            e.preventDefault();
            const { error } = validatePassword(password);
            if(!isValidEmail(email)) return setEmailError('Email is invalid!');
            if(emailError) setEmailError(''); // if email was fixed, remove the error
            if(error.length) return setPasswordError(error);

            if (isSignUp) {
                // Handle registration
                const response = await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();
                if ('error' in data) {
                    throw new Error(data.error);
                };
            } else {
                const loginResponse = await handleLogin(email, password, dispatch);
                if("error" in loginResponse) return;
                navigate('/requests');
            }

            setEmail('');
            setPassword('');
            setPasswordError('');
            setSubmitError('');

            
            if(isSignUp) {
                dispatch(setMessage({ text: "Successfully registered. Please log in", severity: 'success'}))
                navigate('/signin');
            }
        } catch(error: any){
            const err = error instanceof Error ? error.message : "Something went wrong"
            dispatch(setMessage({ text: err, severity: 'error' }));
        }   
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}>
           <Form 
           formType={isSignUp ? "Sign Up" : "Sign In"}
           email={email} 
           password={password} 
           handleSubmit={handleSubmit} 
           setEmail={setEmail} 
           setPassword={setPassword} 
           emailError={emailError} 
           passwordError={passwordError} 
           submitError={submitError} 
           />
        </div>
    )
}

export default Sign;