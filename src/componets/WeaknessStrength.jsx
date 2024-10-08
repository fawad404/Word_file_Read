import React from "react";

const WeaknessStrengths = () => {
    // Data for weak chapters
    const chapters = [
        { id: 1, name: "Vocabulary", correctPercentage: 0, totalQuestions: 10, incorrect: [9, 6], correct: [3] },
        { id: 2, name: "Grammar", correctPercentage: 12.5, totalQuestions: 10, incorrect: [2, 3], correct: [1] },
        
        { id: 3, name: "Seating Arrangement", correctPercentage: 0, totalQuestions: 11, incorrect: [1], correct: [1] },
        { id: 4, name: "S23", correctPercentage: 0, totalQuestions: 11, incorrect: [1], correct: [1] }
    ];
    // Data for top rankers
    const rankers = [
        { rank: 1, name: "Shashank Tiwari", score: "100/100" },
        { rank: 2, name: "Ramu Mahalingam", score: "95/100" },
        { rank: 3, name: "Monami Choudhury", score: "88/100" },
        { rank: 4, name: "Abhishek Durga", score: "87.25/100" },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6">
            {/* Weak Chapters Section */}
            <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Your Weakness and Strengths</h2>
                <div className="flex space-x-4 mb-4">
                    <div className="text-blue-500 border-b-2 border-blue-500 pb-1">Weak Chapters</div>
                    <div className="text-gray-400">Uncategorized Chapters</div>
                </div>
                {chapters.map((chapter) => (

                    <div key={chapter.id} className="mb-6 flex flex-col md:flex-row justify-between w-full">
                        {/* Left Section with Chapter Details and Progress Bar */}
                        <div className="flex flex-col items-start w-full md:w-1/2">
                            <h3 className="font-semibold text-gray-700">{chapter.id}. {chapter.name}</h3>
                            <div className="w-full">
                                <div className="flex justify-start items-center mb-2">
                                    <span className="text-sm text-gray-500">Correct %: {chapter.correctPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded mb-2">
                                    <div
                                        className="h-2 bg-red-500 rounded"
                                        style={{ width: `${chapter.correctPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section with Question Circles */}
                        <div className="flex flex-wrap md:space-x-2 space-y-2 md:space-y-0 items-center justify-start md:justify-end w-full md:w-1/2">
                            {Array.from({ length: chapter.totalQuestions }, (_, i) => i + 1).map((number) => (
                                <div
                                    key={number}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${chapter.correct.includes(number) ? 'bg-green-500' : chapter.incorrect.includes(number) ? 'bg-red-500' : 'bg-gray-300'
                                        }`}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                    </div>


                ))}
            </div>

            {/* Top Rankers Section */}
            <div className="w-full lg:w-1/4 h-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Top Rankers</h2>
                {rankers.map((ranker) => (
                    <div key={ranker.rank} className="flex items-center mb-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">
                            {ranker.rank}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">{ranker.name}</h3>
                            <span className="text-sm text-gray-500">{ranker.score}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeaknessStrengths;
