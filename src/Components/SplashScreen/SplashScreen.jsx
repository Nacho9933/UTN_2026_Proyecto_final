import React, { useState, useEffect } from 'react';

const DURATION_MS = 7000; 
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
        <div className="loading-screen">
            <div className="loading-content">
                {}
                <div className="big-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA Logo" />
                </div>
                
                <div className="loading-bar-container">
                    <p>Instalando WhatsApp ...</p>
                    
                    {}
                    <div 
                        className="progress-bar" 
                        role="progressbar" 
                        aria-valuenow={Math.round(progress)} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                    >
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="percentage">{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;