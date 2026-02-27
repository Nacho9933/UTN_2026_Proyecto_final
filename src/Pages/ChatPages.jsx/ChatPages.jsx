import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatView';

const ChatPage = () => {
    return (
        <div className="main-layout">
            <div className="sidebar-container-desktop">
                <Sidebar />
            </div>
            <ChatWindow />
        </div>
    );
};

export default ChatPage;