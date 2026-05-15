
import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0B0E14',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>✅ Planify QA v2.0.0</h1>
      <p style={{ fontSize: '18px', color: '#888', marginBottom: '40px' }}>Sistema completamente operacional</p>
      
      <div style={{
        backgroundColor: '#161B22',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '500px',
        border: '1px solid #5B21B6'
      }}>
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>✅ React 19.2.3</li>
          <li style={{ margin: '10px 0' }}>✅ TypeScript 5.8</li>
          <li style={{ margin: '10px 0' }}>✅ Vite 6.4.1</li>
          <li style={{ margin: '10px 0' }}>✅ Conexión establecida</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
