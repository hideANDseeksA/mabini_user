import React from 'react';
import { Avatar } from '@mui/material';

const UserProfile = () => {
  // Get enrollment info
  const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
  const userEnrollment = enrollments.length > 0 ? enrollments[0] : null;

  // Prepare name
  const fullName = userEnrollment 
    ? `${userEnrollment.fName}`
    : "User";

  return (
    <div className="w-full h-auto py-5 px-5 flex justify-end items-center">
      <p className="font-semibold text-xl pr-3">Hello, {fullName}</p>
      <span>
        <Avatar src="/broken-image.jpg" />
      </span>
    </div>
  );
};

export default UserProfile;
