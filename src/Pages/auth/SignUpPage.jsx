import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { Link,Await,useNavigate } from 'react-router-dom';
import SlideDialog from '../../Components/SlideDialog';
import axios from 'axios';
import Swal from 'sweetalert2';


const SignUpPage = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setLoadingEmail(true);

        setTimeout(() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setEmailError("Please enter a valid email address");
            } else {
                setEmailError("");
            }
            setLoadingEmail(false);
        }, 1000);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setLoadingPassword(true);

        setTimeout(() => {
            const passwordRegex = /^.{8,}$/;
            if (!passwordRegex.test(value)) {
                setPasswordError("Password must be at least 8 characters");
            } else {
                setPasswordError("");
            }
            setLoadingPassword(false);
        }, 1000);
    };
    const handleNameChange = (e) => {
        setId(e.target.value);
    };

  

    const handleSignUp = async () => {
        // Validate full name
        if (!id.trim()) {
            setDialogMessage("Full name is required");
            setOpenDialog(true);
            return;
        }
    
        // Validate email
        if (!email.trim()) {
            setDialogMessage("Email is required");
            setOpenDialog(true);
            return;
        }
    
        if (emailError) {
            setDialogMessage("Please fix the email format");
            setOpenDialog(true);
            return;
        }
    
        // Validate password
        if (!password) {
            setDialogMessage("Password is required");
            setOpenDialog(true);
            return;
        }
    
        if (passwordError) {
            setDialogMessage("Password must be at least 8 characters");
            setOpenDialog(true);
            return;
        }
    
        // Show loading dialog
        Swal.fire({
            title: 'Creating your account...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    
        try {
            const response = await axios.post("https://try-me-vtgf.onrender.com/api/create_user", {
                student_id: id,
                email: email,
                password: password
            });
    
            // Close loading
            Swal.close();
    
            // Show success
              Swal.fire({
                           title: 'Successful!',
                           text: 'Account Created!',
                           icon: 'success',
                           confirmButtonColor: '#000',
                       }).then(() => {
                        navigate('/otp', { state: { email: email } });
                       });
        } catch (error) {
            console.error("❌ Axios error:", error);
            const errorMsg = error.response?.data?.detail || "Unable to connect to the server.";
    
            // Close loading
            Swal.close();
    
            // Show error
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: errorMsg
            });
        }
    };
    
    

        const handleCloseDialog = () => {
            setOpenDialog(false);
    };

    return (
        <div className='w-full h-screen flex items-center justify-center py-5'>
            <main className="w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-lg border border-gray-800 flex flex-col p-6 rounded-xl shadow-lg">

                <section className='flex flex-col gap-3 mb-5'>
                    <p>EasyDocs</p>
                    <p className='text-3xl font-semibold'>Sign up</p></section>

                <section className='flex flex-col justify-center gap-3 '>
                    {/* Full Name Field */}
                    <article className='flex flex-col justify-center'>
                        <p>Full name:</p>
                        <input
                            className='border-gray-500 border rounded-[5px] p-2'
                            placeholder='Kean Joshua'
                            type="number"
                            value={id}
                            onChange={handleNameChange}
                        />
                    </article>

                    {/* Email Field */}
                    <article className='flex flex-col justify-center relative'>
                        <p>Email:</p>
                        <input
                            className='border-gray-500 border rounded-[5px] p-2'
                            placeholder='keanjoshua@example.com'
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {loadingEmail && (
                            <CircularProgress size={20} sx={{ position: 'absolute', right: '10px', top: '50%' }} />
                        )}
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </article>

                    {/* Password Field */}
                    <article className='flex flex-col justify-center relative'>
                        <p>Password:</p>
                        <input
                            className='border-gray-500 border rounded-[5px] p-2'
                            placeholder='····'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {loadingPassword && (
                            <CircularProgress size={20} sx={{ position: 'absolute', right: '10px', top: '50%' }} />
                        )}
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </article>
                </section>
                <article className=''>
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{
                                    transform: "scale(0.8)",
                                    color: "black",
                                    "&.Mui-checked": {
                                        color: "black",
                                    },
                                }}
                            />
                        }
                        label="I want to receive updates via email."
                        componentsProps={{
                            typography: {
                                fontSize: {
                                    xs: "0.75rem", // Small screens
                                    sm: "0.875rem", // Medium screens
                                    md: "1rem", // Large screens
                                },
                            },
                        }}
                    />


                </article>
                <article className='flex flex-col gap-3 font-medium'>
                    <Button
                        onClick={handleSignUp}
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            padding: '10px 20px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            width: '100%'
                        }}
                    >
                        Sign up
                    </Button>

                </article>
                <div className="flex items-center my-4">
                    <hr className="w-full border-gray-600" />
                    <span className="px-2 text-gray-400 text-sm">or</span>
                    <hr className="w-full border-gray-600" />
                </div>
                <div className="flex flex-col space-y-3 w-full max-w-sm mx-auto font-medium">
                  
                    <p className='text-center'>Already have an account? <span className='hover:cursor-pointer hover:underline'><Link to="/">Sign in</Link></span></p>
                </div>


            </main>



            <SlideDialog
                open={openDialog}
                onClose={handleCloseDialog}
                title="Sign up Failed"
                content={dialogMessage}
                actions={
                    <Button
                        onClick={handleCloseDialog}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#333',
                            },
                            textTransform: 'none',
                            padding: '8px 16px',
                            borderRadius: '5px',
                        }}
                    >
                        Close
                    </Button>
                }
            />

        </div>
    )
}

export default SignUpPage
