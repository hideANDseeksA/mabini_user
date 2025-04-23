import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
    Button,
    Accordion,
    AccordionSummary,
    AccordionActions,
    AccordionDetails,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SlideDialog from "../SlideDialog";
import axios from 'axios';

const COG = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({ reason: '' });
    const [semester, setSemester] = useState('');
    const [year, setYear] = useState('');
    const [errors, setErrors] = useState({ semester: false, year: false, reason: false });
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
      program_code,
      academic_year,
      program_name,
    } = userEnrollment;

  

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

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {
            semester: !semester,
            year: !year,
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
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Show loading while processing
                    Swal.fire({
                        title: 'Submitting...',
                        text: 'Please wait while we process your request.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                        customClass: {
                            popup: 'my-swal',
                        },
                    });
    
                    // Step 1: Fetch student grades
                    const gradesResponse = await fetch(
                        `https://tryme-production.up.railway.app/grades/retrieve?student_id=${student_id}&academic_year=${year}&semester=${semester}`
                    );
    
                    if (!gradesResponse.ok) {
                        throw new Error('Failed to fetch grades');
                    }
    
                    const gradesData = await gradesResponse.json();
                    console.log("📘 Grades Retrieved:", gradesData);
    
                    // Step 2: Submit certificate request using fetched grades
                    const data = {
                        fullname: fName + " " + mName + " " + lName,
                        semester: semester,
                        courses: `${program_name} (${program_code})`,
                        academic_year: academic_year,
                        purpose: formData.reason,
                        subjects: gradesData,
                    };
    
                    const submitResponse = await axios.post('https://tryme-production.up.railway.app/certificate/request', {
                        student_id: student_id,
                        certificate_type: 'Certificate of Grades',
                        certificate_details: data,
                        purpose: formData.reason,
                        status: 'Pending',
                    });
    
                    // Show success message
                    Swal.fire({
                        title: 'Submitted!',
                        text: 'Your certificate request has been submitted successfully.',
                        icon: 'success',
                        confirmButtonColor: '#2563eb',
                        customClass: {
                            popup: 'my-swal',
                        },
                    }).then(() => {
                        handleDialogClose();
                    });
    
                } catch (error) {
                    console.error('❌ Submission error:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message || 'An unexpected error occurred.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                        customClass: {
                            popup: 'my-swal',
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
                        Certificate of Grades
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    This certificate is issued to verify the individual's grades. It is often used for academic purposes such as scholarships or job applications.
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
                        <Typography variant="h6" gutterBottom>Select Semester and Year</Typography>
                        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                            {/* Semester Field */}
                            <FormControl
                                required
                                fullWidth
                                margin="normal"
                                error={errors.semester}
                            >
                                <InputLabel id="selected-sem">Semester</InputLabel>
                                <Select
                                    labelId="selected-sem"
                                    value={semester}
                                    label="Semester"
                                    onChange={handleSemesterChange}
                                >
                                    <MenuItem value={'1st'}>1st Semester</MenuItem>
                                    <MenuItem value={'2nd'}>2nd Semester</MenuItem>
                                </Select>
                                {errors.semester && <FormHelperText>Please select a semester</FormHelperText>}
                            </FormControl>

                            {/* Year Field */}
                            <FormControl
                                required
                                fullWidth
                                margin="normal"
                                error={errors.year}
                            >
                                <InputLabel id="selected-year">S-Y</InputLabel>
                                <Select
                                    labelId="selected-year"
                                    value={year}
                                    label="School Year"
                                    onChange={handleYearChange}
                                >
                                    <MenuItem value={'2023-2024'}>2023-2024</MenuItem>
                                    <MenuItem value={'2024-2025'}>2024-2025</MenuItem>
                                </Select>
                                {errors.year && <FormHelperText>Please select a school year</FormHelperText>}
                            </FormControl>
                        </div>
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

export default COG;