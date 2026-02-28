import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { useChat } from '../../Context/ChatContext';
import { MdOutlineWhatsapp } from "react-icons/md"; 
import './Login.css';

const Login = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    
    const { setUserName } = useChat();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (user.trim() !== '' && pass.trim() !== '') {
            setUserName(user);
            
            if (onLogin) {
                onLogin();
            }
            
            navigate('/');
        }
    };

    return (
        <div className="login-wrapper">
            {}
            <div className="login-header-band"></div>
            
            {}
            <div className="login-card">
                <div className="login-card-header">
                    <MdOutlineWhatsapp className="login-icon" />
                    <h2>WhatsApp Web</h2>
                </div>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Nombre de usuario</label>
                        <input 
                            type="text" 
                            placeholder="Ej: Lucas" 
                            value={user} 
                            onChange={(e) => setUser(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={pass} 
                            onChange={(e) => setPass(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="login-button">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;