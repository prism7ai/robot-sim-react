import React, { useEffect, useState } from 'react';

export default function ResultsTable({ version }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('https://robot-sim-react-production.up.railway.app/results')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error('Error fetching results:', err));
  }, [version]); // ✅ Refresh when `version` changes

  return (
    <div style={{ margin: '40px auto', maxWidth: '90%' }}>
      <h3 style={{ textAlign: 'center' }}>Previous Results</h3>
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
                <td>{r.start_point}</td>
                <td>{r.goal_point}</td>
                <td>{r.path_length}</td>
                <td>{r.visited_count}</td>
                <td>{r.time_taken.toFixed(4)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
