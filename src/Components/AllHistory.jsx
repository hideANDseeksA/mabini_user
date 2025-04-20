import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AllHistory = ({ studentId }) => {
  const [rows, setRows] = useState([]);
  const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
  const userEnrollment = enrollments.length > 0 ? enrollments[0] : null;

  // If no data is found, show a fallback message
  if (!userEnrollment) {
    return <p>No student information available.</p>;
  }

  // Prepare student details
  const {
    student_id,

  } = userEnrollment;

  const columns = [
    { id: 'transaction_id', label: 'Request Number', align: 'center' },
    { id: 'certificate_type', label: 'Requested Document', align: 'left' },
    { id: 'date_requested', label: 'Date Requested',  align: 'center' },
    { id: 'status', label: 'Status',  align: 'center' },
    { id: 'purpose', label: 'Remarks',  align: 'left' },
    { id: 'change_at', label: 'Date of Action',  align: 'center' },
  ];
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Show loading alert
        Swal.fire({
          title: 'Loading...',
          text: 'Fetching certificate history',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
  
        const response = await axios.get(
          `https://try-me-vtgf.onrender.com/certificate/by_student?student_id=${student_id}`
        );
        setRows(response.data);
  
        // Close the loading alert
        Swal.close();
      } catch (error) {
        console.error('Failed to fetch certificate history:', error);
  
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch certificate history!'
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (student_id) {
      fetchHistory();
    }
  }, [student_id]);
  

  return (
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
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          backgroundColor: '#D5E3FF',
          '&.Mui-expanded': { backgroundColor: '#D5E3FF' },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          All Request History
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small" aria-label="All Request History table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      backgroundColor: '#D5E3FF',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default AllHistory;
