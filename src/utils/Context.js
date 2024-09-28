import React, { createContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [name, setName] = useState('');
  const [page, setPage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [answers, setAnswers] = useState(Array(10).fill(""));


  return (
    <Context.Provider value={{ name, setName, page, setPage, selectedTopic, setSelectedTopic, answers, setAnswers }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
