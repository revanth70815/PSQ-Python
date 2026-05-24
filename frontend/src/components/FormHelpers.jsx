export function Field({ label, children, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
}

export const input = {
  padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 4,
  fontSize: '0.9rem', width: '100%', boxSizing: 'border-box',
}

export function RadioGroup({ name, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: 20, marginTop: 4 }}>
      {options.map(o => (
        <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', cursor: 'pointer' }}>
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          {o.label}
        </label>
      ))}
    </div>
  )
}

export function Fieldset({ legend, children }) {
  return (
    <fieldset style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '14px 16px', marginBottom: 16 }}>
      <legend style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', padding: '0 6px' }}>{legend}</legend>
      {children}
    </fieldset>
  )
}

export function SubmitBtn() {
  return (
    <button type="submit" style={{ marginTop: 8, padding: '10px 24px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>
      Submit
    </button>
  )
}

export function today() {
  return new Date().toISOString().slice(0, 10)
}
