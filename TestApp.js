import React from 'react';

const TestApp = () => {
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#fff',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{color: '#44DBC8', textAlign: 'center'}}>
        🏆 Referral Leaderboard Test
      </h1>
      
      <div style={{
        backgroundColor: '#2a2a2a',
        borderRadius: '12px',
        padding: '20px',
        margin: '20px 0',
        borderLeft: '4px solid #44DBC8'
      }}>
        <h2>🥇 Test User 1</h2>
        <p style={{color: '#44DBC8'}}>TEST123</p>
        <div style={{
          backgroundColor: '#40709A',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          <strong>1</strong> people
        </div>
      </div>
      
      <div style={{
        backgroundColor: '#2a2a2a',
        borderRadius: '12px',
        padding: '20px',
        margin: '20px 0',
        borderLeft: '4px solid #C0C0C0'
      }}>
        <h2>🥈 Test User 2</h2>
        <p style={{color: '#44DBC8'}}>TEST456</p>
        <div style={{
          backgroundColor: '#40709A',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          <strong>0</strong> people
        </div>
      </div>
      
      <p style={{textAlign: 'center', marginTop: '40px', color: '#44DBC8'}}>
        ✅ React is working! Now let's load the real data...
      </p>
    </div>
  );
};

export default TestApp;
