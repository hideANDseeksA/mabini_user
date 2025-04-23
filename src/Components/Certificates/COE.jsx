import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
    Button,
    Accordion,
    AccordionSummary,
    AccordionActions,
    AccordionDetails,
    Typography,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SlideDialog from "../SlideDialog";

const COE = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({ reason: '' });
    const [errors, setErrors] = useState({ reason: false });
    const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    const userEnrollment = enrollments.length > 0 ? enrollments[0] : null;
  
    // If no data is found, show a fallback message
    if (!userEnrollment) {
      return <p>No student information available.</p>;
    }
  
    // Prepare student details
    const {
      student_id,
      fName,
      mName,
      lName,
      email,
      program_code,
      semester,
      academic_year,
      program_name,
    } = userEnrollment;

    const data = {
        fullname: fName + " " + mName + " " + lName,
        semester: semester,
        courses: `${program_name} (${program_code})`,
        academic_year: academic_year,
        purpose: formData.reason,
    };


    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {
            reason: !formData.reason.trim(),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) return;
    
        Swal.fire({
            title: 'Confirm Submission',
            text: 'Are you sure you want to submit this request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Submit',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'my-swal',
                confirmButton: 'my-button',
                cancelButton: 'my-button',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Show loading alert
                Swal.fire({
                    title: 'Submitting...',
                    text: 'Please wait while we submit your request.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    customClass: {
                        popup: 'my-swal',
                    }
                });
    
                try {
                    const response = await axios.post('https://tryme-production.up.railway.app/certificate/request', {
                        student_id: student_id,
                        certificate_type: 'Certificate of Enrollment',
                        certificate_details: data,
                        purpose: formData.reason,
                        status: 'Pending',
                    });
    
                    console.log("API Response:", response.data);
                    Swal.fire({
                        title: 'Submitted!',
                        text: 'Your request has been submitted successfully.',
                        icon: 'success',
                        confirmButtonColor: '#2563eb',
                        customClass: {
                            popup: 'my-swal',
                            confirmButton: 'my-button',
                        },
                    }).then(() => {
                        handleDialogClose();
                    });
                } catch (error) {
                    console.error("API error:", error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error submitting your request. Please try again later.',
                        icon: 'error',
                        confirmButtonColor: '#2563eb',
                        customClass: {
                            popup: 'my-swal',
                            confirmButton: 'my-button',
                        },
                    });
                }
            }
        });
    };
    

    return (
        <div>
            <Accordion
                defaultExpanded={false}
                elevation={1}
                sx={{
                    width: '100%',
                    backgroundColor: '#D5E3FF',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { backgroundColor: '#ffffff' },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    sx={{
                        backgroundColor: '#D5E3FF',
                        '&.Mui-expanded': {
                            backgroundColor: '#D5E3FF',
                            minHeight: 48,
                        },
                        '& .MuiAccordionSummary-content.Mui-expanded': {
                            margin: '12px 0',
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 700,
                        }}
                        component="span"
                    >
                        Certificate of Enrollment
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    This certificate is issued to verify that the individual is currently enrolled at Mabini Colleges, Inc. It is often used for purposes such as securing student discounts or applying for financial aid.
                </AccordionDetails>
                <AccordionActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        paddingLeft: '16px',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#6F9AEC' } }}
                        onClick={handleDialogOpen}
                    >
                        Request
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#030303',
                            borderColor: '#E5E7EB',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#E5E7EB',
                                borderColor: '#E5E7EB',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </AccordionActions>
            </Accordion>

            {/* SlideDialog Component */}
            <SlideDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                title="Please Fill Out the Form"
                content={
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '16px',
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            label="Purpose of Request"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            error={errors.reason}
                            helperText={errors.reason && "Please provide a purpose"}
                        />
                    </form>
                }
                actions={
                    <>
                        <Button
                            onClick={handleDialogClose}
                            variant="outlined"
                            sx={{
                                color: '#030303',
                                borderColor: '#E5E7EB',
                                '&:hover': {
                                    backgroundColor: '#E5E7EB',
                                    borderColor: '#E5E7EB',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleFormSubmit}
                            variant="contained"
                            sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#6F9AEC' } }}
                        >
                            Submit
                        </Button>
                    </>
                }
            />
        </div>
    );
};

export default COE;
