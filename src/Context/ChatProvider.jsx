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
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object') {
                    return parsed;
                }
            } catch {
                localStorage.removeItem('whatsapp_messages');
            }
        }
        const initialUser = localStorage.getItem('whatsapp_user') || 'Usuario';
        return initialMessages(initialUser);
    });

    const [activeStatus, setActiveStatus] = useState(null);
    const [isTyping, setIsTyping] = useState(null);
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
        setUserName('');
        navigate("/login"); 
    };

    const markAsRead = (contactId) => {
        setContacts(prevContacts => 
            prevContacts.map(contact => 
                String(contact.PhoneNumber) === String(contactId)
                    ? { ...contact, unread: 0 } 
                    : contact
            )
        );
    };

    const sendMessage = (contactId, text) => {
        if (!contactId || !text?.trim()) return;

        const normalizedContactId = String(contactId);
        const hora = formatTime(new Date());

        const generateSafeId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

        const newMessage = {
            id: generateSafeId(),
            text,
            author: userName,
            time: hora,
            status: 'sent'
        };

        setMessages(prev => {
            const chatActual = prev[normalizedContactId] || [];
            return {
                ...prev,
                [normalizedContactId]: [...chatActual, newMessage]
            };
        });

        setContacts(prevContacts => {
            const index = prevContacts.findIndex(c => String(c.PhoneNumber) === normalizedContactId);
            
            if (index > -1) {
                const copiaContactos = [...prevContacts];
                const [contactoMovido] = copiaContactos.splice(index, 1);
                return [contactoMovido, ...copiaContactos];
            }
            return prevContacts;
        });

        setIsTyping(normalizedContactId);

        setTimeout(() => {
            let botText = "No entendí muy bien, ¿me repetís?";

            try {
                botText = getBotResponse(userName, text);
            } catch (error) {
                console.error("Error en la respuesta del bot:", error);
            }

            setMessages(prev => {
                const chatActual = prev[normalizedContactId] || [];

                const chatActualizado = chatActual.map(msg => {
                    if (msg.author === userName && msg.status === 'sent') {
                        return { ...msg, status: 'read' };
                    }
                    return msg;
                });

                const contact = contactsData.find(c => String(c.PhoneNumber) === normalizedContactId);
                const contactName = contact ? contact.name : "Contacto";

                const reply = {
                    id: generateSafeId(),
                    text: botText,
                    author: contactName,
                    time: formatTime(new Date()),
                    status: 'read'
                };

                return {
                    ...prev,
                    [normalizedContactId]: [...chatActualizado, reply]
                };
            });

            setIsTyping(null);
        }, 2000);
    };

    return (
        <ChatContext.Provider value={{
            contacts, messages, sendMessage, userName, setUserName,
            isTyping, logout, openStatus, closeStatus, activeStatus,
            markAsRead
        }}>
            {children}
        </ChatContext.Provider>
    );
};