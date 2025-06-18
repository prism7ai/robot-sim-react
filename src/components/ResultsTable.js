import React, { useEffect, useState } from 'react';

export default function ResultsTable({ version }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://robot-sim-react-production.up.railway.app/results')
      .then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => {
        console.error('Error fetching results:', err);
        setError('Failed to fetch results');
      });
  }, [version]);

  return (
    <div style={{ margin: '40px auto', maxWidth: '90%' }}>
      <h3 style={{ textAlign: 'center' }}>Previous Results</h3>

      {error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>Algorithm</th>
              <th>Start</th>
              <th>Goal</th>
              <th>Path Length</th>
              <th>Visited</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                  No results yet
                </td>
              </tr>
            ) : (
              results.map((r, i) => (
                <tr key={i}>
                  <td>{r.algorithm}</td>
                  <td>{parseArray(r.start_point)}</td>
                  <td>{parseArray(r.goal_point)}</td>
                  <td>{r.path_length}</td>
                  <td>{r.visited_count}</td>
                  <td>{Number(r.time_taken).toFixed(4)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Utility to format JSON string arrays like "[0,1]" -> "0,1"
function parseArray(data) {
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.join(',') : data;
  } catch {
    return data;
  }
}
