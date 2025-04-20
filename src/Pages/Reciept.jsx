import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import StudentInformation from '../Components/StudentInformation';
import { useLocation, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Instruction from '../Components/Instruction';
import { NotificationsActiveOutlined } from '@mui/icons-material';

const Reciept = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedDocuments = [], selectedYears = {}, selectedSemesters = {} } = location.state || {};

    // generate and download PDF
    const handleDownloadPDF = async () => {
        const element = document.getElementById("receipt-content");
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
        pdf.save("Document_Receipt.pdf");
    };

    return (
        <div className='w-full h-auto'>
            <div className="w-full gap-5 flex flex-col md:flex-row">
                
                   <div className='md:w-[73%] w-full'>
                   
                        <div className="shadow-lg rounded-lg hover:border-gray-700 hover:border">
                            <div className="subheader">
                                <p>Document Request Receipt</p>
                            </div>
                            <div id="receipt-content">
                            <p className='flex justify-end px-5 pt-5'>Reference no:</p>
                            <StudentInformation />

                            <div className="flex justify-center px-5">
                                <hr className="w-full border-t-2 border-black py-3" />
                            </div>

                            <div className='w-full px-6'>
                                <p className="text-xl font-bold pb-3">DOCUMENTS INFORMATION</p>
                                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: "bold", fontSize: "1.125rem", borderBottom: "none" }}>
                                                    Document Name
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: "bold", fontSize: "1.125rem", borderBottom: "none" }}>
                                                    Price
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: "bold", fontSize: "1.125rem", borderBottom: "none" }}>
                                                    Assessment Year
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: "bold", fontSize: "1.125rem", borderBottom: "none" }}>
                                                    Semester
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedDocuments.length > 0 ? (
                                                selectedDocuments.map((doc) => (
                                                    <TableRow key={doc.name}>
                                                        <TableCell sx={{ borderBottom: "none", fontWeight: 'bold', fontSize: '1.125rem' }}>
                                                            {doc.name}
                                                        </TableCell>
                                                        <TableCell sx={{ borderBottom: "none", fontWeight: 'bold', fontSize: '1.125rem' }}>
                                                            {doc.price}
                                                        </TableCell>
                                                        <TableCell sx={{ borderBottom: "none", fontWeight: 'bold', fontSize: '1.125rem' }}>
                                                            {selectedYears[doc.name] || "N/A"}
                                                        </TableCell>
                                                        <TableCell sx={{ borderBottom: "none", fontWeight: 'bold', fontSize: '1.125rem' }}>
                                                            {selectedSemesters[doc.name] || "N/A"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell sx={{ borderBottom: "none" }} colSpan={4} align="center">
                                                        No documents selected
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <hr className='w-full border-t-2 py-3 border-black' />

                                <div className='flex flex-col gap-5 flex-wrap'>
                                    <p className='text-xl font-bold'>Payment Details</p>
                                    <div className='flex gap-3 text-xl'>
                                        <p>Payment Method: <b>Cash</b> </p>
                                        <div className='text-xl pb-10'>
                                            <p>Sender name: <b>Sweet na bakla</b></p>
                                            <p>Reference number: <b>1111111</b></p>
                                        </div>
                                    </div>
                                </div>

                                <hr className='w-full border-t-2 py-3 border-black' />

                                <p className='pb-5'><b>Note:</b> Be advised that the updates regarding the status of requested document/s can be viewed through
                                    Request History section. </p>
                            </div>
                        </div>
                    </div>

                    {/* buttons */}
                    <div className='text-white flex flex-wrap gap-5 w-full md:justify-end justify-center mt-5 font-bold'>
                        <button
                        onClick={() => navigate("/dashboard")}
                        className='px-5 py-2 bg-green-500 rounded-[5px]'>Back to home</button>
                        <button 
                            className='px-5 py-2 bg-green-500 rounded-[5px]' 
                            onClick={handleDownloadPDF}
                        >
                            Download
                        </button>
                    </div>
                </div>

                {/* Instruction section */}
                <div className='md:w-[27%] w-full shadow-lg border-gray-200 border rounded-lg px-5 py-3 flex flex-col relative'>
                    <div className='flex justify-end w-full'>
                        <NotificationsActiveOutlined fontSize="large" />
                    </div>

                    <div className="relative inline-block w-full px-5 py-3 rounded-lg bg-blue-200 mt-5">
                        {/* Background shadow layer */}
                        <div className="absolute top-1 left-1 w-full h-full bg-blue-300 rounded-lg -z-10"></div>

                        {/* Main content */}
                        <p className="text-blue-600 font-semibold text-sm md:text-base text-center">
                            <span className="text-3xl md:text-5xl font-bold">4</span> EASY STEPS TO <br /> CREATE A REQUEST
                        </p>
                    </div>

                    <Instruction steps="Step #1" content='Click the "Request Now" button' picture="/images/step1.svg" />
                    <Instruction steps="Step #2" content='Fill out the request form' picture="/images/step2.svg" />
                    <Instruction steps="Step #3" content='Choose your preferred payment method' picture="/images/step3.svg" />
                    <Instruction steps="Step #4" content='Set appointment date and wait for the registrar’s confirmation through email.' picture="/images/step4.svg" />
                </div>
            </div>
        </div>
    );
};

export default Reciept;
