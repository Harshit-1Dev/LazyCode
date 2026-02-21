// draggableNode.js

export const DraggableNode = ({ type, label, icon, color }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };
  
    return (
    <div
      className={type}
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        marginBottom: 5,
        background: '#181825',
        border: '1px solid #313244',
        borderLeft: `3px solid ${color}`,
        borderRadius: 8,
        cursor: 'grab',
        userSelect: 'none',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#313244';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#181825';
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 12, color: '#cdd6f4', fontWeight: 500 }}>{label}</span>
    </div>
  );
  };
  