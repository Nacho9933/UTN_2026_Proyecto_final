import React, { useEffect } from 'react';
import { useChat } from '../../Context/ChatContext';

const StoryViewer = () => {
    const { activeStatus, closeStatus } = useChat();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeStatus();
            }
        };

        if (activeStatus) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeStatus, closeStatus]);

    if (!activeStatus) return null;

    return (
        <div className="status-overlay" onClick={closeStatus}>
            {}
            <button 
                className="close-status" 
                onClick={closeStatus}
                aria-label="Cerrar estado"
            >
                ×
            </button>
            
            <div className="status-video-container" onClick={e => e.stopPropagation()}>
                {}
                <video 
                    src={activeStatus} 
                    autoPlay 
                    muted 
                    onEnded={closeStatus} 
                />
            </div>
        </div>
    );
};

export default StoryViewer;