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
                        console.log(parsedQuestions[0]); // Log first question
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


                        <div className="flex absolute  bottom-0  justify-between w-[60%] py-4">
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
                className={`max-md:fixed top-0 right-0 h-screen transition-transform duration-300 ease-in-out bg-blue-100 p-4 border-l border-gray-300 w-[25%] max-md:w-[75%] 
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
                    <div className=" bg-blue-100 rounded-lg w-full max-w-lg mx-auto">
                        {/* Status Counters */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-1">
                                <div className="border bg-green-500 text-white w-6 h-6 text-xs flex justify-center items-center">
                                    33
                                </div>
                                <span className="text-sm">Correct</span>
                            </div>

                            <div className="flex items-center space-x-1">
                                <div className="border border-gray-500 text-gray-700 w-6 h-6 text-xs flex justify-center items-center">
                                    33
                                </div>
                                <span className="text-sm text-wrap">Unattempted</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="border bg-red-500 text-white w-6 h-6 text-xs flex justify-center items-center">
                                    33
                                </div>
                                <span className="text-sm">Incorect</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="border bg-yellow-500 text-white w-6 h-6 text-xs flex justify-center items-center">
                                    33
                                </div>
                                <span className="text-sm">Not Visited</span>
                            </div>
                        </div>

                        {/* Speed Indicators */}
                        <div className="py-2 text-gray-600 font-semibold border border-y-gray-300 mb-2">
                            <p>Speed Indicators</p>
                        </div>
                        <div className="grid grid-cols-4 gap-3 mt-2">
                            {/* Superfast */}
                            <div className="flex flex-col items-center  rounded-lg ">
                                <svg version="1.1" id="Layer_1" className="w-6 h-6 text-gray-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 98.92 122.88" style={{ enableBackground: "new 0 0 98.92 122.88" }} xmlSpace="preserve">
                                    <style type="text/css">
                                        {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
                                    </style>
                                    <g>
                                        <path className="st0" d="M78.77,0c-3.29,39.36-48.34,13.5-65.45,46.28c-2.42,5.34-4.03,10.29-4.8,14.84
      c-1.26,1.55-2.42,3.22-3.45,5c-5.22,9.05-6.28,19.35-3.78,28.71c2.51,9.35,8.58,17.75,17.63,22.97c9.05,5.22,19.35,6.28,28.71,3.78
      c9.35-2.51,17.75-8.58,22.97-17.63c2.31-4,3.8-8.24,4.54-12.54c5.32-3.1,10.02-7.48,13.62-13.28c6.08-14.12-5.01-25.38,10.17-35.32
      c-9.38-4.72-15.1,0.16-20.58,9.7c-5.93,12.88-28.14-2.37-7.32-10.29C88.92,35.42,87.29,14.45,78.77,0L78.77,0L78.77,0z M37.02,84.91
      c0.11,0,0.23,0,0.34,0.01l13.03-9.76c1.51-1.13,3.66-0.83,4.79,0.68c1.13,1.51,0.83,3.66-0.68,4.79L41.6,90.3
      c-0.36,2.21-2.27,3.9-4.58,3.9c-2.56,0-4.64-2.08-4.64-4.64c0-0.49,0.08-0.96,0.22-1.41L19.33,77.89
      c-0.84-0.65-0.99-1.85-0.35-2.69c0.65-0.84,1.85-0.99,2.69-0.35l13.5,10.44C35.74,85.05,36.36,84.91,37.02,84.91L37.02,84.91z
      M53.96,57.11c16.06,9.27,21.08,28,11.8,44.06c-9.27,16.06-28,21.08-44.06,11.81c-16.06-9.27-21.08-28-11.8-44.06
      C19.18,52.86,37.9,47.84,53.96,57.11L53.96,57.11z"/>
                                    </g>
                                </svg>
                                <span className="text-xs mt-2 text-center">Superfast</span>
                            </div>

                            {/* On Time */}
                            <div className="flex flex-col items-center  rounded-lg ">
                                <svg
                                    className="w-6 h-6 text-gray-500"  // Tailwind classes for size and color
                                    fill="currentColor"                 // Inherits the text color (gray-500 in this case)
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 122.88 99.56"
                                    style={{ enableBackground: "new 0 0 122.88 99.56" }}
                                    xmlSpace="preserve"
                                >
                                    <style type="text/css">
                                        {`.st0{fill:#393939;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#38AE48;}`}
                                    </style>
                                    <g>
                                        <path className="st0" d="M73.1,0c6.73,0,13.16,1.34,19.03,3.78c6.09,2.52,11.57,6.22,16.16,10.81
      c4.59,4.58,8.28,10.06,10.81,16.17c2.43,5.87,3.78,12.3,3.78,19.03c0,6.73-1.34,13.16-3.78,19.03c-2.52,6.09-6.22,11.58-10.81,16.16
      c-4.58,4.59-10.06,8.28-16.17,10.81c-5.87,2.43-12.3,3.78-19.03,3.78c-6.73,0-13.16-1.34-19.03-3.77c-6.09-2.52-11.57-6.22-16.16-10.81
      l-0.01-0.01c-4.59-4.59-8.29-10.07-10.81-16.16c-0.78-1.89-1.45-3.83-2-5.82c1.04,0.1,2.1,0.15,3.17,0.15c2.03,0,4.01-0.18,5.94-0.53
      c0.32,0.96,0.67,1.91,1.05,2.84c2.07,5,5.11,9.51,8.9,13.29c3.78,3.78,8.29,6.82,13.29,8.9c4.81,1.99,10.11,3.1,15.66,3.1
      c5.56,0,10.85-1.1,15.66-3.1c5-2.07,9.51-5.11,13.29-8.9c3.78-3.78,6.82-8.29,8.9-13.29c1.99-4.81,3.1-10.11,3.1-15.66
      c0-5.56-1.1-10.85-3.1-15.66c-2.07-5-5.11-9.51-8.9-13.29c-3.78-3.78-8.29-6.82-13.29-8.9c-4.81-1.99-10.11-3.1-15.66-3.1
      c-5.56,0-10.85,1.1-15.66,3.1c-0.43,0.18-0.86,0.37-1.28,0.56c-1.64-2.58-3.62-4.92-5.89-6.95c1.24-0.64,2.51-1.23,3.8-1.77
      C59.94,1.34,66.37,0,73.1,0L73.1,0z M67.38,26.12c0-1.22,0.5-2.33,1.3-3.13c0.8-0.8,1.9-1.3,3.12-1.3c1.22,0,2.33,0.5,3.13,1.3
      c0.8,0.8,1.3,1.91,1.3,3.13v23.22l17.35,10.29c1.04,0.62,1.74,1.6,2.03,2.7c0.28,1.09,0.15,2.29-0.47,3.34
      c-0.62,1.04-1.6,1.74-2.7,2.03c-1.09,0.28-2.29,0.15-3.33-0.47L69.65,55.71c-0.67-0.37-1.22-0.91-1.62-1.55
      c-0.41-0.67-0.65-1.46-0.65-2.3V26.12L67.38,26.12z"/>
                                        <path className="st1" d="M26.99,2.56c14.91,0,26.99,12.08,26.99,26.99c0,14.91-12.08,26.99-26.99,26.99
      C12.08,56.54,0,44.45,0,29.55C0,14.64,12.08,2.56,26.99,2.56L26.99,2.56z M15.05,30.27c0.36-2.1,2.76-3.27,4.65-2.13
      c0.17,0.1,0.34,0.22,0.49,0.36l0.02,0.01c0.85,0.81,1.8,1.66,2.74,2.5l0.81,0.73l9.59-10.06c0.57-0.6,0.99-0.99,1.85-1.18
      c2.94-0.65,5.01,2.95,2.93,5.15L26.17,38.19c-1.13,1.2-3.14,1.31-4.35,0.16c-0.69-0.64-1.45-1.3-2.21-1.96
      c-1.32-1.15-2.67-2.32-3.77-3.48C15.18,32.25,14.89,31.17,15.05,30.27L15.05,30.27z"/>
                                    </g>
                                </svg>
                                <span className="text-xs mt-2 text-center">On Time</span>
                            </div>

                            {/* Slow */}
                            <div className="flex flex-col items-center rounded-lg ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512.44">
                                    <path fill="red" fill-rule="nonzero" d="M216.81 155.94c0-10.96 8.88-19.84 19.84-19.84 10.95 0 19.83 8.88 19.83 19.84v120.75l82.65 36.33c10.01 4.41 14.56 16.1 10.15 26.11-4.41 10.02-16.1 14.56-26.11 10.15l-93.5-41.1c-7.51-2.82-12.86-10.07-12.86-18.57V155.94zM9.28 153.53c-.54-1.88-.83-3.87-.83-5.92l.16-73.41c0-11.84 9.59-21.43 21.43-21.43 11.83 0 21.43 9.59 21.43 21.43l-.06 27.86a255.053 255.053 0 0144.08-45.53c16.78-13.47 35.57-25.04 56.18-34.24 64.6-28.81 134.7-28.73 195.83-5.31 60.67 23.24 112.56 69.47 141.51 133.25.56 1.01 1.03 2.07 1.41 3.17 28.09 64.15 27.83 133.6 4.6 194.21-22.33 58.29-65.87 108.46-125.8 137.98-.38.22-.76.42-1.16.62-12.44 6.14-25.46 11.26-38.74 15.3-4.96 1.46-10.12.99-14.68-1.46-15.1-8.13-12.86-30.46 3.53-35.45 8.78-2.7 17.32-5.87 25.67-9.6.41-.21.84-.4 1.27-.58 2-.91 3.99-1.85 5.96-2.82.53-.26 1.07-.5 1.62-.71 50.62-25.1 87.42-67.61 106.34-116.98 19.93-52.04 20.04-111.64-4.41-166.46l-.01-.02c-24.46-54.82-68.84-94.54-120.82-114.45-52.04-19.94-111.63-20.04-166.45 4.41a217.791 217.791 0 00-47.75 29.11 216.133 216.133 0 00-37.71 39.04l17.1-.97c11.83-.65 21.96 8.42 22.61 20.26.65 11.83-8.42 21.96-20.26 22.61l-69.71 3.94c-11.02.6-20.56-7.21-22.34-17.85zm237.66 358.9c17.55.55 26.69-20.55 14.26-32.98-3.57-3.45-7.9-5.35-12.86-5.56-11.92-.39-23.48-1.72-35.19-4.01-7.52-1.44-14.84 1.44-19.39 7.59-8.15 11.46-1.97 27.43 11.85 30.22a256.37 256.37 0 0041.33 4.74zm-119.12-34.22c11.75 6.79 26.54-.08 28.81-13.5 1.23-7.97-2.34-15.6-9.26-19.74-10.27-5.99-19.83-12.71-28.99-20.28-13.76-11.34-34.16.32-31.36 17.95.81 4.7 3.05 8.59 6.69 11.68a255.166 255.166 0 0034.11 23.89zm-88.67-86.32c8.88 14.11 30.17 11.17 34.88-4.84 1.51-5.36.76-10.83-2.17-15.57-6.29-10.03-11.7-20.52-16.31-31.43-6.2-14.74-26.7-15.97-34.56-2.04-2.94 5.15-3.3 11.48-1 16.94 5.36 12.77 11.8 25.21 19.16 36.94zM.66 274.2c.62 8.63 6.81 15.71 15.27 17.51 12.64 2.53 23.99-7.36 23.19-20.23-.85-11.87-.73-23.54.32-35.4.59-7.04-2.49-13.66-8.31-17.67-12.22-8.25-28.69-.5-30.08 14.17a257.06 257.06 0 00-.39 41.62z" />
                                </svg>
                                <span className="text-xs mt-2 text-center">Slow</span>
                            </div>

                            {/* On Time but not Correct */}
                            <div className="flex flex-col items-center  rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 122.88 122.87"
                                    className="w-6 h-6 text-red-500" // Set your desired color here
                                >
                                    <g>
                                        <path
                                            fill="currentColor" // This will take the color from the text color
                                            d="M33.04,38.05c19.9,19.19,34.44,39.39,49.12,64.97c7.72-8.39,9.65-11.22,3.66-23.28c-8.88-17.88-33.44-43.55-47.9-48.9c-1.73-0.64-3.32-0.96-4.67-0.92c-0.79,0.03-1.86,0.8-2.58,1.81C29.06,33.99,30.79,35.88,33.04,38.05L33.04,38.05z"
                                        />
                                        <path
                                            fill="currentColor" // Same here
                                            d="M88.74,15.17c-20.9,28.84-42.87,56.96-70.18,82.96c9.9,8.8,13.67,8.41,23.79-0.31C59.72,82.84,85.39,46.96,94.31,26.7c1.49-3.38,3.02-8.87-0.81-11.05C91.94,14.76,89.89,14.33,88.74,15.17z"
                                        />
                                    </g>
                                </svg>
                                <span className="text-xs mt-2 text-center">On Time but not Correct</span>
                            </div>
                        </div>
                    </div>



                    {/* Question Navigation */}
                    <div className="text-left mb-2">
                        <div className="py-2 flex justify-center bg-blue-100 items-center border border-y-2 border-y-gray-300">
                            <h3 className="font-bold mb-2 text-gray-500">SECTION: Reasoning Ability</h3>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mt-4 overflow-y-scroll scroll-section">
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
                        <div className="flex space-x-4 max-md:flex-col space-y-4">
                            <button className="bg-blue-200 text-blue-700  py-2 px-4 rounded-md shadow   max-lg:py-0 max-lg:px-0 max-lg:text-sm">
                                Question Paper
                            </button>
                            <button className="bg-blue-200 text-blue-700  py-2   px-4 rounded-md shadow   max-lg:py-0 max-lg:px-0 max-lg:text-sm">
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
