import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Modal, Box, Typography, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setLoadingEmail(true);

        setTimeout(() => {
            const emailRegex = /^[^\s@]+@[mabinicolleges.edu]+\.[ph]+$/;
            if (!emailRegex.test(value)) {
                setEmailError('Please enter your institution email address.');
            } else {
                setEmailError('');
            }
            setLoadingEmail(false);
        }, 800);
    };



    const find = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email); // use the actual email value
    
            const response = await axios.post('https://tryme-production.up.railway.app/api/finduser', formData);
    
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Found',
                    text: response.data.message, // e.g., "Email Exists"
                    timer: 1500,
                    showConfirmButton: false,
                    
                });
                navigate('/otp', { state: { email: email,mode:"forgot"} });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.detail || 'Failed to check email.',
            });
        }
    };
    

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setLoadingPassword(true);

        setTimeout(() => {
            const passwordRegex = /^.{8,}$/;
            if (!passwordRegex.test(value)) {
                setPasswordError('Password must be at least 8 characters.');
            } else {
                setPasswordError('');
            }
            setLoadingPassword(false);
        }, 800);
    };

    const handleSignIn = async () => {
        if (!email) {
            Swal.fire('Sign In Failed', 'Email is required.', 'error');
            return;
        }
        if (emailError) {
            Swal.fire('Sign In Failed', 'Please correct your email.', 'error');
            return;
        }
        if (!password) {
            Swal.fire('Sign In Failed', 'Password is required.', 'error');
            return;
        }
        if (passwordError) {
            Swal.fire('Sign In Failed', 'Please correct your password.', 'error');
            return;
        }
    
        setLoginLoading(true);
    
        try {
            const response = await axios.post('https://tryme-production.up.railway.app/api/login', {
                email,
                password,
            });
        
            const student_id = parseInt(response.data.user.student_id, 10);
        
            // Fetch enrollments
            const enrollmentsResponse = await axios.get(`https://tryme-production.up.railway.app/enrollments/${student_id}`);
        
            // Store in localStorage
            localStorage.setItem('enrollments', JSON.stringify(enrollmentsResponse.data));
        
            setLoginLoading(false);
        
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back!',
                icon: 'success',
                confirmButtonColor: '#000',
            }).then(() => {
                navigate('/dashboard');
            });
        } catch (error) {
            setLoginLoading(false);
        
            if (error.response && error.response.data && error.response.data.detail) {
                const detail = error.response.data.detail;
        
                if (detail === "Account not verified") {
                    Swal.fire('Account Not Verified', 'Please verify your account before logging in.', 'warning');
                    navigate('/otp', { state: { email: email } });
                } else {
                    Swal.fire('Sign In Failed', detail, 'error');
                }
            } else {
                Swal.fire('Sign In Failed', 'Something went wrong. Please try again.', 'error');
            }
        }
        
    };
    

    const handleForgotPassword = () => {
        setOpenResetPassword(true);
    };

    const handleCloseResetPassword = () => {
        setOpenResetPassword(false);
        setEmail('');
        setEmailError('');
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <main className="w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-lg border border-gray-800 flex flex-col p-6 rounded-xl shadow-lg">
                
                <section className="flex flex-col gap-3 mb-5">
                    <p>EasyDocs</p>
                    <p className="text-3xl font-semibold">Sign in</p>
                </section>

                <section className="flex flex-col justify-center gap-3">
                    {/* Email Field */}
                    <div className="flex flex-col relative">
                        <p>Email:</p>
                        <input
                            className="border-gray-500 border rounded-[5px] p-2"
                            placeholder="yourname@example.com"
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {loadingEmail && (
                            <CircularProgress
                                size={20}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                }}
                            />
                        )}
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col relative">
                        <p>Password:</p>
                        <input
                            className="border-gray-500 border rounded-[5px] p-2"
                            placeholder="····"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {loadingPassword && (
                            <CircularProgress
                                size={20}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                }}
                            />
                        )}
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>
                </section>

                {/* Remember Me */}
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{
                                    transform: 'scale(0.8)',
                                    color: 'black',
                                    '&.Mui-checked': { color: 'black' },
                                }}
                            />
                        }
                        label="Remember me."
                    />
                </div>

                {/* Sign In Button */}
                <div className="flex flex-col gap-3 font-medium">
                    <Button
                        onClick={handleSignIn}
                        disabled={loginLoading}
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            padding: '10px 20px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            width: '100%',
                        }}
                    >
                        {loginLoading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Sign in'
                        )}
                    </Button>

                    <p
                        className="text-center hover:cursor-pointer hover:underline"
                        onClick={handleForgotPassword}
                    >
                        Forgot your password?
                    </p>
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <hr className="w-full border-gray-600" />
                    <span className="px-2 text-gray-400 text-sm">or</span>
                    <hr className="w-full border-gray-600" />
                </div>

                {/* Sign up redirect */}
                <div className="flex flex-col space-y-3 w-full max-w-sm mx-auto font-medium">
                    <p className="text-center">
                        Don't have an account yet?
                        <span className="hover:cursor-pointer hover:underline">
                            <Link to="/signup"> Sign up</Link>
                        </span>
                    </p>
                </div>
            </main>

            {/* Forgot Password Modal */}
            <Modal open={openResetPassword} onClose={handleCloseResetPassword}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" className="text-center font-semibold">
                        Reset Password
                    </Typography>
                    <Typography className="text-gray-600 mt-2">
                        Enter your email, and we'll send you an OTP to reset your password.
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: 'black', color: 'white' }}
                        disabled={!email || !!emailError}
                        onClick={() => find()}
                    >
                        Send Reset Link
                    </Button>

                    <Button
                        fullWidth
                        onClick={handleCloseResetPassword}
                        sx={{ mt: 1, color: 'black', textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default SignInPage;
