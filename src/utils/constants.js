export const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
};

export const getBotResponse = (userName, userText) => {
    const respuestas = [
        `¡Qué bueno ${userName}! Coincido totalmente con vos.`,
        "¡Dale, buenísimo! Lo anoto.",
        `Interesante eso que decís: "${userText}"... lo voy a pensar.`,
        "Jajaja tal cual, me hiciste reír 😂",
        "Ahora justo estoy entrando a una reunión, ¡hablamos en un rato!",
        `¡Perfecto ${userName}! Quedamos así entonces.`,
        "No te puedo creer, ¡qué locura!",
        "Ah mirá vos, no la tenía a esa.",
        `Che ${userName}, me encantó la idea. ¡Hagámoslo!`,
        "Entiendo perfecto. Cualquier cosa avisame."
    ];
    return respuestas[Math.floor(Math.random() * respuestas.length)];
};