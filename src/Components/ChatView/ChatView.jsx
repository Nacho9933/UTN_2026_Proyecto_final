import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router'; 
import { useChat } from '../../Context/ChatContext';
import { 
    MdSearch, 
    MdMoreVert, 
    MdInsertEmoticon, 
    MdAttachFile, 
    MdSend, 
    MdMic 
} from "react-icons/md";
import './ChatView.css';

const ChatView = () => {
    const [searchParams] = useSearchParams();
    const contactId = searchParams.get('contactId');
    
    const { contacts, messages, sendMessage, isTyping } = useChat();
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const currentContact = contacts.find(c => c.PhoneNumber === contactId);
    
    const currentMessages = useMemo(() => messages[contactId] || [], [messages, contactId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (inputText.trim() !== '') {
            sendMessage(contactId, inputText);
            setInputText('');
        }
    };

    if (!currentContact) {
        return (
            <div className="chat-empty-state">
                <div className="empty-state-content">
                    <h2>WhatsApp para Windows</h2>
                    <p>Envía y recibe mensajes sin mantener tu teléfono conectado.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-view-container">
            {}
            <header className="chat-header">
                <div className="chat-header-info">
                    <img src={currentContact.avatar} alt="avatar" className="chat-header-avatar" />
                    <div className="chat-header-text">
                        <h3>{currentContact.name}</h3>
                        {}
                        {isTyping === contactId && <span className="typing-status">escribiendo...</span>}
                    </div>
                </div>
                <div className="chat-header-actions">
                    <button className="icon-btn"><MdSearch /></button>
                    <button className="icon-btn"><MdMoreVert /></button>
                </div>
            </header>

            {}
            <div className="chat-body">
                {currentMessages.map((msg) => {
                    const isMine = msg.status === 'sent';
                    return (
                        <div key={msg.id} className={`message-row ${isMine ? 'mine' : 'theirs'}`}>
                            <div className={`message-bubble ${isMine ? 'sent' : 'received'}`}>
                                <span className="message-text">{msg.text}</span>
                                <span className="message-time">{msg.time}</span>
                            </div>
                        </div>
                    );
                })}
                
                {}
                {isTyping === contactId && (
                    <div className="message-row theirs">
                        <div className="message-bubble received typing-indicator">
                            <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                        </div>
                    </div>
                )}
                {}
                <div ref={messagesEndRef} />
            </div>

            {}
            <footer className="chat-footer">
                <button className="icon-btn"><MdInsertEmoticon /></button>
                <button className="icon-btn attach-btn"><MdAttachFile /></button>
                
                <form className="chat-input-form" onSubmit={handleSend}>
                    <input 
                        type="text" 
                        placeholder="Escribe un mensaje" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </form>
                
                {}
                <button className="icon-btn" onClick={handleSend}>
                    {inputText.trim() ? <MdSend /> : <MdMic />}
                </button>
            </footer>
        </div>
    );
};

export default ChatView;