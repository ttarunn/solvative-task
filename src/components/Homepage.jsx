import React, { useContext, useState } from 'react';
import RulesDialog from './ui/RulesDialog';
import ResponsiveStyles from './ui/ResponsiveStyles';
import { Context } from '../utils/Context';

const Homepage = ({ setStart }) => {

    const { name, setName, selectedTopic, setSelectedTopic } = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    
    const [errors, setErrors] = useState({
        name: false,
        topic: false,
    });

    const topics = [{id: 'js_basics', title: 'Javascript Basic'}, {id:'angular_basics', title: 'Angular Basic'}, {id:'react_advanced', title: 'React.js Advance'}, {id: 'flutter', title: 'Flutter'}];

    const handleStartQuiz = () => {
        const hasErrors = {
            name: name.trim() === '',
            topic: selectedTopic === null,
        };
        setErrors(hasErrors);
        if (!hasErrors.name && !hasErrors.topic) {
            setIsOpen(true)
            
        }
    };

    return (
        <div className='w-1/2 space-y-5'>
            <h1 className='leading-[5rem] font-medium text-6xl text-center'>
                Welcome to <span className='font-extralight text-[#B92B5D]'>QUIZ</span><span className='font-bold text-[#B92B5D]'>Mania</span>
            </h1>
            <div className='px-20 space-y-6'>
                <div className='rounded-lg bg-[#D9D9D94D] py-3 px-4 text-lg leading-6 space-y-2'>
                    <p className='text-[#373052]'>Please read all the rules about this quiz before you start.</p>
                    <RulesDialog isOpen={isOpen} setIsOpen={setIsOpen} setStart={setStart}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs font-normal' htmlFor='name'>Full Name</label>
                    <input 
                        type='text' 
                        className={`bg-transparent border-[1px] h-10 py-3 px-4 focus:ring-0 ${errors.name ? 'border-red-500' : ''}`} 
                        placeholder='Full Name' 
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs font-normal' htmlFor='topic'>Please select a topic to continue</label>
                    <div className='w-full flex gap-2 flex-wrap justify-between'>
                        {topics.map((topic, index) => (
                            <label
                                key={index}
                                htmlFor={topic?.id}
                                className={`flex items-center gap-2 cursor-pointer border-[1px] w-[45%] h-10 px-4 rounded-md ${
                                    selectedTopic === topic?.id ? 'border-[#B92B5D]' : 'border-gray-400'
                                }`}
                            >
                                <div className='relative mt-2'>
                                    <input
                                        type='radio'
                                        className={`appearance-none bg-transparent border-[1px] h-6 w-6 rounded-full cursor-pointer ${
                                            selectedTopic === topic?.id ? 'bg-[#B92B5D] border-[#B92B5D]' : 'border-gray-400'
                                        } focus:ring-0`}
                                        id={topic?.id}
                                        name='topic'
                                        value={topic?.id}
                                        onChange={() => setSelectedTopic(topic?.id)}
                                    />
                                    {selectedTopic === topic?.id && (
                                        <span className='absolute top-1 inset-0 flex justify-center items-center text-white h-4'>
                                            &#10003;
                                        </span>
                                    )}
                                </div>
                                <div className={`text-sm font-medium ${selectedTopic === topic?.id ? 'opacity-100' : 'opacity-50'}`}>
                                    {topic?.title}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    className={`w-fit px-8 h-10 text-white rounded-md bg-[#B92B5D] ${
                        (name.trim() && selectedTopic) ? '' : 'cursor-not-allowed opacity-45'
                    }`}
                    disabled={!name.trim() || !selectedTopic}
                    onClick={handleStartQuiz}
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default ResponsiveStyles(Homepage);
