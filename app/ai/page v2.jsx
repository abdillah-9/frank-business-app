"use client";

import React, { useState, useEffect } from 'react';

const styles = {
  page: {
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
    background: '#f9f9f9',
    minHeight: '100vh',
  },
  sectionTitle: {
    fontSize: '22px',
    marginTop: '24px',
    marginBottom: '16px',
  },
  card: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    marginBottom: '16px',
    padding: '16px',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: '28px',
    marginRight: '16px',
  },
  content: {
    flex: 1,
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '18px',
  },
  description: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    color: '#555',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    color: '#666',
    border: '1px solid #ddd',
  },
  chatContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  },
  message: {
    marginBottom: '12px',
    fontSize: '14px',
  },
  assistant: {
    color: '#333',
  },
  user: {
    color: '#007bff',
    fontWeight: 'bold',
  },
};

const SuggestionCard = ({ icon, title, description, onApply, onDismiss }) => (
  <div style={styles.card}>
    <div style={styles.icon}>{icon}</div>
    <div style={styles.content}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={onApply}
        >
          Apply Tip
        </button>
        <button
          style={{ ...styles.button, ...styles.secondaryButton }}
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  </div>
);

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: 'Hi! Need help with your budget today?' },
  ]);

  const handleReply = (reply) => {
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: reply },
      { from: 'assistant', text: 'Analyzing... 🧠' },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          from: 'assistant',
          text:
            reply.includes('tips')
              ? 'You’ve been overspending on takeout. Want a custom plan?'
              : 'Try reviewing your biggest category weekly to stay on track.',
        },
      ]);
    }, 1200);
  };

  return (
    <div style={styles.chatContainer}>
      {messages.map((msg, i) => (
        <div key={i} style={styles.message}>
          <span style={msg.from === 'user' ? styles.user : styles.assistant}>
            {msg.from === 'user' ? 'You: ' : 'AI: '}
          </span>
          {msg.text}
        </div>
      ))}
      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={() => handleReply('Give me some tips')}
        >
          Ask for Tips
        </button>
        <button
          style={{ ...styles.button, ...styles.secondaryButton }}
          onClick={() => handleReply('How’s my budget')}
        >
          Check My Budget
        </button>
      </div>
    </div>
  );
};

const InsightsPage = () => {
  const suggestions = [
    {
      icon: '💸',
      title: 'Cut down on food delivery',
      description:
        'You spent $180 on food delivery this month. Try cooking at home to save $60.',
    },
    {
      icon: '📉',
      title: 'You’re over budget',
      description:
        'Your entertainment budget was $100, but you’ve spent $140. Consider pausing subscriptions.',
    },
  ];

  return (
    <div style={styles.page}>
      <h2 style={styles.sectionTitle}>AI Insights</h2>
      {suggestions.map((tip, index) => (
        <SuggestionCard
          key={index}
          {...tip}
          onApply={() => alert(`Applying tip: ${tip.title}`)}
          onDismiss={() => alert(`Dismissed tip: ${tip.title}`)}
        />
      ))}

      <h2 style={styles.sectionTitle}>Smart Assistant</h2>
      <ChatAssistant />
    </div>
  );
};

export default InsightsPage;
