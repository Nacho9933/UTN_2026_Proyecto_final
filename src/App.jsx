import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router'; 
import SplashScreen from './Components/SplashScreen/SplashScreen';
import StoryViewer from './Components/StoryViewer/StoryViewer';
import Sidebar from './Components/SideBar/SideBar';
import ChatView from './Components/ChatView/ChatView';
import Login from './Pages/Login/Login';
import { ChatProvider } from './Context/ChatProvider';
import { useChat } from './Context/ChatContext'; 
import './App.css';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <ChatView />
    </div>
  );
};

const AppRoutes = () => {
  const { userName } = useChat(); 

  return (
    <div className="whatsapp-clone-app">
      {userName && <StoryViewer />} 
      
      <Routes>
        <Route 
          path="/login" 
          element={!userName ? <Login /> : <Navigate to="/" />} 
        />

        <Route 
          path="/" 
          element={userName ? <MainLayout /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chat" 
          element={userName ? <MainLayout /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return <SplashScreen onFinished={() => setIsLoaded(true)} />;
  }

  return (
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
  );
};

export default App;