import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import RoleSelector from './components/RoleSelector';
import QuestionEditor from './components/QuestionEditor';
import QuestionList from './components/QuestionList';
import ExportOptions from './components/ExportOptions';

function App() {
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
}

export default App;