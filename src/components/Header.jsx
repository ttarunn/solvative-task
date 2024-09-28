import React, { useContext } from 'react'
import { Context } from '../utils/Context'

const Header = () => {

    const { name, page, setPage, setSelectedTopic, setName } = useContext(Context)

    function exitQuiz(){
        setPage('')
        setName('')
        setSelectedTopic('')
    }

  return (
    <div className='w-full flex justify-between border-b-[1px] border-[#D9D9D9] px-20 py-4'>
        <h2 className='text-[#B92B5D] text-xl'><span className='font-extralight'>QUIZ</span><span className='font-bold'>Mania</span></h2>
        <div>
            {page === 'quiz' && <button className='w-fit px-6 h-9 text-[#B92B5D] border-[1px] border-[#B92B5D] rounded-md' onClick={()=> exitQuiz()}>Exit Quiz</button>}
            {page === 'end' && <h2 className='font-bold'>{name}</h2>}
        </div>
    </div>
  )
}

export default Header