# UTN Proyecto Final PWI

Aplicación web estilo WhatsApp desarrollada con React + Vite.

## Tecnologías

- React 19
- Vite 7
- React Router 7
- React Icons
- ESLint

## Funcionalidades principales

- Login simple con persistencia de usuario en localStorage
- Sidebar de chats con búsqueda
- Vista de chat con envío de mensajes y respuesta automática de bot
- Estado de escritura y doble tilde
- Panel de información del contacto
- Story/estado en overlay
- Modo oscuro persistente

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+

## Instalación

1. Instalar dependencias:

	npm install

2. Iniciar entorno de desarrollo:

	npm run dev

3. Abrir en navegador:

	http://localhost:5173

## Scripts disponibles

- Desarrollo: npm run dev
- Build producción: npm run build
- Preview build: npm run preview
- Lint: npm run lint

## Deploy

El proyecto incluye configuración para Vercel en vercel.json con rewrite de SPA:

- source: /(.*)
- destination: /

Con eso, las rutas del frontend funcionan al refrescar en producción.

## Estructura relevante

- src/Components: UI principal (Sidebar, ChatView, StoryViewer, SplashScreen)
- src/Context: estado global del chat
- src/Pages/Login: pantalla de login
- src/data: datos mock de contactos y mensajes iniciales
- src/utils/constants.js: utilidades y respuestas del bot
