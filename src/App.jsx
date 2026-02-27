import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import StoryViewer from './Components/StoryViewer/StoryViewer';
import Sidebar from './Components/SideBar/SideBar';
import ChatView from './Components/ChatView/ChatView';
import Login from './Pages/Login/Login.jsx';
import { ChatProvider } from './Context/ChatProvider';
import './App.css';


const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);


  if (!isLoaded) {
    return <SplashScreen onFinished={() => setIsLoaded(true)} />;
  }

  return (
      <ChatProvider>
        <div className="whatsapp-clone-app">
          <StoryViewer />
          <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ChatProvider>
  );
};

export default App;