import React from "react";
import { Link, useNavigate } from "react-router"; 
import { useChat } from "../../Context/ChatContext";
import { 
    MdOutlineChat, 
    MdOutlineDonutLarge, 
    MdOutlineGroups, 
    MdOutlineSettings, 
    MdPerson,
    MdSearch 
} from "react-icons/md";
import './Sidebar.css';

const Sidebar = () => {
    const { contacts, setUserName, markAsRead } = useChat(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserName(''); 
        navigate('/login'); 
    };

    return (
        <aside className="sidebar-wrapper">
            
            <nav className="nav-rail">
                <div className="nav-rail-top">
                    <button className="rail-icon active" title="Chats">
                        <MdOutlineChat />
                    </button>
                    <button className="rail-icon" title="Estados">
                        <MdOutlineDonutLarge />
                    </button>
                    <button className="rail-icon" title="Comunidades">
                        <MdOutlineGroups />
                    </button>
                </div>
                
                <div className="nav-rail-bottom">
                    <button className="rail-icon" title="Configuración">
                        <MdOutlineSettings />
                    </button>
                    <div className="rail-profile" title="Perfil">
                        <MdPerson />
                    </div>
                </div>
            </nav>

            <div className="sidebar-panel">
                <header className="sidebar-header">
                    <h2 className="panel-title">Chats</h2>
                    <button onClick={handleLogout} className="sidebar-logout-btn">
                        Salir
                    </button>
                </header>

                <div className="search-container">
                    <div className="search-box">
                        <MdSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Busca un chat o inicia uno nuevo" 
                            className="search-input"
                        />
                    </div>
                </div>

                <nav className="contact-list">
                    {}
                    {contacts.map(({ PhoneNumber, avatar, name, lastMsg, unread }) => (
                        <Link
                            key={PhoneNumber}
                            to={`/chat?contactId=${PhoneNumber}`}
                            className="contact-link"
                            onClick={() => markAsRead && markAsRead(PhoneNumber)}
                        >
                            <img src={avatar} alt={`Avatar de ${name}`} className="avatar" />
                            
                            <div className="contact-info">
                                <div className="contact-info-top">
                                    <span className="contact-name">{name}</span>
                                    <span className="msg-time">10:42</span>
                                </div>
                                <div className="contact-info-bottom">
                                    <p className="last-message">{lastMsg}</p>
                                    
                                    {}
                                    {unread > 0 && (
                                        <span className="unread-badge">{unread}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
            
        </aside>
    );
};

export default Sidebar;