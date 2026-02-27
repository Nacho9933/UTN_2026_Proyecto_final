import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { useChat } from '../../Context/ChatContext';
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
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                {}
                <h2>Iniciar Sesión</h2>
                
                {}
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)} 
                    aria-label="Nombre de usuario"
                    required 
                />
                
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    aria-label="Contraseña"
                    required 
                />
                
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;