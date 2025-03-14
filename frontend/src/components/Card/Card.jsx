import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Card = ({ company, onOpenPopup }) => {
    const userType = localStorage.getItem("userType");
    console.log(company);

    const { name, description, logo, industry, foundingDate, location, website } = company?.companyInfo || {};
    const { stage, amountNeeded, equityOffering } = company?.funding || {};
    const { revenue, users, growth } = company?.metrics || {};
    const { minAmount, maxAmount, preferredStages = [], preferredIndustries = [] } = company?.investmentCriteria || {};
    const [value, setpredictvalue] = useState(null);
    const [data, setData] = useState({
        funding: {
            stage: "",
            amountNeeded: "",
            equityOffering: 10,
        },
        metrics: {
            revenue: 0,
            users: 0,
            growth: 0,
        },
    });

   
    const predictValue = () => {
        console.log(company?.funding?.stage);
    
        setData((prevData) => ({
            ...prevData,
            funding: {
                stage: company?.funding?.stage || "",
                amountNeeded: company?.funding?.amountNeeded || "",
                equityOffering: company?.funding?.equityOffering || 0,
            },
            metrics: {
                revenue: company?.metrics?.revenue || 0,
                users: company?.metrics?.users || 0,
                growth: company?.metrics?.growth || 0,
            },
        }));
    };
    
    // Use useEffect to trigger API call after data updates 
    useEffect(() => {
        if (data) {
            const sendData = async () => {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_URL}/api/ai/value`, data);
                    console.log("Response:", response.data);
                    setpredictvalue(response.data.ans);
                } catch (error) {
                    console.error("Error sending data:", error);
                }
            };
            sendData();
        }
    }, [data]);

    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-sm mx-auto text-white transform transition-transform duration-300 hover:scale-105">
            {/* Conditional Rendering */}
            {userType === "startup" ? (
                <>
                    <h2 className="text-center text-xl font-bold">{company?.name}</h2>
                    {/* Investment Criteria */}
                    <div className="my-4">
                        <h3 className="text-xl font-semibold mb-2">Investment Criteria</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Min Amount:</span>
                                <span className="text-gray-400">${minAmount?.toLocaleString() || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Max Amount:</span>
                                <span className="text-gray-400">${maxAmount?.toLocaleString() || "N/A"}</span>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">Preferred Stages:</h3>
                                {preferredStages?.length ? (
                                    <ul className="list-disc list-inside text-gray-400">
                                        {preferredStages.map((stage, index) => (
                                            <li key={index}>{stage}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400">N/A</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">Preferred Industries:</h3>
                                {preferredIndustries?.length ? (
                                    <ul className="list-disc list-inside text-gray-400">
                                        {preferredIndustries.map((industry, index) => (
                                            <li key={index}>{industry}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400">N/A</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-between">
                        <a
                            href={`mailto:${company?.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Send Mail
                        </a>
                        <Link to="/video"
                            state={{ email: company?.email }}
                            className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <button>
                                Contact
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center mb-4">
                        <img src={logo} alt={`${name} logo`} className="w-12 h-12 rounded-full mr-4" />
                        <h2 className="text-center text-xl font-bold">{company?.companyInfo.name}</h2>
                    </div>
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">{description}</p>
                    {/* Funding Details */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Funding Details</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Stage:</span>
                                <span className="text-gray-400">{stage || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Amount Needed:</span>
                                <span className="text-gray-400">Rs.{amountNeeded ? amountNeeded.toLocaleString() : "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Equity Offering:</span>
                                <span className="text-gray-400">{equityOffering ? `${equityOffering}%` : "N/A"}</span>
                            </div>
                        </div>
                    </div>
                    {/* Metrics */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Metrics</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Revenue:</span>
                                <span className="text-gray-400">{revenue ? `Rs.${revenue.toLocaleString()}` : "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Users:</span>
                                <span className="text-gray-400">{users ? users.toLocaleString() : "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Growth:</span>
                                <span className="text-gray-400">{growth ? `${growth}%` : "N/A"}</span>
                            </div>
                        </div>
                    </div>
                    {value !== null && value!=0 && (
                        <div className="mb-4 text-center">
                            <h3 className="text-xl font-semibold">Predicted Value:</h3>
                            <p className="text-green-400 text-2xl font-bold">Rs.{value.toLocaleString()}</p>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <a
                            href={website ? website : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Visit Website
                        </a>
                        <button onClick={() => onOpenPopup(company?.email)} className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer">
                            Initiate Proposal
                        </button>

                    </div>
                        <button onClick={predictValue} className="mt-5 block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer">
                           Predict Value
                        </button>
                    <ToastContainer />
                </>
            )}
        </div>
    );
};

export default Card;
