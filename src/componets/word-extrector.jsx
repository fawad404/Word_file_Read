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
      // Extract the raw text from the docx file using mammoth
      mammoth.extractRawText({ arrayBuffer })
        .then((result) => {
          const rawText = result.value;
          // Parse the text to extract questions and options
          const parsedQuestions = parseQuestionsFromText(rawText);
          setQuestions(parsedQuestions); // Store the parsed questions
          setIsQuizStarted(true); // Start the quiz after file is processed
        })
        .catch((error) => {
          console.error("Error reading .docx file:", error);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to parse questions and options from the raw text
  const parseQuestionsFromText = (text) => {
    const lines = text.split("\n"); // Split the text into lines
    const parsedQuestions = [];
    let currentQuestion = null;

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("Q:")) {
        // Start a new question
        if (currentQuestion) parsedQuestions.push(currentQuestion); // Push previous question
        currentQuestion = {
          question: trimmedLine.slice(2).trim(), // Get the question text
          options: []
        };
      } else if (trimmedLine.match(/^[A-D]:/)) {
        // Match options starting with A:, B:, C:, D:
        currentQuestion?.options.push({
          label: trimmedLine.charAt(0), // Option label (A, B, C, D)
          text: trimmedLine.slice(2).trim() // Option text
        });
      }
    });
    if (currentQuestion) parsedQuestions.push(currentQuestion); // Push last question
    return parsedQuestions;
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); // Clear selected option for next question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(""); // Clear selected option for previous question
    }
  };

  return (
    <div>
      <h1>Upload Word File with Questions</h1>
      <input type="file" accept=".docx" onChange={handleFileUpload} />

      {isQuizStarted && (
        <div>
          {/* Display the current question */}
          <h2>{questions[currentQuestionIndex]?.question}</h2>
          <ul>
            {questions[currentQuestionIndex]?.options.map((option) => (
              <li key={option.label}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={option.label}
                    checked={selectedOption === option.label}
                    onChange={() => handleOptionSelect(option.label)}
                  />
                  {option.label}: {option.text}
                </label>
              </li>
            ))}
          </ul>

          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizFromWord;
