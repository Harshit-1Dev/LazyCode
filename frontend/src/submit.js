import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const { num_nodes, num_edges, is_dag } = await res.json();

      alert(
        `📊 Pipeline Analysis\n\n` +
        `Nodes  : ${num_nodes}\n` +
        `Edges  : ${num_edges}\n` +
        `Is DAG : ${is_dag ? '✅ Yes — no cycles detected' : '❌ No — cycles found'}`
      );
    } catch (err) {
      alert(`❌ Could not reach backend:\n${err.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px 0',
      borderTop: '1px solid #313244',
      background: '#11111b',
    }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 40px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          border: 'none',
          borderRadius: 50,
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: 0.5,
          boxShadow: '0 4px 18px rgba(99,102,241,0.45)',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.04)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 18px rgba(99,102,241,0.45)';
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};

