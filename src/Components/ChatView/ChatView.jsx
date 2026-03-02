import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router'; 
import { useChat } from '../../Context/ChatContext';
import { 
    MdSearch, 
    MdMoreVert, 
    MdInsertEmoticon, 
    MdAttachFile, 
    MdSend, 
    MdMic,
    MdClose,
    MdDone,      
    MdDoneAll    
} from "react-icons/md";
import './ChatView.css';

const ChatView = () => {
    const [searchParams] = useSearchParams();
    const contactId = searchParams.get('contactId');
    const navigate = useNavigate(); 
    
    const { contacts, messages, sendMessage, isTyping, userName } = useChat();
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const [infoForContactId, setInfoForContactId] = useState(null);
    const showInfo = String(infoForContactId) === String(contactId);

    const currentContact = contacts.find(c => String(c.PhoneNumber) === String(contactId));
    
    const currentMessages = useMemo(() => {
        return messages[contactId] || [];
    }, [messages, contactId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages, isTyping]);

    const handleCloseChat = useCallback(() => {
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                if (showInfo) {
                    setInfoForContactId(null);
                } else {
                    handleCloseChat();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showInfo, handleCloseChat]);

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
        <div className="chat-layout-wrapper">
            <div className="chat-view-container">
                <header className="chat-header">
                    <div className="chat-header-info" onClick={() => setInfoForContactId(contactId)}>
                        <img src={currentContact.avatar} alt="avatar" className="chat-header-avatar" />
                        <div className="chat-header-text">
                            <h3>{currentContact.name}</h3>
                            {isTyping === contactId && <span className="typing-status">escribiendo...</span>}
                        </div>
                    </div>
                    <div className="chat-header-actions">
                        <button className="icon-btn" title="Buscar"><MdSearch /></button>
                        <button className="icon-btn" title="Menú"><MdMoreVert /></button>
                        <button className="icon-btn" title="Cerrar chat" onClick={handleCloseChat}>
                            <MdClose />
                        </button>
                    </div>
                </header>

                <div className="chat-body">
                    {currentMessages.map((msg) => {
                        const isMine = msg.author === userName;
                        return (
                            <div key={msg.id} className={`message-row ${isMine ? 'mine' : 'theirs'}`}>
                                <div className={`message-bubble ${isMine ? 'sent' : 'received'}`}>
                                    <span className="message-text">{msg.text}</span>
                                    
                                    <div className="message-meta">
                                        <span className="message-time">{msg.time}</span>
                                        {isMine && (
                                            <span className="message-ticks">
                                                {msg.status === 'sent' 
                                                    ? <MdDone className="tick" /> 
                                                    : <MdDoneAll className="tick read" />
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {isTyping === contactId && (
                        <div className="message-row theirs">
                            <div className="message-bubble received typing-indicator">
                                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

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
                    <button className="icon-btn" onClick={handleSend}>
                        {inputText.trim() ? <MdSend /> : <MdMic />}
                    </button>
                </footer>
            </div>

            {showInfo && (
                <aside className="contact-info-panel">
                    <header className="info-panel-header">
                        <button className="icon-btn" onClick={() => setInfoForContactId(null)}>
                            <MdClose />
                        </button>
                        <h2>Info. del contacto</h2>
                    </header>
                    <div className="info-panel-body">
                        <div className="info-profile-section">
                            <img src={currentContact.avatar} alt="Avatar grande" className="info-large-avatar" />
                            <h2 className="info-large-name">{currentContact.name}</h2>
                            <p className="info-large-phone">{currentContact.PhoneNumber || "+54 9 11 1234-5678"}</p>
                        </div>
                        
                        <div className="info-details-section">
                            <span className="info-label">Info.</span>
                            <p className="info-about">¡Hola! Estoy usando WhatsApp para Windows.</p>
                        </div>
                    </div>
                </aside>
            )}
            
        </div>
    );
};

export default ChatView;