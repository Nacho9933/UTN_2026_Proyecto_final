export const formatTime = (date) => {
    return date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

export const getBotResponse = (userName, text) => {
    const msg = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const rules = [
        {
            keywords: ['hola', 'buenas', 'buen dia'],
            response: `¡Hola ${userName}! ¿Cómo andas?`
        },
        {
            keywords: ['como estas', 'todo bien', 'que tal'],
            response: 'Todo excelente por acá, viviendo adentro de tu código 🤖. ¿Y vos cómo estás?'
        },
        {
            keywords: ['precio', 'cuanto sale', 'costo'],
            response: 'Te cuento que los precios dependen del servicio. ¿De qué producto te gustaría saber más?'
        },
        {
            keywords: ['gracias', 'te agradezco'],
            response: '¡De nada! Es un placer ayudarte. ¿Necesitás algo más?'
        },
        {
            keywords: ['chau', 'nos vemos', 'adios'],
            response: `¡Nos vemos, ${userName}! Que tengas un gran día. 👋`
        },
        {
            keywords: ['ayuda', 'no entiendo', 'problema'],
            response: '¡Tranqui! Explicame bien cuál es el problema y lo resolvemos paso a paso.'
        },
        {
            keywords: ['jaja', 'jeje', 'jajaja', '😂', '🤣'],
            response: 'Jajaja, ¡totalmente! 😂'
        }
    ];

    const match = rules.find(rule => 
        rule.keywords.some(keyword => msg.includes(keyword))
    );

    if (match) {
        return match.response;
    }

    const defaultResponses = [
        "Mmm, interesante. Contame un poco más.",
        "No estoy seguro de entender a qué te referís. ¿Me lo explicás con otras palabras?",
        "¡Claro, entiendo perfecto!",
        "Uy, mirá vos qué locura...",
        "¡Tal cual! Pienso exactamente lo mismo."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};