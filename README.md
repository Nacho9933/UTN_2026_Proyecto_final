# WhatsApp Web Clone - React.js

Un clon funcional y altamente detallado de la interfaz de WhatsApp Web, construido con **React.js**. Este proyecto no es solo una maqueta visual, sino que incluye lógica de estado global, persistencia de datos, un bot de respuestas automáticas y una arquitectura de componentes escalable.

## Características Principales

### Experiencia de Chat Auténtica
* **Respuestas Automáticas (Bot):** Al enviar un mensaje, un bot simula estar "escribiendo..." y responde automáticamente después de 2 segundos.
* **Tildes de Lectura Dinámicos:** Los mensajes enviados muestran un tilde gris (`Enviado`), que cambia automáticamente a un doble tilde azul (`Leído`) en el momento exacto en que el contacto responde.
* **Auto-Scroll:** El chat hace scroll suave automáticamente hacia abajo cuando llega un nuevo mensaje.
* **Ordenamiento Inteligente:** Al igual que en la app real, el chat que recibe o envía un nuevo mensaje salta automáticamente al primer lugar en el panel lateral (Sidebar).

### Diseño y UI/UX
* **Modo Oscuro Global:** Interruptor de tema (Claro/Oscuro) que transforma toda la aplicación usando la paleta de colores oficial de WhatsApp. La preferencia se guarda en el `localStorage` para recordarla en futuras visitas.
* **Visor de Estados (Stories):** Los contactos con estados disponibles muestran un anillo verde alrededor de su foto de perfil. Al hacer clic en la foto, se abre un visor de video inmersivo a pantalla completa con soporte para autoplay y cierre automático.
* **Panel de Información del Contacto:** Al hacer clic en la cabecera del chat, se desliza un panel lateral derecho mostrando la información detallada del contacto (Foto en grande, número, estado "Info").
* **Atajos de Teclado:** Soporte nativo para la tecla `Escape` (`Esc`) para cerrar el chat activo, ocultar el panel de información o salir del visor de estados.

### Funcionalidades Extra
* **Buscador en Tiempo Real:** Filtra la lista de contactos al instante según el texto ingresado.
* **Persistencia de Datos:** El nombre de usuario y el historial de mensajes de todos los chats se guardan en el `localStorage`, por lo que no se pierden al recargar la página.
* **Autenticación Simulada:** Pantalla de Login inicial para establecer el nombre de usuario (Splash Screen incluido).

## Tecnologías Utilizadas

* **React 18** (Hooks: `useState`, `useEffect`, `useRef`, `useMemo`)
* **React Router Dom** (Navegación y protección de rutas)
* **Context API** (`ChatProvider` para manejo de estado global)
* **CSS3 Puro** (Flexbox, animaciones, variables CSS, scrollbars personalizadas)
* **React Icons** (Material Design Icons para la iconografía oficial)

## Estructura del Proyecto

La aplicación está modularizada en componentes para mantener el código limpio y escalable:
* `SideBar/`: Maneja la lista de contactos, el buscador y el interruptor de Modo Oscuro.
* `ChatView/`: Renderiza la ventana de mensajes, los inputs y el panel de Info del contacto.
* `StoryViewer/`: Componente overlay para la reproducción de estados en pantalla completa.
* `Context/`: Contiene la lógica de negocio (`ChatContext.jsx` y `ChatProvider.jsx`).
* `Data/`: Base de datos simulada de contactos y mensajes iniciales.

