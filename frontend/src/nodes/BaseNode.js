// BaseNode.js
import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  label,
  icon = '⚙️',
  color = '#6366f1',
  inputs = [],
  outputs = [],
  fields = [],
  children,
  minWidth = 220,
}) => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.defaultValue ?? '']))
  );

  const onChange = useCallback((key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const HANDLE_SPACING = 32;
  const HANDLE_START   = 20;
  const handleSectionHeight =
    Math.max(inputs.length, outputs.length) * HANDLE_SPACING + HANDLE_START;

  return (
    <div style={styles.wrapper(color, minWidth)}>

      {/* Header */}
      <div style={styles.header(color)}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={styles.headerLabel}>{label}</span>
      </div>

      {/* Handle section — separate from fields */}
      {(inputs.length > 0 || outputs.length > 0) && (
        <div style={{
          position: 'relative',
          height: handleSectionHeight,
          borderBottom: fields.length > 0 ? '1px solid #313244' : 'none',
        }}>

          {/* Left input handles */}
          {inputs.map((inp, i) => (
            <div key={inp.id}>
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-${inp.id}`}
                style={{
                  position: 'absolute',
                  top: HANDLE_START + i * HANDLE_SPACING,
                  left: -8,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid #11111b',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              />
              <span style={{
                position: 'absolute',
                left: 14,
                top: HANDLE_START + i * HANDLE_SPACING - 8,
                fontSize: 10,
                color: '#a6adc8',
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: '16px',
              }}>
                {inp.label}
              </span>
            </div>
          ))}

          {/* Right output handles */}
          {outputs.map((out, i) => (
            <div key={out.id}>
              <Handle
                type="source"
                position={Position.Right}
                id={`${id}-${out.id}`}
                style={{
                  position: 'absolute',
                  top: HANDLE_START + i * HANDLE_SPACING,
                  right: -8,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid #11111b',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              />
              <span style={{
                position: 'absolute',
                right: 14,
                top: HANDLE_START + i * HANDLE_SPACING - 8,
                fontSize: 10,
                color: '#a6adc8',
                pointerEvents: 'none',
                userSelect: 'none',
                textAlign: 'right',
                lineHeight: '16px',
              }}>
                {out.label}
              </span>
            </div>
          ))}

        </div>
      )}

      {/* Fields section */}
      {(fields.length > 0 || children) && (
        <div style={{ padding: '10px 14px 12px' }}>
          {fields.map((field) => (
            <FieldRow
              key={field.key}
              field={field}
              value={values[field.key]}
              onChange={(v) => onChange(field.key, v)}
            />
          ))}
          {children}
        </div>
      )}

    </div>
  );
};

function FieldRow({ field, value, onChange }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <label style={styles.fieldLabel}>{field.label}</label>
      {field.type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={styles.input}
        >
          {field.options?.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          value={value}
          rows={3}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...styles.input, resize: 'vertical' }}
        />
      ) : (
        <input
          type={field.type ?? 'text'}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={styles.input}
        />
      )}
    </div>
  );
}

const styles = {
  wrapper: (color, minWidth) => ({
    minWidth,
    background: '#1e1e2e',
    border: '1px solid #313244',
    borderLeft: `4px solid ${color}`,
    borderRadius: 12,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: '#cdd6f4',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    overflow: 'visible',
  }),
  header: (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 14px',
    background: `linear-gradient(135deg, ${color}30, ${color}10)`,
    borderBottom: '1px solid #313244',
    borderRadius: '8px 8px 0 0',
  }),
  headerLabel: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 0.4,
    color: '#cdd6f4',
  },
  fieldLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    color: '#a6adc8',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#181825',
    border: '1px solid #313244',
    borderRadius: 6,
    color: '#cdd6f4',
    padding: '5px 8px',
    fontSize: 12,
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  },
};