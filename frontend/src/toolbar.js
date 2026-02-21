import { DraggableNode } from './draggableNode';
const NODE_DEFS = [
  { type: 'customInput',  label: 'Input',        icon: '📥', color: '#89b4fa' },
  { type: 'customOutput', label: 'Output',        icon: '📤', color: '#a6e3a1' },
  { type: 'llm',          label: 'LLM',           icon: '🤖', color: '#cba6f7' },
  { type: 'text',         label: 'Text',          icon: '📝', color: '#f38ba8' },
  { type: 'apiCall',      label: 'API Call',      icon: '🌐', color: '#fab387' },
  { type: 'conditional',  label: 'Conditional',   icon: '🔀', color: '#94e2d5' },
  { type: 'transform',    label: 'Transform',     icon: '⚗️', color: '#f9e2af' },
  { type: 'note',         label: 'Note',          icon: '🗒️', color: '#eba0ac' },
  { type: 'vectorStore',  label: 'Vector Store',  icon: '🗄️', color: '#b4befe' },
];

export const PipelineToolbar = () => (
  <aside style={{
    width: 195,
    flexShrink: 0,
    background: '#11111b',
    borderRight: '1px solid #313244',
    padding: '18px 12px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  }}>
    <p style={{
      margin: '0 0 12px 0',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1,
      color: '#6c7086',
      textTransform: 'uppercase',
    }}>
      Nodes
    </p>
    {NODE_DEFS.map((n) => (
      <DraggableNode key={n.type} {...n} />
    ))}
  </aside>
);
