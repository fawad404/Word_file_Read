import React from "react";
import { FaTrophy, FaStar, FaCheckCircle, FaBullseye } from "react-icons/fa";
import WeaknessStrengths from "./WeaknessStrength";

const PerformanceSummary = () => {
    // Data for each section
    const sections = [
        { name: "English Language", score: 0.25, totalscore: 30, attempted: 4, total: 30, accuracy: 25, time: "00:57", maxTime: 20 },
        { name: "Quantitative Aptitude", score: 20, totalscore: 35, attempted: 1, total: 35, accuracy: 100, time: "00:14", maxTime: 20 },
        { name: "Reasoning Ability", score: 10, totalscore: 35, attempted: 0, total: 35, accuracy: 1, time: "00:40", maxTime: 20 },
        { name: "Overall", score: 1, totalscore: 100, attempted: 50, total: 100, accuracy: 33.33, time: "01:51", maxTime: 60 },
    ];
    const Compare = [
        { name: "You", score: 2, totalscore: 100, accuracy: 33.33, Correct: 5, total: 100, wrong: 4, time: 10, maxTime: 60 },
        { name: "Topper", score: 4, totalscore: 100, accuracy: 10.45, Correct: 20, total: 100, wrong: 32, time: 20, maxTime: 60 },
        { name: "Average", score: 6, totalscore: 100, accuracy: 50, Correct: 40, total: 100, wrong: 9, time: 30, maxTime: 60 }
    ];

    // Function to calculate the width for progress bars
    const calculateWidth = (value, total) => {
        if (total === 0) return 0;
        return Math.min((value / total) * 100, 100);
    };

    return (
        <>
            <div className="bg-gray-50 flex flex-col justify-center items-center">
                {/* Overall Performance Summary */}
                <div className="bg-white w-full mt-5 rounded-md shadow-md p-6  mb-6">
                    <h2 className="text-xl  mb-4">Overall Performance Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div className="flex flex-col items-center border border-gray-300 p-4 rounded">
                            <FaTrophy className="text-red-500 text-3xl mb-2" />
                            <span className="text-lg font-semibold">60163 / 67786</span>
                            <span className="text-gray-500 text-sm">Rank</span>
                        </div>
                        <div className="flex flex-col items-center border border-gray-300 p-4 rounded">
                            <FaStar className="text-purple-500 text-3xl mb-2" />
                            <span className="text-lg font-semibold">1 / 100</span>
                            <span className="text-gray-500 text-sm">Score</span>
                        </div>
                        <div className="flex flex-col items-center border border-gray-300 p-4 rounded">
                            <FaCheckCircle className="text-blue-500 text-3xl mb-2" />
                            <span className="text-lg font-semibold">6 / 100</span>
                            <span className="text-gray-500 text-sm">Attempted</span>
                        </div>
                        <div className="flex flex-col items-center border border-gray-300 p-4 rounded">
                            <FaBullseye className="text-green-500 text-3xl mb-2" />
                            <span className="text-lg font-semibold">33.33%</span>
                            <span className="text-gray-500 text-sm">Accuracy</span>
                        </div>
                        <div className="flex flex-col items-center border border-gray-300 p-4 rounded">
                            <FaBullseye className="text-indigo-500 text-3xl mb-2" />
                            <span className="text-lg font-semibold">11.25%</span>
                            <span className="text-gray-500 text-sm">Percentile</span>
                        </div>
                    </div>
                </div>

                {/* Sectional Summary */}
                <div className="p-6">
                    <div className="flex justify-between  items-center mb-4">
                        <h2 className="text-xl font-bold">Sectional Summary</h2>
                        <select className="border border-gray-300 rounded-md p-2 text-sm">
                            <option>Select your category</option>
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>

                    {/* Sectional Details Table */}
                    <div className="overflow-x-auto max-md:text-sm max-sm:text-xs max-sm:max-w-md mx-auto">
                        <table className="w-full table-fixed border-collapse">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="border border-gray-300 py-2 px-4">Section Name</th>
                                    <th className="border border-gray-300 py-2 px-4">Score</th>
                                    <th className="border border-gray-300 py-2 px-4">Attempted</th>
                                    <th className="border border-gray-300 py-2 px-4">Accuracy</th>
                                    <th className="border border-gray-300 py-2 px-4">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sections.map((section, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-all duration-200 hover:font-bold">
                                        {/* Section Name */}
                                        <td className="border border-gray-300 py-2 px-4 text-center">
                                            {section.name}
                                        </td>

                                        {/* Score */}
                                        <td className="border relative text-center">
                                            <div className="w-full rounded  py-2">
                                                <div
                                                    className="h-full top-0 bottom-0 absolute"
                                                    style={{
                                                        width: `${calculateWidth(section.score, section.totalscore)}%`,
                                                        backgroundColor:
                                                            calculateWidth(section.score, section.totalscore) > 50
                                                                ? "rgba(135, 206, 250, 0.9)" // Light Sky Blue
                                                                : "rgba(173, 216, 230, 0.7)", // Light Blue
                                                        borderRight: "4px solid rgba(0, 139, 139, 1)", // Darker Teal Border
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="absolute inset-0 flex items-center justify-center text-sm  text-black z-10">
                                                {section.score} / {section.totalscore}
                                            </span>
                                        </td>

                                        {/* Attempted */}
                                        <td className="border relative text-center">
                                            <div className="w-full rounded  py-2">
                                                <div
                                                    className="h-full top-0 bottom-0 absolute"
                                                    style={{
                                                        width: `${calculateWidth(section.attempted, section.total)}%`,
                                                        backgroundColor:
                                                            calculateWidth(section.attempted, section.total) > 50
                                                                ? "rgba(144, 238, 144, 0.9)" // Light Green
                                                                : "rgba(152, 251, 152, 0.7)", // Pale Green
                                                        borderRight: "4px solid rgba(34, 139, 34, 1)", // Dark Green Border
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="absolute inset-0 flex items-center justify-center text-sm  text-black z-10">
                                                {section.attempted} / {section.total}
                                            </span>
                                        </td>

                                        {/* Accuracy */}
                                        <td className="border relative text-center">
                                            <div className="w-full rounded h-14 ">
                                                <div
                                                    className="h-full absolute "
                                                    style={{
                                                        width: `${section.accuracy}%`,
                                                        backgroundColor:
                                                            section.accuracy === 100
                                                                ? "rgba(255, 255, 102, 0.7)" // Gold
                                                                : "rgba(255, 255, 102, 0.7)", // Light Yellow
                                                        borderRight:
                                                            section.accuracy === 100
                                                                ? "4px solid rgba(204, 164, 0, 1)" // Dark Gold Border
                                                                : "4px solid rgba(184, 134, 11, 1)", // Dark Yellow Border
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="absolute inset-0 flex items-center justify-center text-sm  text-black z-10">{section.accuracy}%</span>
                                        </td>

                                        {/* Time */}
                                        <td className="border border-gray-300 py-2 px-4 text-center">
                                            {section.time} / {section.maxTime} min
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <WeaknessStrengths />
           
            <div className="p-6 bg-white ">

                {/*  Details Table */}
                <div className="overflow-x-auto">
                    <table className="w-full max-w-2xl max-md:max-w-lg table-fixed border-collapse mx-auto bg-white shadow-md">
                        <thead className="bg-white text-gray-600  ">
                            <tr className="max-md:text-xs">
                                <th className="border border-gray-300 py-1 px-3 md:py-2 md:px-4"></th>
                                <th className="border border-gray-300 py-1 px-3 md:py-2 md:px-4 ">Score</th>
                                <th className="border border-gray-300 py-1 px-3 md:py-2 md:px-4">Accuracy</th>
                                <th className="border border-gray-300 py-1 px-3 md:py-2 md:px-4">Correct</th>
                                <th className="border border-gray-300 py-1 px-3 md:py-2 md:px-4">Wrong</th>
                                <th className="border border-gray-300 py-1 px-3 md:py-2 md:px-4">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Compare.map((section, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-all duration-200 hover:font-bold">
                                    {/* Section Name */}
                                    <td className="border border-gray-300 py-1 px-3 md:py-2 md:px-4 text-center font-bold">
                                        {section.name}
                                    </td>

                                    {/* Score */}
                                    <td className="border relative text-center">
                                        <div className="w-full rounded py-1 md:py-2">
                                            <div
                                                className="h-full top-0 bottom-0 absolute"
                                                style={{
                                                    width: `${calculateWidth(section.score, section.totalscore)}%`,
                                                    backgroundColor:
                                                        calculateWidth(section.score, section.totalscore) > 50
                                                            ? "rgba(135, 206, 250, 0.9)" // Light Sky Blue
                                                            : "rgba(173, 216, 230, 0.7)", // Light Blue
                                                    borderRight: "4px solid rgba(0, 139, 139, 1)", // Darker Teal Border
                                                }}
                                            ></div>
                                        </div>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm text-black z-10">
                                            {section.score} / {section.totalscore}
                                        </span>
                                    </td>

                                    {/* Accuracy */}
                                    <td className="border relative text-center">
                                        <div className="w-full rounded h-12 md:h-14">
                                            <div
                                                className="h-full absolute"
                                                style={{
                                                    width: `${section.accuracy}%`,
                                                    backgroundColor:
                                                        section.accuracy === 100
                                                            ? "rgba(255, 255, 102, 0.7)" // Gold
                                                            : "rgba(255, 255, 102, 0.7)", // Light Yellow
                                                    borderRight:
                                                        section.accuracy === 100
                                                            ? "4px solid rgba(204, 164, 0, 1)" // Dark Gold Border
                                                            : "4px solid rgba(184, 134, 11, 1)", // Dark Yellow Border
                                                }}
                                            ></div>
                                        </div>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm text-black z-10">{section.accuracy}%</span>
                                    </td>

                                    {/* Correct */}
                                    <td className="border relative text-center">
                                        <div className="w-full rounded py-1 md:py-2">
                                            <div
                                                className="h-full top-0 bottom-0 absolute"
                                                style={{
                                                    width: `${calculateWidth(section.Correct, section.total)}%`,
                                                    backgroundColor:
                                                        calculateWidth(section.Correct, section.total) > 50
                                                            ? "rgba(144, 238, 144, 0.9)" // Light Green
                                                            : "rgba(152, 251, 152, 0.7)", // Pale Green
                                                    borderRight: "4px solid rgba(34, 139, 34, 1)", // Dark Green Border
                                                }}
                                            ></div>
                                        </div>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm text-black z-10">
                                            {section.Correct} / {section.total}
                                        </span>
                                    </td>

                                    {/* Wrong */}
                                    <td className="border relative text-center">
                                        <div className="w-full rounded py-1 md:py-2">
                                            <div
                                                className="h-full top-0 bottom-0 absolute"
                                                style={{
                                                    width: `${calculateWidth(section.wrong, section.total)}%`,
                                                    backgroundColor:
                                                        calculateWidth(section.wrong, section.total) > 50
                                                            ? "rgba(255, 182, 193, 1)"
                                                            : "rgba(255, 153, 153, 1)",
                                                    borderRight: "4px solid rgba(139, 0, 0, 1)",
                                                }}
                                            ></div>
                                        </div>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm text-black z-10">
                                            {section.wrong} / {section.total}
                                        </span>
                                    </td>

                                    {/* Time */}
                                    <td className="border relative text-center">
                                        <div className="w-full rounded py-1 md:py-2">
                                            <div
                                                className="h-full top-0 bottom-0 absolute"
                                                style={{
                                                    width: `${calculateWidth(section.time, section.maxTime)}%`,
                                                    backgroundColor:
                                                        calculateWidth(section.time, section.maxTime) > 50
                                                            ? "rgba(230, 230, 250, 1)" // Light Green
                                                            : "rgba(224, 176, 255, 1)", // Pale Green
                                                    borderRight: "4px solid rgba(75, 0, 130, 1)", // Dark Green Border
                                                }}
                                            ></div>
                                        </div>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 z-10">
                                            {section.time}:10 / {section.maxTime} mins
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>
        </>
    );
};

export default PerformanceSummary;
