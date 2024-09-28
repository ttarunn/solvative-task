import React, { useContext, useState } from "react";
import { Context } from "../../utils/Context";

const RulesDialog = ({isOpen, setIsOpen, setStart}) => {
  
    const { name, selectedTopic, setPage } = useContext(Context)
    const openDialog = () => setIsOpen(true);
    function closeDialog(){
        setIsOpen(false)
        if(name !== '' && selectedTopic !== null){
            setStart(true); 
            setPage('quiz')
        }
    }
  return (
    <div className="w-full">
      <p
        className="text-[#B92B5D] text-lg leading-6 hover:cursor-pointer hover:underline"
        onClick={openDialog}
      >
        Quiz Rules
      </p>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-[60%] max-h-[80vh] overflow-y-auto">
            <span
              onClick={()=> setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 text-2xl cursor-pointer hover:text-gray-800"
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Quiz Rules</h2>

            <div className="mb-4 mt-8 text-lg">
              <h3 className="font-bold mb-2 w-full bg-[#F3F3E9] rounded-md py-3 px-6">
                10-Second Timer
              </h3>
              <ul className="list-disc list-inside text-gray-600 py-3 px-3">
                <li>Each question comes with a 10-second timer.</li>
                <li>
                  If you don’t answer within the time limit, the app will
                  automatically move to the next question.
                </li>
              </ul>
            </div>

            <div className="mb-4 mt-8 text-lg">
              <h3 className="font-bold mb-2 w-full bg-[#F3F3E9] rounded-md py-3 px-6">
                Manual Navigation
              </h3>
              <ul className="list-disc list-inside text-gray-600 py-3 px-3">
                <li>
                  You can navigate to the next question manually before the
                  timer expires.
                </li>
                <li>
                  Use the "Next" button to move ahead if you’re ready before the
                  timer runs out.
                </li>
              </ul>
            </div>

            <div className="mb-4 mt-8 text-lg">
              <h3 className="font-bold mb-2 w-full bg-[#F3F3E9] rounded-md py-3 px-6">
                Final Score and Performance Message
              </h3>
              <ul className="list-disc list-inside text-gray-600 py-3 px-3">
                <li>After all questions are answered, your final score will be displayed.</li>
                <li>
                  Based on your performance, you will receive a personalized message:
                  <ul className="list-disc pl-11">
                    <li>Great job!: If you score above 80%.</li>
                    <li>Well done!: If you score between 60% and 80%.</li>
                    <li>Keep practicing!: If you score below 60%.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <button
              onClick={closeDialog}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesDialog;
