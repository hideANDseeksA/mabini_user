import React from "react";
import { useNavigate } from "react-router-dom";
import Instruction from "../Components/Instruction";
import { ChevronLeft, NotificationsActiveOutlined } from "@mui/icons-material";
import CustomButton from "../Components/CustomButton";
import StudentInformation from "../Components/StudentInformation";
import COG from "../Components/Certificates/COG";
import COE from "../Components/Certificates/COE";

const Request = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full py-5">
                <div className="flex space-x-2 py-5 justify-start">
                    <CustomButton to="/dashboard" icon={ChevronLeft}>
                        Request Now
                    </CustomButton>
                </div>

                <div className="w-full gap-5 flex flex-col md:flex-row">
                    {/* Left Section - Document Request Form */}
                    <div className="md:w-[73%] w-full shadow-lg rounded-lg hover:border-gray-700 hover:border">
                        <div className="subheader">
                            <p>Document Request Form</p>
                        </div>

                        <StudentInformation />

                        <div className="flex justify-center px-5">
                            <hr className="w-full border-t-2 border-black" />
                        </div>

                        <p className="text-xl font-bold p-5">DOCUMENTS INFORMATION</p>

                        <div className="flex justify-center px-5">
                            <hr className="w-full border-t-2 border-black" />
                        </div>

                        <div className="w-full px-5 py-6 flex flex-col gap-5">
                            <COG />
                            <COE />
                        </div>
                    </div>

                    {/* Instruction Section */}
                    <div className="md:w-[27%] w-full hidden md:block shadow-lg border-gray-200 border rounded-lg px-5 py-3 flex-col relative">
                        <div className="flex justify-end w-full">
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

                        <Instruction
                            steps="Step #1"
                            content='Click the "Request Now" button'
                            picture="/images/step1.svg"
                        />
                        <Instruction
                            steps="Step #2"
                            content="Fill out the request form"
                            picture="/images/step2.svg"
                        />
                        <Instruction
                            steps="Step #3"
                            content="Choose your preferred payment method"
                            picture="/images/step3.svg"
                        />
                        <Instruction
                            steps="Step #4"
                            content="Set appointment date and wait for the registrar’s confirmation through email."
                            picture="/images/step4.svg"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Request;