import React from "react";
import { Link, useNavigate } from "react-router"; 
import { useChat } from "../../Context/ChatContext";
import './Sidebar.css';

const Sidebar = () => {
    const { contacts, setUserName } = useChat(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserName(''); 
        navigate('/login'); 
    };

    return (
        <aside className="sidebar-wrapper">
            
            {}
            <nav className="nav-rail">
                <div className="nav-rail-top">
                    <button className="rail-icon active" title="Chats">💬</button>
                    <button className="rail-icon" title="Estados">⭕</button>
                    <button className="rail-icon" title="Comunidades">👥</button>
                </div>
                
                <div className="nav-rail-bottom">
                    <button className="rail-icon" title="Configuración">⚙️</button>
                    <div className="rail-profile" title="Perfil">
                        <span role="img" aria-label="Avatar del usuario">👤</span>
                    </div>
                </div>
            </nav>

            {}
            <div className="sidebar-panel">
                <header className="sidebar-header">
                    <h2 className="panel-title">Chats</h2>
                    <button onClick={handleLogout} className="sidebar-logout-btn">
                        Salir
                    </button>
                </header>

                <nav className="contact-list">
                    {contacts.map(({ PhoneNumber, avatar, name, lastMsg }) => (
                        <Link
                            key={PhoneNumber}
                            to={`/chat?contactId=${PhoneNumber}`}
                            className="contact-link"
                        >
                            <img src={avatar} alt={`Avatar de ${name}`} className="avatar" />
                            <div className="contact-info">
                                <strong>{name}</strong>
                                <p className="last-message">{lastMsg}</p>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
            
        </aside>
    );
};

export default Sidebar;