import React, { useState, useEffect } from "react"; 
import { Link } from "react-router"; 
import { useChat } from "../../Context/ChatContext";
import { 
    MdOutlineChat, 
    MdOutlineDonutLarge, 
    MdOutlineGroups, 
    MdOutlineSettings, 
    MdPerson,
    MdSearch,
    MdDarkMode,
    MdLightMode
} from "react-icons/md";
import './SideBar.css'; 

const Sidebar = () => {
    const { contacts, logout, markAsRead, messages, openStatus } = useChat(); 

    const [searchTerm, setSearchTerm] = useState('');

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleLogout = () => {
        logout();
    };

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className="sidebar-wrapper">
            <nav className="nav-rail">
                <div className="nav-rail-top">
                    <button className="rail-icon active" title="Chats"><MdOutlineChat /></button>
                    <button className="rail-icon" title="Estados"><MdOutlineDonutLarge /></button>
                    <button className="rail-icon" title="Comunidades"><MdOutlineGroups /></button>
                </div>
                
                <div className="nav-rail-bottom">
                    <button className="rail-icon" title="Cambiar Tema" onClick={toggleTheme}>
                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                    <button className="rail-icon" title="Configuración"><MdOutlineSettings /></button>
                    <div className="rail-profile" title="Perfil"><MdPerson /></div>
                </div>
            </nav>

            <div className="sidebar-panel">
                <header className="sidebar-header">
                    <h2 className="panel-title">Chats</h2>
                    <button onClick={handleLogout} className="sidebar-logout-btn">Salir</button>
                </header>

                <div className="search-container">
                    <div className="search-box">
                        <MdSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Busca un chat o inicia uno nuevo" 
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <nav className="contact-list">
                    {filteredContacts.map(({ PhoneNumber, avatar, name, lastMsg, unread, time, statusVideo }) => {
                        
                        const contactMessages = messages[PhoneNumber] || [];
                        const hasMessages = contactMessages.length > 0;
                        const lastMessageObj = hasMessages ? contactMessages[contactMessages.length - 1] : null;
                        
                        const displayMsg = lastMessageObj ? lastMessageObj.text : lastMsg;
                        const displayTime = lastMessageObj ? lastMessageObj.time : time;

                        return (
                            <Link
                                key={PhoneNumber}
                                to={`/chat?contactId=${PhoneNumber}`}
                                className="contact-link"
                                onClick={() => markAsRead && markAsRead(PhoneNumber)}
                            >
                                <div 
                                    className={`avatar-container ${statusVideo ? 'has-status' : ''}`}
                                    onClick={(e) => {
                                        if (statusVideo) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openStatus(statusVideo);
                                        }
                                    }}
                                >
                                    <img src={avatar} alt={`Avatar de ${name}`} className="avatar" />
                                </div>

                                <div className="contact-info">
                                    <div className="contact-info-top">
                                        <span className="contact-name">{name}</span>
                                        <span className="msg-time">{displayTime}</span>
                                    </div>
                                    <div className="contact-info-bottom">
                                        <p className="last-message">{displayMsg}</p>
                                        {unread > 0 && (
                                            <span className="unread-badge">{unread}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    
                    {filteredContacts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '30px 20px', color: '#8696a0', fontSize: '14px' }}>
                            No se encontraron chats o contactos
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;