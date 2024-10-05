import React, { useState } from "react";
import * as mammoth from "mammoth";

const QuizFromWord = () => {
    const [questions, setQuestions] = useState([]); // Store questions and options
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
    const [selectedOption, setSelectedOption] = useState(""); // Track selected option
    const [isQuizStarted, setIsQuizStarted] = useState(false); // Control quiz flow

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        const reader = new FileReader();

        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            mammoth.extractRawText({ arrayBuffer })
                .then((result) => {
                    const rawText = result.value;
                    const parsedQuestions = parseQuestionsFromText(rawText);
                    setQuestions(parsedQuestions); // Store the parsed questions
                    setIsQuizStarted(true); // Start the quiz after file is processed
                    console.log(parsedQuestions[0]); // Log first question
                })
                .catch((error) => {
                    console.error("Error reading .docx file:", error);
                });
        };
        reader.readAsArrayBuffer(file);
    };

    const parseQuestionsFromText = (text) => {
        const lines = text.split("\n");
        const parsedQuestions = [];
        let currentQuestion = null;

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("Q:")) {
                if (currentQuestion) parsedQuestions.push(currentQuestion);
                currentQuestion = {
                    question: trimmedLine.slice(2).trim(),
                    options: []
                };
            } else if (trimmedLine.match(/^[A-D]:/)) {
                currentQuestion?.options.push({
                    label: trimmedLine.charAt(0),
                    text: trimmedLine.slice(2).trim()
                });
            }
        });
        if (currentQuestion) parsedQuestions.push(currentQuestion);
        return parsedQuestions;
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption("");

            // Log entire array of questions and the current question
            console.log("Current Question Array: ", questions);
            console.log("Navigated to Question: ", questions[nextQuestionIndex]);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption("");
        }
    };

    const handleQuestionNavigation = (index) => {
        setCurrentQuestionIndex(index);

        const selectedQuestion = questions[index]; // Access the question at the given index

        // Log the selected question object in the desired format
        if (selectedQuestion) {
            console.log({
                question: selectedQuestion.question,
                options: selectedQuestion.options
            });
        } else {
            console.error("No question found at this index.");
        }
        console.log(`Navigated to question: ${index + 1}`); // Optional logging for the question index
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Main Content */}
            <div className="w-full bg-white p-8 flex-1">
                <h1 className="text-xl font-bold mb-4">Upload Word File with Questions</h1>
                <input
                    type="file"
                    accept=".docx"
                    onChange={handleFileUpload}
                    className="mb-6 p-2 border border-gray-300 rounded"
                />

                {isQuizStarted && (
                    <div>

                        <div className="flex p-4">
                            {/* Left Column for the Question */}
                            <div className="w-1/2 pr-4 border-r">
                                <h2 className="text-lg font-semibold mb-4">
                                    {questions[currentQuestionIndex]?.question}
                                </h2>
                            </div>

                            {/* Right Column for the Options */}
                            <div className="w-1/2 pl-4">
                                <ul className="mb-4">
                                    {questions[currentQuestionIndex]?.options.map((option) => (
                                        <li key={option.label} className="mb-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="option"
                                                    value={option.label}
                                                    checked={selectedOption === option.label}
                                                    onChange={() => handleOptionSelect(option.label)}
                                                    className="mr-2"
                                                />
                                                {option.label}: {option.text}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={!selectedOption}
                                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>


                )}
            </div>

            {/* Sidebar (on the right) */}
            <div className="relative transition-all duration-300 ease-in-out bg-gray-200 p-4 border-l w-[25%] border-gray-300 h-screen">


                <div >
                    {/* User Section */}
                    <div className="flex items-center mb-4">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">A</div>
                        <span className="font-bold">Aditya</span>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center space-x-6 py-4">
                        {/* Answered */}
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
                            <span className="text-sm">Answered</span>
                        </div>

                        {/* Marked */}
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
                            <span className="text-sm">Marked</span>
                        </div>

                        {/* Not Visited */}
                        <div className="flex items-center space-x-1">
                            <div className="border border-gray-500 text-gray-700 w-6 h-6 text-xs flex justify-center items-center">
                                33
                            </div>
                            <span className="text-sm">Not Visited</span>
                        </div>

                        {/* Marked and Answered */}
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>

                            <span className="text-sm">Marked and answered</span>
                        </div>

                        {/* Not Answered */}
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
                            <span className="text-sm">Not Answered</span>
                        </div>
                    </div>


                    {/* Question Navigation */}
                    <div className="text-left mb-4">
                        <div className="py-2 flex justify-center items-center border border-y-2 border-y-gray-300">
                            <h3 className="font-bold mb-2 text-gray-500">SECTION: Reasoning Ability</h3>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`p-2 border ${index === currentQuestionIndex
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white text-black border-gray-400'
                                        }`}
                                    onClick={() => handleQuestionNavigation(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-300 flex flex-col items-center space-y-4">
                        <div className="flex space-x-4">
                            <button className="bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-md shadow md:py-2 md:px-4 max-md:py-1 max-md:px-2 max-md:text-sm">
                                Question Paper
                            </button>
                            <button className="bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-md shadow md:py-2 md:px-4 max-md:py-1 max-md:px-2 max-md:text-sm">
                                Instructions
                            </button>
                        </div>
                        <button className="bg-blue-500 w-[60%] text-white font-semibold py-2 px-8 rounded-md shadow md:px-8 max-md:py-2 max-md:px-4 max-md:text-sm">
                            Submit Test
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default QuizFromWord;
