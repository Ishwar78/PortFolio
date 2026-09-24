import React, { useEffect, useRef, useState } from "react";
import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiCpu,
  FiUser,
  FiMinus,
  FiArrowRight,
  FiCode,
  FiBriefcase,
  FiMail,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./IshwarChatbot.css";

// const quickQuestions = [
//   "Tell me about Ishwar",
//   "What skills does Ishwar have?",
//   "Show me his projects",
//   "How can I contact him?",
// ];

function getBotReply(message) {
  const text = message.toLowerCase();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("hii")
  ) {
    return "Hey! 👋 Welcome to Ishwar's portfolio. I'm Ishwar Chatbot. I can tell you about his skills, projects, experience and how to contact him.";
  }

  if (
    text.includes("about") ||
    text.includes("who is") ||
    text.includes("ishwar")
  ) {
    return "Ishwar Sharma is a Full Stack Developer who works with Java, Spring Boot, React, Node.js, JavaScript and modern web technologies. He enjoys building scalable and user-friendly applications.";
  }

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("tech stack")
  ) {
    return "Ishwar works with Java, Spring Boot, React, Node.js, JavaScript, HTML5, CSS3, MySQL, MongoDB, Git, GitHub and AWS. He focuses on full-stack web development.";
  }

  if (
    text.includes("project") ||
    text.includes("work") ||
    text.includes("portfolio")
  ) {
    return "Some featured projects include an E-Commerce Shopping Cart, Hotel Booking Management System and Expense Tracker. You can explore the complete project collection from the Projects page.";
  }

  if (
    text.includes("experience") ||
    text.includes("job") ||
    text.includes("career")
  ) {
    return "Ishwar has experience working with Java, Spring Boot, REST APIs, databases and frontend technologies. His professional journey also includes technical support and supervision responsibilities.";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("freelance")
  ) {
    return "You can contact Ishwar through the Contact page or email him at ishwarweb@gmail.com. He is open to discussing projects, collaborations and opportunities.";
  }

  if (
    text.includes("react") ||
    text.includes("spring") ||
    text.includes("java") ||
    text.includes("node")
  ) {
    return "Yes! These are part of Ishwar's main development stack. He combines React on the frontend with technologies such as Java, Spring Boot and Node.js for backend development.";
  }

  if (
    text.includes("location") ||
    text.includes("where") ||
    text.includes("rohtak")
  ) {
    return "Ishwar is based in Rohtak, Haryana, India.";
  }

  if (
    text.includes("resume") ||
    text.includes("cv")
  ) {
    return "You can use the Resume / Contact options on the portfolio to connect with Ishwar and discuss his professional profile.";
  }

  if (
    text.includes("thank") ||
    text.includes("thanks")
  ) {
    return "You're welcome! 😊 If you want to know more about Ishwar, just ask me about his skills, projects or experience.";
  }

  return "That's an interesting question! 😊 I can currently help you with Ishwar's profile, skills, projects, experience, technologies and contact information. Try asking one of those.";
}

export default function IshwarChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm Ishwar Assistant.",
      time: "Now",
    },
    {
      id: 2,
      sender: "bot",
      text: "I can help you explore Ishwar's skills, projects, experience and contact information.",
      time: "Now",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = (customMessage = null) => {
    const finalMessage =
      typeof customMessage === "string"
        ? customMessage
        : message.trim();

    if (!finalMessage || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: finalMessage,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    const reply = getBotReply(finalMessage);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: reply,
          time: "Now",
        },
      ]);

      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="ishwar-chat-launcher"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          aria-label="Open Ishwar Chatbot"
        >
          <span className="chat-pulse"></span>

          <span className="launcher-icon">
            <FiMessageCircle />
          </span>

          <span className="launcher-text">
            <small>Need help?</small>
            <strong>Ishwar Chatbot</strong>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="ishwar-chat-window">

          {/* Header */}
          <div className="ishwar-chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar">
                <FiCpu />
                <span></span>
              </div>

              <div>
                <h3>Ishwar Chatbot</h3>
                <p>
                  <span className="online-dot"></span>
                  Online · Portfolio Assistant
                </p>
              </div>
            </div>

            <div className="chat-header-actions">
              <button
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize chatbot"
              >
                <FiMinus />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="ishwar-chat-body">

            {/* <div className="chat-welcome">
              <div className="welcome-icon">
                <FiCpu />
              </div>

              <h4>Welcome to Ishwar's Portfolio 👋</h4>

              <p>
                Ask me anything about Ishwar's skills, projects,
                experience or availability.
              </p>
            </div> */}

            <div className="chat-messages">
              {messages.map((item) => (
                <div
                  className={`chat-message-row ${item.sender}`}
                  key={item.id}
                >
                  {item.sender === "bot" && (
                    <div className="message-avatar bot-avatar">
                      <FiCpu />
                    </div>
                  )}

                  <div className="chat-message">
                    <p>{item.text}</p>
                    <span>{item.time}</span>
                  </div>

                  {item.sender === "user" && (
                    <div className="message-avatar user-avatar">
                      <FiUser />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="chat-message-row bot">
                  <div className="message-avatar bot-avatar">
                    <FiCpu />
                  </div>

                  <div className="typing-message">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>
          </div>

          {/* Quick Questions */}
          {/* <div className="quick-questions">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
                disabled={isTyping}
              >
                {question}
              </button>
            ))}
          </div> */}

          {/* Input */}
          <div className="ishwar-chat-input-area">
            <div className="chat-input-box">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me something..."
                disabled={isTyping}
              />

              <button
                onClick={() => sendMessage()}
                disabled={!message.trim() || isTyping}
                aria-label="Send message"
              >
                <FiSend />
              </button>
            </div>

            <div className="chat-input-footer">
              <span>
                <FiCpu /> Ishwar AI Assistant
              </span>

              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <FiMail />
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Minimized bar */}
      {isOpen && isMinimized && (
        <div className="ishwar-chat-minimized">
          <div
            className="mini-chat-left"
            onClick={() => setIsMinimized(false)}
          >
            <div className="mini-avatar">
              <FiCpu />
            </div>

            <div>
              <strong>Ishwar Chatbot</strong>
              <small>Click to continue chatting</small>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >
            <FiX />
          </button>
        </div>
      )}
    </>
  );
}