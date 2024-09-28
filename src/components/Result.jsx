import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../utils/Context'

const Result = () => {

  const { setPage, setSelectedTopic, setName, answers } = useContext(Context)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [notAnsweredCount, setNotAnsweredCount] = useState(0)
  const [score, setScore] = useState(0)

  function exitQuiz() {
    setPage('')
    setName('')
    setSelectedTopic('')
  }

  useEffect(() => {
    let correct = 0
    let incorrect = 0
    let notAnswered = 0

    answers.forEach(answer => {
      if (answer === '') {
        notAnswered++
      } else if (answer.selected === answer.correct) {
        correct++
      } else {
        incorrect++
      }
    })

    setCorrectCount(correct)
    setIncorrectCount(incorrect)
    setNotAnsweredCount(notAnswered)

    const calculatedScore = Math.round((correct / 10) * 100)
    setScore(calculatedScore)
  }, [answers])

  return (
    <div className='w-1/2 space-y-10 flex flex-col items-center'>
      <div className='w-full text-center space-y-4'>
        {score >= 70 && <p className='text-3xl tracking-[0.5em]'>CONGRATULATIONS</p>}
        
        {score >= 70 ? <p>You successfully completed the Quiz and hold</p> : <p>You successfully completed the Quiz but you need to</p>}

        {score < 70 && <p className='text-3xl tracking-[0.5em]'>Keep practicing!</p>}
      </div>

      <div className='w-full text-center space-y-4'>
        <p className='text-xl tracking-normal leading-8'>Your Score</p>
        <p className={`text-4xl font-bold ${score > 70 ? 'text-[#06AF52]' : 'text-[#AF9B06]'}`}>{score}%</p>
        <p className='text-2xl tracking-normal leading-8 font-bold'>
          {score >= 70 ? 'Great job!' : 'Keep Practicing!'}
        </p>
      </div>

      <div className='w-full flex flex-col items-center justify-center text-center space-y-4'>
        <p className='text-lg tracking-normal leading-6 w-fit font-semibold'>Out of 10 questions</p>
        <div className='w-1/2 flex justify-around text-sm'>
          <p><span className='text-[#06AF52] font-bold'>{correctCount}</span> correct</p>
          <p><span className='text-[#AF0606] font-bold'>{incorrectCount}</span> incorrect</p>
          <p><span className='text-[#8D8D8D] font-bold'>{notAnsweredCount}</span> not answered</p>
        </div>
      </div>

      <button className='w-fit px-6 h-9 text-[#B92B5D] border-[1px] border-[#B92B5D] rounded-md' onClick={() => exitQuiz()}>
        Retake Quiz
      </button>
    </div>
  )
}

export default Result
