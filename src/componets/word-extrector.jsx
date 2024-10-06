import React, { useState, useEffect } from "react";
import * as mammoth from "mammoth";

const QuizFromWord = () => {
    const [questions, setQuestions] = useState([]); // Store questions and options
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
    const [selectedOption, setSelectedOption] = useState(""); // Track selected option
    const [isQuizStarted, setIsQuizStarted] = useState(false); // Control quiz flow

    useEffect(() => {
        const fileUrl = "/word-files/Uquestions.docx";  // Update to correct path
        fetch(fileUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                mammoth.extractRawText({ arrayBuffer })
                    .then(result => {
                        const rawText = result.value;
                        const parsedQuestions = parseQuestionsFromText(rawText);
                        setQuestions(parsedQuestions);
                        setIsQuizStarted(true);
                        console.log(parsedQuestions);  // Log parsed questions for debugging
                    })
                    .catch(error => {
                        console.error("Error extracting text from .docx file:", error);
                    });
            })
            .catch(error => {
                console.error("Error fetching the .docx file:", error);
            });
    }, []);


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
        <div className="flex h-screen w-screen">
            {/* Main Content */}
            <div className="w-screen bg-white flex-1">

                <div className="flex items-center max-md:items-start max-md:px-2 justify-between bg-gray-100 p-4 border-b border-gray-300 max-md:flex-col">
                    {/* Question Number */}
                    <div className="text-lg font-semibold  max-md:pb-8 ">
                        Question No.{currentQuestionIndex + 1}
                    </div>
                    <div className="flex flex-row space-x-4 gap-4 max-md:gap-1  justify-center items-center">


                        {/* Marks */}
                        <div className="flex items-center flex-col">
                            <div className="font-bold mb-2 text-sm">
                                <p>Marks</p>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex items-center text-sm justify-center bg-green-200 text-green-800 font-bold px-2 py-1 rounded-full mr-2">
                                    +1
                                </div>
                                <div className="flex items-center text-sm justify-center bg-red-200 text-red-800 font-bold px-2 py-1 rounded-full">
                                    -0.25
                                </div>
                            </div>
                        </div>
                        {/* Time */}
                        <div className="text-sm text-gray-600 flex flex-col">
                            <p>Time:</p>
                            <p>00.28</p>
                        </div>

                        {/* Language Selection */}
                        <div className="ml-4 flex flex-row justify-center items-center gap-2 ">
                            <p className="text-gray-600">View in:</p>
                            <select className="border border-gray-300 rounded-md p-1">
                                <option >English</option>
                                <option >Hindi</option>
                            </select>
                        </div>

                        {/* Report */}
                        <div className="ml-4 text-sm text-black cursor-pointer flex justify-center items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 54.264 54.264" fill="#9a9393" stroke="#9a9393">
                                <g>
                                    <g>
                                        <path d="M52.021,49.561c-0.011-0.001-0.02-0.001-0.029,0H2.244c-0.813,0-1.563-0.439-1.959-1.15 
      c-0.397-0.71-0.378-1.579,0.049-2.271L25.207,5.769c0.408-0.663,1.132-1.066,1.911-1.066c0.777,0,1.502,0.403,1.91,1.066 
      l24.704,40.098c0.332,0.392,0.532,0.897,0.532,1.451C54.265,48.556,53.261,49.561,52.021,49.561z M6.263,45.073h41.709 
      L27.118,11.224L6.263,45.073z"/>
                                    </g>
                                    <g>
                                        <path d="M27.116,38.89c0.584,0,1.082,0.205,1.492,0.612c0.408,0.412,0.613,0.907,0.613,1.49 c0,0.586-0.217,1.081-0.648,1.493 
      c-0.434,0.406-0.919,0.612-1.457,0.612c-0.537,0-1.022-0.206-1.455-0.612c-0.432-0.412-0.646-0.907-0.646-1.493 
      c0-0.583,0.203-1.078,0.613-1.49C26.036,39.094,26.532,38.89,27.116,38.89z M28.589,35.945h-2.944V18.062h2.944V35.945z"/>
                                    </g>
                                </g>
                            </svg>

                            <p>Report</p>
                        </div>
                    </div>
                </div>

                {isQuizStarted && (
                    <div className="px-20 py-20">

                        <div className="flex p-4 flex-row max-md:flex-col">
                            {/* Left Column for the Question */}
                            <div className="w-1/2 max-md:w-full pr-4 md:border-r max-md:border-b">
                                <h2 className="text-lg font-semibold mb-4">
                                    {questions[currentQuestionIndex]?.question}
                                </h2>
                            </div>

                            {/* Right Column for the Options */}
                            <div className="w-1/2 pl-4 max-md:mt-8">
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
            <div
                className={`max-md:fixed top-0 right-0 h-screen transition-transform duration-300 ease-in-out bg-gray-200 p-4 border-l border-gray-300 w-[25%] max-md:w-[75%] 
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full fixed'}`}
            >
                {/* Toggle Button */}
                <button
                    className="absolute -left-6 top-1/2 transform -translate-y-1/2 py-4 bg-gray-800 text-white hover:bg-gray-700"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? (
                        // "Close" Icon
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M9.29 16.29L4.71 12l4.58-4.29L10.59 8l-3.29 3.29L10.59 14l-1.3 1.29zm8.6 0l-4.58-4.29 4.58-4.29L15.41 8l3.29 3.29-3.29 3.29 1.3 1.29zM12 4v16m0 0H4m8 0h8" />
                        </svg>
                    ) : (
                        // "Open" Icon
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M14.71 7.29L19.29 12l-4.58 4.29L13.41 16l3.29-3.29L13.41 9l1.3-1.29zm-8.6 0l4.58 4.29-4.58 4.29L8.59 16l-3.29-3.29L8.59 9l-1.3-1.29zM12 20V4m0 0H4m8 0h8" />
                        </svg>
                    )}
                </button>




                <div>
                    {/* User Section */}
                    <div className="flex items-center mb-4 border border-b-gray-300 pb-4">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">A</div>
                        <span className="font-bold">Aditya</span>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap space-x-4 justify-center items-center py-4 rounded-lg">
                        {/* Answered */}
                        <div className="flex items-center justify-start space-x-1">
                            <div className="relative">
                                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" className="fill-current text-green-600">
                                    <path d="M 5 15 A 10 10 0 0 1 25 15 L 25 20 L 5 20 Z" />
                                    <text x="15" y="18" fill="white" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                                        1
                                    </text>
                                </svg>
                            </div>
                            <span className="text-sm">Answered</span>
                        </div>

                        {/* Marked */}
                        <div className="flex items-center justify-start space-x-1">
                            <div className="relative">
                                <svg className="w-6 h-6 fill-current text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="8" />
                                </svg>
                                <span className="absolute inset-0 flex justify-center items-center text-white text-xs font-bold">0</span>
                            </div>
                            <span className="text-sm">Marked</span>
                        </div>

                        {/* Not Visited */}
                        <div className="flex justify-start items-center space-x-1">
                            <div className="border border-gray-500 text-gray-700 w-5 h-5 text-xs flex justify-center items-center">33</div>
                            <span className="text-sm">Not Visited</span>
                        </div>

                        {/* Marked and Answered */}
                        <div className="flex items-center justify-start space-x-1">
                            <div className="relative">
                                <svg width="35" height="35" className="fill-current text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                    <circle cx="20" cy="20" r="8" />
                                    <text x="20" y="24" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">0</text>
                                    <path d="M 25 15 L 28 18 L 35 11" stroke="#28a745" strokeWidth="2" fill="none" />
                                </svg>
                            </div>
                            <span className="text-sm">Marked and Answered</span>
                        </div>

                        {/* Not Answered */}
                        <div className="flex items-center justify-start space-x-1">
                            <div className="relative">
                                <svg width="30" height="30" className="fill-current text-red-600" xmlns="http://www.w3.org/2000/svg">
                                    <path transform="rotate(180, 15, 15)" d="M 5 15 A 10 10 0 0 1 25 15 L 25 20 L 5 20 Z" />
                                    <text x="15" y="18" fill="white" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">1</text>
                                </svg>
                            </div>
                            <span className="text-sm">Not Answered</span>
                        </div>
                    </div>



                    {/* Question Navigation */}
                    <div className="text-left mb-4">
                        <div className="py-2 flex justify-center bg-blue-100 items-center border border-y-2 border-y-gray-300">
                            <h3 className="font-bold mb-2 text-gray-500">SECTION: Reasoning Ability</h3>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`p-2 border ${index === currentQuestionIndex ? 'bg-red-500 text-white' : 'bg-white text-black border-gray-400'}`}
                                    onClick={() => handleQuestionNavigation(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-300 flex flex-col items-center space-y-2">
                        <div className="flex space-x-4 max-md:flex-col">
                            <button className="bg-blue-200 text-blue-700  py-2 px-4 rounded-md shadow   max-lg:py-0 max-lg:px-0 max-lg:text-sm">
                                Question Paper
                            </button>
                            <button className="bg-blue-200 text-blue-700  py-2 px-4 rounded-md shadow   max-lg:py-0 max-lg:px-0 max-lg:text-sm">
                                Instructions
                            </button>
                        </div>
                        <button className="bg-blue-500 w-[60%] text-white  py-2 px-8 rounded-md shadow  max-lg:py-0 max-lg:px-0 max-lg:text-sm">
                            Submit Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizFromWord;
