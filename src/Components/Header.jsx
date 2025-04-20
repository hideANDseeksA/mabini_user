import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Index.css'
import SlideDialog from './SlideDialog'
import { Button } from '@mui/material'
import OutlinedButton from './Buttons/OutlinedButton'
import BlackContainedButton, { LoadingButton } from './Buttons/BlackContainedButton'

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true); // Open the dialog when "Sign Out" is clicked
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    const handleSignOut = () => {
        setLoading(true);
        localStorage.clear();
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 2000);
      };
    


    const home = () => {
        navigate('/dashboard');
    };

    const refresh = () => {
        window.location.reload();
    };

    return (
        <>
            <div className='w-full pt-5'>
                <nav className='flex justify-between items-center text-white text-lg font-semibold p-4 rounded-[10px] bg-blue-600'>
                    <div
                        onClick={refresh}
                        className='inline-flex space-x-3 items-center hover:cursor-pointer'>
                        <img className='h-[55px] w-auto'
                            src="./images/mcLogo.svg" alt="mc logo" />
                        <p className=''>Easy Docs</p>
                    </div>
                    <ul className='flex space-x-5 hover:cursor-pointer'>
                        <li onClick={home}>Home</li>
                        <li onClick={handleClickOpen}>Sign Out</li>
                    </ul>
                </nav>
            </div>

            {/* SlideDialog for Sign Out Confirmation */}
            <SlideDialog
                open={open}
                onClose={handleClose}
                title="Confirm Sign Out"
                content="Are you sure you want to sign out?"
                actions={
                    <>
                        <OutlinedButton
                            onClick={handleClose}>Cancel</OutlinedButton>
                        <LoadingButton
                            loading={loading}
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </LoadingButton>
                    </>
                }
            />
        </>
    );
};

export default Header;