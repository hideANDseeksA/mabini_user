import React, { useState, useEffect, fetch } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const location = useLocation();

    const email = location.state?.email;
    const mode = location.state?.mode;

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };
    const handleSubmit = async () => {
        if (otp.join('').length === 6) {
            const otpString = otp.join('');
            const otpInt = parseInt(otpString, 10);
    
            // Show loading SweetAlert
            Swal.fire({
                title: 'Verifying...',
                text: 'Please wait while we verify your code.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
    
            try {
                const response = await axios.post('https://try-me-vtgf.onrender.com/api/verify', {
                    email: email,
                    code: otpInt
                });
    
                Swal.close(); // Close the loading dialog
    
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Verification Successful!',
                        text: 'Your account has been successfully verified.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
    
                    if (mode === "forgot") {
                        navigate('/resetPassword', { state: { email: email } });
                    } else {
                        navigate('/');
                    }
    
                } else {
                    Swal.fire({
                        title: 'Verification Failed!',
                        text: response.data.detail || 'Invalid email or verification code.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            } catch (error) {
                Swal.close(); // Just in case something breaks before it's closed
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred during verification. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error during verification:', error);
            }
        } else {
            Swal.fire({
                title: 'Invalid OTP!',
                text: 'Please enter a valid 6-digit OTP.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
    };
    

    const handleResend = async () => {
        try {
            setTimer(60);
            setIsResendDisabled(true);
    
            // Show loading alert
            Swal.fire({
                title: 'Resending OTP...',
                text: 'Please wait while we resend your code.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
    
            const formData = new FormData();
            formData.append('email', email); // replace with actual email variable
    
            await axios.put('https://try-me-vtgf.onrender.com/api/resend', formData);
    
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'OTP Sent!',
                text: 'A new OTP has been sent to your email.',
                timer: 2000,
                showConfirmButton: false
            });
    
        } catch (error) {
            console.error('Error resending OTP:', error);
    
            Swal.fire({
                icon: 'error',
                title: 'Failed to resend',
                text: 'Something went wrong while resending the OTP.',
            });
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <main className='w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-lg border border-gray-800 flex flex-col p-6 rounded-xl shadow-lg text-center'>
                <h2 className='text-3xl font-semibold'>Otp Verification</h2>
                <p className='text-gray-600 mt-2'>Enter the 6-digit OTP sent to your email.</p>

                <div className='flex justify-center gap-3 my-5'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type='text'
                            maxLength='1'
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className='w-12 h-12 text-center text-2xl border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                        />
                    ))}
                </div>

                <Button
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': { backgroundColor: 'gray' },
                        padding: '10px 20px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                    onClick={handleSubmit}
                >
                    Verify OTP
                </Button>

                <p className='text-center text-sm mt-4'>
                    Didn’t receive OTP?{' '}
                    <span
                        className={`cursor-pointer ${isResendDisabled ? 'text-gray-400' : 'text-blue-500 hover:underline'}`}
                        onClick={!isResendDisabled ? handleResend : null}
                    >
                        Resend OTP {isResendDisabled && `in ${timer}s`}
                    </span>
                </p>
            </main>
        </div>
    );
};

export default OtpVerification;
