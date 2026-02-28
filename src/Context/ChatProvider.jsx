import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { formatTime, getBotResponse } from '../utils/constants';
import { contactsData } from '../data/contactsData';
import { initialMessages } from "../data/initialMessages";
import { ChatContext } from './ChatContext';

export const ChatProvider = ({ children }) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('whatsapp_user') || 'Usuario';
    });

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('whatsapp_messages');
        if (saved) return JSON.parse(saved);
        const initialUser = localStorage.getItem('whatsapp_user') || 'Usuario';
        return initialMessages(initialUser);
    });

    const [activeStatus, setActiveStatus] = useState(null);
    const [isTyping, setIsTyping] = useState(null);

    // 1. CAMBIO CLAVE: Convertimos los contactos en un estado de React
    const [contacts, setContacts] = useState(contactsData);

    useEffect(() => {
        localStorage.setItem('whatsapp_user', userName);
    }, [userName]);

    useEffect(() => {
        localStorage.setItem('whatsapp_messages', JSON.stringify(messages));
    }, [messages]);

    const openStatus = (videoUrl) => setActiveStatus(videoUrl);
    const closeStatus = () => setActiveStatus(null);

    const logout = () => {
        localStorage.removeItem('whatsapp_user');
        localStorage.removeItem('whatsapp_messages');
        setUserName('Usuario');
        navigate("/"); 
    };

    // 2. NUEVA FUNCIÓN: Busca al contacto y le pone la propiedad unread en 0
    const markAsRead = (contactId) => {
        setContacts(prevContacts => 
            prevContacts.map(contact => 
                contact.PhoneNumber === contactId 
                    ? { ...contact, unread: 0 } 
                    : contact
            )
        );
    };

    const sendMessage = (contactId, text) => {
        const hora = formatTime(new Date());

        const newMessage = {
            id: crypto.randomUUID(),
            text,
            author: userName,
            time: hora,
            status: 'sent'
        };

        setMessages(prev => ({
            ...prev,
            [contactId]: [...(prev[contactId] || []), newMessage]
        }));

        setIsTyping(contactId);

        setTimeout(() => {
            const contact = contacts.find(c => c.PhoneNumber === contactId);

            if (contact) {
                const reply = {
                    id: crypto.randomUUID(),
                    text: getBotResponse(userName, text),
                    author: contact.name,
                    time: formatTime(new Date()),
                    status: 'read'
                };

                setMessages(prev => {
                    const chatActual = prev[contactId] || [];
                    const chatActualizado = chatActual.map(m =>
                        m.author === userName ? { ...m, status: 'read' } : m
                    );

                    return {
                        ...prev,
                        [contactId]: [...chatActualizado, reply]
                    };
                });
                setIsTyping(null);
            }
        }, 2000);
    };

    return (
        <ChatContext.Provider value={{
            contacts, messages, sendMessage, userName, setUserName,
            isTyping, logout, openStatus, closeStatus, activeStatus,
            markAsRead // 3. EXPORTAMOS LA FUNCIÓN: La agregamos al contexto
        }}>
            {children}
        </ChatContext.Provider>
    );
};