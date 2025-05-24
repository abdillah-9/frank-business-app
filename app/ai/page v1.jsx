"use client"
import React from 'react';

const styles = {
  page: {
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
    background: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
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
};

// ✅ Child Component
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

// ✅ Parent Page Component
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
    {
      icon: '✅',
      title: 'Great job on transportation!',
      description: 'You stayed $50 under your transport budget. Keep it up!',
    },
  ];

  return (
    <div style={{overflow:"auto",height:"300px", backgroundColor:"red"}}>
    <div style={styles.page}>
      <h2 style={styles.heading}>AI Insights</h2>
      {suggestions.map((tip, index) => (
        <SuggestionCard
          key={index}
          {...tip}
          onApply={() => alert(`Applying tip: ${tip.title}`)}
          onDismiss={() => alert(`Dismissed tip: ${tip.title}`)}
        />
      ))}
    </div>
    </div>
  );
};

export default InsightsPage;
