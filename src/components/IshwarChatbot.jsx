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
  FiCheckCircle,
  FiFastForward,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { portfolioApi } from "../lib/api";
import "./IshwarChatbot.css";

const quickQuestions = [
  "Tell me about Ishwar",
  "What skills does Ishwar have?",
  "Show me his projects",
  "Are you open to freelance / hire?",
  "How can I contact him?",
];

function getBotReply(message) {
  const text = message.toLowerCase();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("hii") ||
    text.includes("namaste")
  ) {
    return "Hey! 👋 Welcome to Ishwar's portfolio. I'm Ishwar Assistant. I can tell you about his skills, projects, experience, tech stack, and how to get in touch.";
  }

  if (
    text.includes("about") ||
    text.includes("who is") ||
    text.includes("ishwar")
  ) {
    return "Ishwar Sharma is a passionate Full Stack Developer who works with Java, Spring Boot, React, Node.js, JavaScript, and modern web technologies. He enjoys building scalable, user-friendly applications.";
  }

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("tech stack") ||
    text.includes("language")
  ) {
    return "Ishwar's core stack includes Java, Spring Boot, React.js, Node.js, Express, JavaScript, HTML5/CSS3, MySQL, MongoDB, Git/GitHub, and REST APIs.";
  }

  if (
    text.includes("project") ||
    text.includes("work") ||
    text.includes("portfolio")
  ) {
    return "Some of Ishwar's featured projects include TeamTrack (Employee Activity Monitoring Platform), TheKissanCity (E-Commerce Platform), Uni10 (Modern E-Commerce), and SkillServe Academy. You can explore all details on the Projects page.";
  }

  if (
    text.includes("experience") ||
    text.includes("job") ||
    text.includes("career")
  ) {
    return "Ishwar has hands-on development experience in full-stack web applications, REST APIs, and database engineering. You can view his detailed timeline on the Experience page.";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("freelance") ||
    text.includes("reach") ||
    text.includes("phone")
  ) {
    return "You can reach Ishwar via email at ishwarweb@gmail.com, or send a message through the Contact page. He is open to freelance projects and full-time opportunities.";
  }

  if (
    text.includes("react") ||
    text.includes("spring") ||
    text.includes("java") ||
    text.includes("node")
  ) {
    return "Yes! These form the core of Ishwar's development toolkit. He combines React on the frontend with Java / Spring Boot and Node.js for scalable backend services.";
  }

  if (
    text.includes("location") ||
    text.includes("where") ||
    text.includes("city") ||
    text.includes("rohtak")
  ) {
    return "Ishwar is based in Rohtak, Haryana, India, and is open to remote as well as on-site collaborations.";
  }

  if (
    text.includes("resume") ||
    text.includes("cv")
  ) {
    return "You can review and download Ishwar's resume from the Experience page or by clicking Resume on the header.";
  }

  if (
    text.includes("thank") ||
    text.includes("thanks")
  ) {
    return "You're very welcome! 😊 If there's anything else you'd like to know about Ishwar, feel free to ask!";
  }

  return "That's an interesting question! 😊 I can help you with Ishwar's background, technical skills, completed projects, experience, or getting in touch. Try asking one of those!";
}

export default function IshwarChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Lead Collection State: 'name' | 'contact' | 'company' | 'completed'
  const [leadStep, setLeadStep] = useState(() => {
    const isDone = sessionStorage.getItem("ishwar_lead_done");
    return isDone === "true" ? "completed" : "name";
  });

  const [leadData, setLeadData] = useState({
    name: "",
    contact: "",
    company: "",
  });

  const [messages, setMessages] = useState(() => {
    const isDone = sessionStorage.getItem("ishwar_lead_done");
    if (isDone === "true") {
      return [
        {
          id: 1,
          sender: "bot",
          text: "Hi! 👋 Welcome back. I'm Ishwar Assistant.",
          time: "Now",
        },
        {
          id: 2,
          sender: "bot",
          text: "Feel free to ask me anything about Ishwar's skills, projects, experience, or hire availability!",
          time: "Now",
        },
      ];
    }
    return [
      {
        id: 1,
        sender: "bot",
        text: "Hi! 👋 Welcome to Ishwar's portfolio. I'm Ishwar Assistant.",
        time: "Now",
      },
      {
        id: 2,
        sender: "bot",
        text: "Before we get started, may I please know your name?",
        time: "Now",
      },
    ];
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping, leadStep]);

  // Handle lead generation steps or conversational Q&A
  const sendMessage = async (customMessage = null, isSkipAction = false) => {
    const rawText =
      typeof customMessage === "string"
        ? customMessage
        : message.trim();

    if (!rawText && !isSkipAction) return;
    if (isTyping) return;

    setMessage("");

    // 1. LEAD ONBOARDING: STEP 1 - NAME
    if (leadStep === "name") {
      const visitorName = rawText;
      const userMsg = {
        id: Date.now(),
        sender: "user",
        text: visitorName,
        time: "Now",
      };
      setMessages((prev) => [...prev, userMsg]);
      setLeadData((prev) => ({ ...prev, name: visitorName }));
      setLeadStep("contact");
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Nice to meet you, ${visitorName}! 😊 Could you please share your Email or Phone number so Ishwar can connect with you?`,
            time: "Now",
          },
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    // 2. LEAD ONBOARDING: STEP 2 - CONTACT DETAIL
    if (leadStep === "contact") {
      const visitorContact = rawText;
      const userMsg = {
        id: Date.now(),
        sender: "user",
        text: visitorContact,
        time: "Now",
      };
      setMessages((prev) => [...prev, userMsg]);
      setLeadData((prev) => ({ ...prev, contact: visitorContact }));
      setLeadStep("company");
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Great! What company or organization do you represent? (You can also skip this if you'd like)`,
            time: "Now",
          },
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    // 3. LEAD ONBOARDING: STEP 3 - COMPANY NAME (WITH SKIP OPTION)
    if (leadStep === "company") {
      const isSkipping =
        isSkipAction ||
        rawText.toLowerCase() === "skip" ||
        rawText.toLowerCase() === "skip company";

      const companyName = isSkipping ? "Not Specified" : rawText;

      const userMsg = {
        id: Date.now(),
        sender: "user",
        text: isSkipping ? "Skipped Company Name" : companyName,
        time: "Now",
      };
      setMessages((prev) => [...prev, userMsg]);

      const finalLead = {
        name: leadData.name || "Portfolio Visitor",
        contact: leadData.contact || "Not Provided",
        company: companyName,
      };

      setLeadData(finalLead);
      setLeadStep("completed");
      sessionStorage.setItem("ishwar_lead_done", "true");
      setIsTyping(true);

      // Save lead to MongoDB backend
      portfolioApi.sendChatbotLead(finalLead).catch((err) => {
        console.error("Failed to auto-save chatbot lead to MongoDB:", err);
      });

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Thank you, ${finalLead.name}! 🎉 Your inquiry details have been saved for Ishwar. You can now ask me anything about his skills, projects, experience, or hire availability!`,
            time: "Now",
          },
        ]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // 4. REGULAR CONVERSATIONAL MODE (Q&A with case-insensitive admin database matching)
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: rawText,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // First attempt: Query database for Admin-configured Q&A (Case-Insensitive & Keyword matching)
      const res = await portfolioApi.queryChatbot(rawText);

      let reply = "";
      if (res && res.matched && res.answer) {
        reply = res.answer;
      } else {
        // Fallback to intelligent local portfolio responses
        reply = getBotReply(rawText);
      }

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
      }, 700);
    } catch (error) {
      console.warn("Server chatbot query failed, using local assistant fallback:", error);
      const reply = getBotReply(rawText);
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
      }, 600);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Get dynamic input placeholder
  const getInputPlaceholder = () => {
    if (leadStep === "name") return "Type your name...";
    if (leadStep === "contact") return "Your email or phone number...";
    if (leadStep === "company") return "Company name (or click Skip)...";
    return "Ask me something about Ishwar...";
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
                title="Minimize"
              >
                <FiMinus />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                title="Close"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="ishwar-chat-body">
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
                    <p style={{ whiteSpace: "pre-line" }}>{item.text}</p>
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

          {/* Quick Questions Chips / Skip Action */}
          {leadStep === "company" && (
            <div className="quick-questions" style={{ padding: "8px 12px", background: "rgba(10, 27, 42, 0.95)" }}>
              <button
                type="button"
                onClick={() => sendMessage(null, true)}
                style={{
                  background: "linear-gradient(135deg, rgba(21, 151, 255, 0.25), rgba(0, 111, 255, 0.35))",
                  borderColor: "rgba(21, 151, 255, 0.6)",
                  color: "#ffffff",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FiFastForward /> Skip Company Name
              </button>
            </div>
          )}

          {leadStep === "completed" && (
            <div className="quick-questions">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  disabled={isTyping}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="ishwar-chat-input-area">
            <div className="chat-input-box">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getInputPlaceholder()}
                disabled={isTyping}
                autoFocus
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
                Contact Directly
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
              <small>Click to resume chat</small>
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