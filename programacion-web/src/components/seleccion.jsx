import React, { useState } from 'react';
import QuestionEditor from './QuestionEditor';
import QuestionList from './QuestionList';
import ExportOptions from './ExportOptions';
import '../styles/App.css';

const Seleccion = ({ userRole }) => {
  const [questions, setQuestions] = useState([]);
  const [activeTab] = useState('editor'); // Eliminamos setActiveTab si no se usa

  return (
    <div className="app">
      <div className="main-content">
        {activeTab === 'editor' && (
          <QuestionEditor 
            questions={questions} 
            setQuestions={setQuestions} 
            userRole={userRole}
          />
        )}
        {activeTab === 'list' && (
          <QuestionList questions={questions} />
        )}
        {activeTab === 'export' && userRole === 'professor' && (
          <ExportOptions questions={questions} />
        )}
      </div>
    </div>
  );
};

export default Seleccion;