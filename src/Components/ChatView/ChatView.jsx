import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router";
import { useChat } from "../../Context/ChatContext";
import "./ChatView.css";

const ChatView = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId") || "";
  const navigate = useNavigate();
  const {
    contacts,
    messages,
    sendMessage,
    userName,
    isTyping,
    openStatus,
  } = useChat();

  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  const contact = useMemo(
    () => contacts.find((c) => c.PhoneNumber === contactId),
    [contacts, contactId],
  );

  const chatMessages = useMemo(
    () => messages[contactId] || [],
    [messages, contactId],
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(contactId, text);
    setText("");
  };

  if (!contact)
    return <div className="error-message">Contacto no encontrado</div>;

  return (
    <div className="conversation-view">
      <header className="chat-header">
        <Link to="/" className="back-btn">
          ←
        </Link>
        <div className="chat-header-content">
          <img
            src={contact.avatar}
            alt={`Avatar de ${contact.name}`}
            className="avatar"
            onClick={() => openStatus(contact.statusVideo)}
            style={{ cursor: "pointer" }}
          />
          <div className="header-info">
            <h3 className="contact-name">{contact.name}</h3>
            <span className="contact-status">
              {isTyping === contactId ? "Escribiendo..." : "En línea"}
            </span>
          </div>
        </div>
        {}
        <button onClick={() => navigate("/")} className="logout-btn">
          Cerrar Chat
        </button>
      </header>

      <main className="message-area">
        {chatMessages.map((m) => (
          <div
            key={m.id}
            className={`msg-bubble ${m.author === userName ? "me" : "them"}`}
          >
            <p>{m.text}</p>
            <div className="msg-footer">
              <span className="msg-time">{m.time}</span>
              {}
              {m.author === userName && (
                <div
                  className={`msg-status ${m.status === "read" ? "read" : ""}`}
                >
                  ✓✓
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </main>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" className="send-btn">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatView;
