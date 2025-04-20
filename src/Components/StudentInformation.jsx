import React from 'react';

const StudentInformation = () => {
  // Fetch the enrollment data from localStorage
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
    contact,
    program_name,
  } = userEnrollment;

  return (
    <div className="w-full mx-auto p-5">
      {/* Title Section */}
      <div className="md:flex flex-col flex-wrap justify-between items-start">
        <h2 className="text-xl font-bold">STUDENT INFORMATION</h2>
        <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Student Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
        {/* Left Side */}
        <div className="flex flex-col gap-y-3">
          <p className="font-bold text-lg">
            Student ID:
            <span className="font-normal break-words"> {student_id}</span>
          </p>
          <p className="font-bold text-lg">
            Surname:
            <span className="font-normal break-words"> {lName}</span>
          </p>
          <p className="font-bold text-lg">
            First Name:
            <span className="font-normal break-words"> {fName}</span>
          </p>
          <p className="font-bold text-lg">
            Middle Initial:
            <span className="font-normal break-words"> {mName}</span>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-y-3">
          <p className="font-bold text-lg">
            Email:
            <span className="font-normal break-words"> {email}</span>
          </p>
          <p className="font-bold text-lg">
            Contact No:
            <span className="font-normal break-words"> {contact}</span>
          </p>
          <p className="font-bold text-lg">
            Course:
            <span className="font-normal break-words"> {program_name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;
