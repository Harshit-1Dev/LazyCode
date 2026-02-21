import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#11111b',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 20px',
        background: '#11111b',
        borderBottom: '1px solid #313244',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 22 }}>⚡</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: '#cdd6f4', letterSpacing: 0.4 }}>
          VectorShift Pipeline Builder
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6c7086' }}>
          Drag nodes · Connect handles · Submit to analyse
        </span>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <PipelineToolbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <PipelineUI />
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
