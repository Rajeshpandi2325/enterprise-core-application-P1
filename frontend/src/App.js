import React, { useState, useEffect } from 'react';

function App() {
  const [health, setHealth] = useState({ status: 'FETCHING_METRICS' });
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetch('/api/health').then(res => res.json()).then(data => setHealth(data)).catch(() => setHealth({ status: 'PROXY_LINK_BROKEN' }));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Enterprise Integration Control Interface</h1>
      <h3>Cluster Integration Boundary: <span style={{ color: 'blue' }}>{health.status}</span></h3>
      <p>Target Runtime Context Location: <strong>{health.environment || 'UNKNOWN'}</strong></p>
      <button onClick={() => {
        fetch('/api/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input_features: [44.1, 12.8, 93.2] }) })
          .then(res => res.json()).then(payload => setPrediction(payload.prediction));
      }}>Dispatch Pipeline Analysis Frame Arrays</button>
      {prediction && <h2>Calculated Output Scalar: {prediction}</h2>}
    </div>
  );
}
export default App;
