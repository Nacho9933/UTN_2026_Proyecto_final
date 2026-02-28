import React, { useState, useEffect } from 'react';
import { MdLockOutline } from "react-icons/md";
import './SplashScreen.css';

const DURATION_MS = 3000;
const INTERVAL_MS = 100;
const INCREMENT = 100 / (DURATION_MS / INTERVAL_MS);

const SplashScreen = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return oldProgress + INCREMENT;
            });
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    }, []); 

    useEffect(() => {
        if (progress >= 100) {
            const finishTimer = setTimeout(onFinished, 500);
            return () => clearTimeout(finishTimer);
        }
    }, [progress, onFinished]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                {}
                <div className="splash-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo" />
                </div>
                
                {}
                <div className="splash-progress-container">
                    <div 
                        className="splash-progress-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                {}
                <h1 className="splash-title">WhatsApp</h1>
                <div className="splash-encryption">
                    <MdLockOutline /> End-to-end encrypted
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;