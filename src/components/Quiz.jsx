import React, { useState, useEffect, useContext } from "react";
import quizSampleQuestions from "../utils/quizSampleQuestions.json";
import { Context } from "../utils/Context";

const Quiz = () => {
    
  const { selectedTopic, setPage, answers, setAnswers } = useContext(Context);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const questions = quizSampleQuestions.categories.find(
    (cat) => cat.id === selectedTopic
  ).questions;
 

  useEffect(() => {
    const timer = isTimerActive
      ? setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime === 1) {
              handleNextQuestion();
              return 10;
            }
            return prevTime - 1;
          });
        }, 1000)
      : null;

    return () => clearInterval(timer);
  }, [isTimerActive, currentQuestionIndex]);

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      selected: selectedOption,
      correct: correctAnswer,
    };
    setAnswers(newAnswers);

    setIsTimerActive(false);

    setTimeout(() => {
      if (currentQuestionIndex < 9) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
        setTimeLeft(10);
        setIsTimerActive(true);
      } else if (currentQuestionIndex == 9) {
        setPage("end");
      }
    }, 1500);
  };

  const handleSkipQuestion = () => {
    setIsTimerActive(false);
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setTimeLeft(10);
      setIsTimerActive(true);
    } else if (currentQuestionIndex == 9) {
      setPage("end");
    }
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / 10) * 100;

  return (
    <div className="w-1/2 mx-auto space-y-5">
      <div className="w-full space-y-2">
        <div className="flex justify-between w-full">
          <div className="flex justify-center items-center">
            <p className="text-center font-semibold">
              <span className="text-[#B92B5D] mr-1 text-xl">
                {currentQuestionIndex + 1}
              </span>
              /10
            </p>
          </div>
          <div className="py-2 px-4 bg-[#E9E8E3] rounded-sm">
            <p className="text-center text-[#2E2E2E] font-semibold">
              0:{timeLeft < 10 ? "0" + timeLeft : timeLeft}
            </p>
          </div>
        </div>
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className="absolute h-full bg-[#B92B5D] rounded"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="p-4 rounded-md">
        <h3 className="font-medium text-lg">
          {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
        </h3>

        <div className="mt-4 flex gap-2 flex-wrap">
          {questions[currentQuestionIndex].options.map((option, index) => {
            const isSelected = selectedOption === option.split(".")[0];
            let borderColor = "";

            if (
              answers[currentQuestionIndex] &&
              questions[currentQuestionIndex].correctAnswer ===
                option.split(".")[0]
            ) {
              borderColor = "border-green-500";
            }

            return (
              <label
                key={index}
                className={`flex w-[45%] gap-2 items-center cursor-pointer border-2 ${borderColor} p-1 rounded`}
              >
                <input
                  type="radio"
                  name="quizOption"
                  value={option.split(".")[0]}
                  checked={isSelected}
                  onChange={() => handleOptionSelect(option.split(".")[0])}
                  className={`appearance-none bg-transparent border-2 h-6 w-6 rounded-full cursor-pointer ${
                    isSelected ? "bg-[#B92B5D]" : "border-gray-400"
                  } focus:ring-0`}
                  
                />
                {isSelected && (
                  <span className="absolute top-1 inset-0 flex justify-center items-center text-white h-4">
                    &#10003;
                  </span>
                )}
                <span
                  className={`text-sm font-medium ${
                    isSelected ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {option.split(".")[1]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full flex px-4">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          className={`mt-4 w-fir px-3 h-10 bg-[#B92B5D] text-white rounded-md ${
            !selectedOption ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next Question
        </button>
        <button
          onClick={handleSkipQuestion}
          className={`mt-4 w-fir px-3 h-10 rounded-md`}
        >
          Skip this question
        </button>
      </div>
    </div>
  );
};

export default Quiz;
