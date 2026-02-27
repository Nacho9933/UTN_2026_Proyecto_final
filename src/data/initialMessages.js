export const initialMessages = (userName) => {
    return {
        "1123456789": [
            {
                id: crypto.randomUUID(),
                text: "Hola, ¿cómo venís con la entrega del proyecto?",
                author: "Sofía Martínez",
                time: "09:30",
                status: 'read'
            },
            {
                id: crypto.randomUUID(),
                text: "¡Hola Sofi! Todo re bien, ya casi lo termino.",
                author: userName,
                time: "09:35",
                status: 'read'
            },
            {
                id: crypto.randomUUID(),
                text: "¡Dale! Nos vemos mañana a las 10.",
                author: "Sofía Martínez",
                time: "09:40",
                status: 'read'
            }
        ],
        "1198765432": [
            {
                id: crypto.randomUUID(),
                text: "Che, te acabo de mandar el reporte al mail.",
                author: "Lucas Gómez",
                time: "14:15",
                status: 'read'
            },
            {
                id: crypto.randomUUID(),
                text: "¿Pudiste revisar el archivo?",
                author: "Lucas Gómez",
                time: "14:16",
                status: 'read'
            }
        ]
        
    };
};