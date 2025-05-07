import React, { useState } from 'react';
import Navbar from './Navbar';
import RoleSelector from './RoleSelector';
import QuestionEditor from './QuestionEditor';
import QuestionList from './QuestionList';
import ExportOptions from './ExportOptions';
import '../styles/App.css';


const Seleccion = () => {
  const [userRole, setUserRole] = useState('professor');
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="app">
      <Navbar userRole={userRole} />
      <RoleSelector userRole={userRole} setUserRole={setUserRole} />

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
