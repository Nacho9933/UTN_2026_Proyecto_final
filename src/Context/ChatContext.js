import { createContext, useContext } from 'react';

export const ChatContext = createContext();

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat debe usarse dentro de un ChatProvider");
    }
    return context;
};